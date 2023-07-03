import pb from "../config";
import { ProductRecord } from "../interfaces/products";

export const getProductThumb = (
  record: ProductRecord,
  filename: string
): string => {
  return pb.getFileUrl(record, filename, { thumb: "100x100" });
};

export const updateProductAmount = async (
  productId: string,
  amount: number
) => {
  await pb.collection("products").update(productId, { amount });
};

export const fetchProductAmount = async (productId: string) => {
  const product = await pb
    .collection("products")
    .getFirstListItem(`id="${productId}"`);
  return product.amount;
};
