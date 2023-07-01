import pb from "../config";
import { ProductRecord } from "../interfaces/products";
import { QueryFunctionContext } from "@tanstack/react-query";

const getProductThumb = (record: ProductRecord, filename: string): string => {
  return pb.getFileUrl(record, filename, { thumb: "100x100" });
};

export const getProductsList = async ({
  queryKey,
}: QueryFunctionContext<[string, number, string | null, string | null]>) => {
  const sort = queryKey[2] ?? "-created";
  const filter = queryKey[3] ? `categories~'${queryKey[3]}'` : "";
  const resultList = await pb.collection("products").getList(queryKey[1], 12, {
    sort,
    filter,
    expand: "categories",
  });
  const items: Array<ProductRecord> = resultList.items.map(
    (item: ProductRecord) => {
      const img = getProductThumb(item, item.img);
      return { ...item, img } as ProductRecord;
    }
  );
  return { ...resultList, items };
};

export const getProdcutByID = async ({
  queryKey,
}: QueryFunctionContext<[string, string]>): Promise<ProductRecord> => {
  const id = queryKey[1];
  const record: ProductRecord = await pb.collection("products").getOne(id, {
    expand: " categories",
  });
  record.img = getProductThumb(record, record.img);
  return record;
};
