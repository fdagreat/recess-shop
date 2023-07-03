import pb from "../config";
import { ProductRecord } from "../interfaces/products";
import { CartItemRecord } from "../interfaces/cart";
import { getProductThumb } from "./product";

export const fetchOnlineCart = async (
  userId: string
): Promise<CartItemRecord[]> => {
  const filters = `user='${userId}' && checkedOut=false && deleted=false`;
  const items: CartItemRecord[] = await pb
    .collection("cart")
    .getFullList(200 /* batch size */, {
      sort: "-created",
      filter: `${filters}`, // only get the cart items that are not checked out
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
    const filters = `user='${userId}' && item='${itemID}' && checkedOut=false && deleted=false`
    const record: CartItemRecord = await pb
      .collection("cart")
      .getFirstListItem(
        `${filters}`
      );
      console.log("record : " + record);
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
  const filters = `id='${itemID}'`
  const record: CartItemRecord = await pb
    .collection("cart")
    .getFirstListItem(`${filters}`);
    console.log("record : " + record);
  if (!record) {
    await pb.collection("cart").update(itemID, updateObject);
  }
  await pb.collection("cart").update(record.id!, updateObject);
};

export const removeOnlineCartItem = async (itemID: string) => {
  await updateOnlineCartItem(itemID, { deleted: true });
};

export const checkOutOnlineCart = async (itemID: string) => {
  await updateOnlineCartItem(itemID, { checkedOut: true });
};
  

export const clearLocalCart = () => {
  localStorage.removeItem("cart");
};
