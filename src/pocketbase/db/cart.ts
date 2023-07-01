import pb from "../config";
import { ProductRecord } from "../interfaces/products";
import { CartItemRecord } from "../interfaces/cart";
import { getProductThumb } from "./product";

export const fetchOnlineCart = async (
  userId: string
): Promise<CartItemRecord[]> => {
  const items: CartItemRecord[] = await pb
    .collection("cart")
    .getFullList(200 /* batch size */, {
      sort: "-created",
      filter: `user='${userId}'`,
      expand: "item",
    });
  items.forEach((item) => {
    const product = item.expand?.item as ProductRecord;
    product.img = getProductThumb(product, product.img);
  });

  return items;
};

export const fetchLocalCart = (): CartItemRecord[] => {
  return JSON.parse(localStorage.getItem("cart") ?? "[]");
};

export const saveLocalCart = (cartList: CartItemRecord[]) => {
  localStorage.setItem("cart", JSON.stringify(cartList));
};

export const findOnlineCartItem = async (
  userId: string,
  itemID: string
): Promise<CartItemRecord | null> => {
  try {
    const record: CartItemRecord = await pb
      .collection("cart")
      .getFirstListItem(`user="${userId}" && item="${itemID}" `);
    return record;
  } catch (error) {
    return null;
  }
};

export const createOnlineCartItem = async (
  user: string,
  item: string,
  quantity: number
) => {
  await pb
    .collection("cart")
    .create({ user, item, quantity }, { $autoCancel: false });
};

export const updateOnlineCartItem = async (
  itemID: string,
  updateObject: object
) => {
  await pb.collection("cart").update(itemID, updateObject);
};

export const removeOnlineCartItem = async (itemID: string) => {
  await pb.collection("cart").delete(itemID);
};

export const clearLocalCart = () => {
  localStorage.removeItem("cart");
};
