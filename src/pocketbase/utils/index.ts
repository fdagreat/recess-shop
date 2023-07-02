import { ProductRecord } from "../interfaces/products";
import { CartItemRecord } from "../interfaces/cart";

export const getTotalInvoice = (cartItems: CartItemRecord[]) => {
  let total = 0;
  cartItems.forEach((item) => {
    total += (item.expand?.item as ProductRecord).price * item.quantity;
  });
  return `${total}`
};

export const getTotalItems = (cartItems: CartItemRecord[]) => {
  let total = 0;
  cartItems.forEach((item) => {
    total += item.quantity;
  });
  return total;
};
