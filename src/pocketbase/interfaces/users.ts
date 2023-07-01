import { Record } from "pocketbase";

interface User {
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
  username: string;
  verified: boolean;
  emailVisibility: boolean;
  email: string;
  name: string;
  avatar: string;
  cart: string[];
  wishlist: string[];
}

export type UserRecord = User | Record;
