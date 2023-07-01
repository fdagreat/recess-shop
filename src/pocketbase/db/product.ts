import pb from "../config";
import { ProductRecord } from "../interfaces/products";

export const getProductThumb = (
  record: ProductRecord,
  filename: string
): string => {
  return pb.getFileUrl(record, filename, { thumb: "100x100" });
};
