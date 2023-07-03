import { ProductRecord } from "./../interfaces/products";
import { Record } from "pocketbase";
import { Admin } from "pocketbase";
import { CartItemRecord } from "../interfaces/cart";
import { createOrder } from "../db/order";
import {
  paymentMethodOption,
  shippingAddressOption,
} from "../../components/cart/invoice";
import { updateCartCheckedOutStatus } from "./cart";
import { fetchProductAmount, updateProductAmount } from "../db/product";
import { clearLocalCart } from "../db/cart";

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
      responseMessage + "\n" + (error.responseMessage ? error.responseMessage : "Error in checkout");
    error = true;
    return { error, responseMessage };
  }

  try {
    // Update the cart items to checkedOut
    await updateCartCheckedOutStatus({ isOnline: true, userId: user.id }, false);
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
    if (
      typeof cart?.expand?.item === "object" &&
      "id" in cart?.expand?.item
    ) {
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
          (error.responseMessage ? error.responseMessage : "Error in updating product amount");
        error = true;
        return { error, responseMessage };
      }
    }
  }

  return { error, responseMessage };
}
