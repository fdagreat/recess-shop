import { Record } from "pocketbase";
import { CategoryRecord } from "./category";

interface Product {
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
  name: string;
  price: number;
  amount: number;
  img: string;
  categories: Array<string>;
  expand: {
    categories: Array<CategoryRecord>;
  };
}

export type ProductRecord = Product | Record;
