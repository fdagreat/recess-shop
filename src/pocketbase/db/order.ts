import {
  paymentMethodOption,
  shippingAddressOption,
} from "../../components/cart/invoice";
import pb from "../config";
import { CartItemRecord } from "../interfaces/cart";
// import { OrderRecord } from "../interfaces/products";

export const createOrder = async (query: {
  user: string;
  totalInvoice: string;
  totalItems: number;
  cartItems: CartItemRecord[];
  shippingAddress: shippingAddressOption["value"];
  paymentMethodOption: paymentMethodOption["value"];
  shippingFee: number;
  phoneNumber: string;
}) => {
  const {
    user,
    totalInvoice,
    totalItems,
    cartItems,
    shippingAddress,
    paymentMethodOption,
    shippingFee,
    phoneNumber,
  } = query;
  const order = await pb.collection("order").create({
    user: user,
    totalInvoice: totalInvoice,
    totalItems: totalItems,
    cartItems: cartItems,
    shippingAddress: shippingAddress,
    paymentMethodOption: paymentMethodOption,
    shippingFee: shippingFee,
    phoneNumber: phoneNumber,
  });
  return order;
};
