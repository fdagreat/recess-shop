import { Record } from "pocketbase";
import { ProductRecord } from "./products";

interface CartItem {
  id?: string;
  user: string;
  item: string;
  quantity: number;
  checkedOut: boolean;
  deleted: boolean
  expand?: {
    item: ProductRecord;
  };
}

export type CartItemRecord = CartItem | Record;
