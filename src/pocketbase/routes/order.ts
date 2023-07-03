import { ProductRecord } from "./../interfaces/products";
import { Record } from "pocketbase";
import { Admin } from "pocketbase";
import { CartItemRecord } from "../interfaces/cart";
import { createOrder } from "../db/order";
import {
  paymentMethodOption,
  shippingAddressOption,
} from "../../components/cart/invoice";
import { fetchProductAmount, updateProductAmount } from "../db/product";
import {
  checkOutOnlineCart,
  clearLocalCart,
  removeOnlineCartItem,
} from "../db/cart";

export async function checkout(
  user: Record | Admin,
  totalInvoice: string,
  totalItems: number,
  cartItems: CartItemRecord[],
  shippingAddress: shippingAddressOption["value"],
  paymentMethodOption: paymentMethodOption["value"],
  shippingFee: number,
  phoneNumber: string
) {
  let responseMessage = "";
  let error = false;

  console.log(
    "checking out with data " +
      JSON.stringify(cartItems) +
      " " +
      JSON.stringify(user)
  ) +
    " " +
    JSON.stringify(shippingAddress) +
    " " +
    JSON.stringify(paymentMethodOption) +
    " " +
    JSON.stringify(shippingFee) +
    " " +
    JSON.stringify(phoneNumber);

  try {
    await createOrder({
      user: user.id,
      totalInvoice,
      totalItems,
      cartItems,
      shippingAddress,
      paymentMethodOption,
      shippingFee,
      phoneNumber,
    });
  } catch (error: any) {
    responseMessage =
      responseMessage +
      "\n" +
      (error.responseMessage ? error.responseMessage : "Error in checkout");
    error = true;
    return { error, responseMessage };
  }

  try {
    // map the cartItems and on each get the cart item id and mark it as checkedOut and mark it as deleted

    for (const cart of cartItems) {
      if (typeof cart === "object" && "id" in cart) {
        const cartItemId = cart.id as string;
        await checkOutOnlineCart(cartItemId);
        await removeOnlineCartItem(cartItemId);
      }
    }
    clearLocalCart();
  } catch (error: any) {
    responseMessage =
      responseMessage +
      "\n" +
      (error.responseMessage
        ? error.responseMessage
        : "Error in marking cart items as checkedOut");
    error = true;
    return { error, responseMessage };
  }

  // Map the cartItems, on each get the product id in the cart item and update the amount of the product items remaining in the database
  for (const cart of cartItems) {
    if (typeof cart?.expand?.item === "object" && "id" in cart?.expand?.item) {
      const productId = cart.expand.item.id;
      const currentAmount = await fetchProductAmount(productId);
      const newAmount = currentAmount - cart.quantity;
      try {
        // Update the amount of the product items remaining in the database
        await updateProductAmount(productId, newAmount);
      } catch (error: any) {
        console.log("error in updating product amount" + error);
        responseMessage =
          responseMessage +
          "\n" +
          (error.responseMessage
            ? error.responseMessage
            : "Error in updating product amount");
        error = true;
        return { error, responseMessage };
      }
    }
  }

  return { error, responseMessage };
}
