import { Record } from "pocketbase";
import { ProductRecord } from "./products";
import { CartItemRecord } from "./cart";
import { paymentMethodOption, shippingAddressOption } from "../../components/cart/invoice";

interface Order {
    id?: string;
    user: string;
    totalInvoice: string;
    totalItems: number;
    carts: string[];
    shippingAddress: shippingAddressOption["value"];
    paymentMethodOption: paymentMethodOption["value"];
    shippingFee: number;
    phoneNumber: string;
    status: OrderStatus;
}

export type OrderStatus = 'unpaid' | 'paid' | 'being_delivered' | 'completed' | 'canceled'

