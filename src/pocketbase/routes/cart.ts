import pb from "../config";
import { QueryFunctionContext } from "@tanstack/react-query";
import { CartItemRecord } from "../interfaces/cart";
import { ProductRecord } from "../interfaces/products";
import { getTotalInvoice, getTotalItems } from "../utils";
import {
  fetchOnlineCart,
  fetchLocalCart,
  saveLocalCart,
  updateOnlineCartItem,
  removeOnlineCartItem,
  findOnlineCartItem,
  createOnlineCartItem,
  clearLocalCart,
} from "../db/cart";

export const getCartItems = async ({
  queryKey,
}: QueryFunctionContext<
  [string, boolean | undefined, string | null | undefined]
>): Promise<{
  totalItems: number;
  totalInvoice: string;
  cartItems: CartItemRecord[];
}> => {
  const isOnline = queryKey[1];
  const userId = queryKey[2];

  if (isOnline) {
    const cartItems = await fetchOnlineCart(userId!);
    const totalInvoice = getTotalInvoice(cartItems);
    const totalItems = getTotalItems(cartItems);
    return { cartItems, totalInvoice, totalItems };
  } else {
    const localCartItems = fetchLocalCart();
    const totalItems = getTotalItems(localCartItems);
    const totalInvoice = getTotalInvoice(localCartItems);
    return { cartItems: localCartItems, totalItems, totalInvoice };
  }
};

// export const updateCartCheckedOutStatus = async (
//   query: { isOnline: boolean | undefined; userId?: string },
//   checkedOut: boolean
// ) => {
//   if (query.isOnline) {
//     const cartItems = await fetchOnlineCart(query.userId!);
//     cartItems.forEach(async (item) => {
//       await updateOnlineCartItem(item.id!, { checkedOut });
//       await removeOnlineCartItem(item.id!)
//     });
//   } else {
//     const localCartItems = fetchLocalCart();
//     localCartItems.forEach((item) => {
//       item.checkedOut = checkedOut;
//     });
//     saveLocalCart(localCartItems);
//   }
// };

export const addItemToCart = async (query: {
  isOnline: boolean | undefined;
  itemID: string;
  product: ProductRecord;
  quantity: number;
  userId?: string;
}) => {
  if (query.isOnline) {
    const existingItem = await findOnlineCartItem(query.userId!, query.itemID);
    if (existingItem) {
      await updateOnlineCartItem(existingItem.id!, {
        "quantity+": query.quantity,
      });
    } else {
      await createOnlineCartItem(query.userId!, query.itemID, query.quantity);
    }
  } else {
    const localCartItems = fetchLocalCart();

    const existingItemIndex = localCartItems.findIndex((item) => {
      return item.item == query.itemID;
    });

    if (existingItemIndex != -1) {
      localCartItems[existingItemIndex].quantity += query.quantity;
    } else {
      const data = {
        item: query.itemID,
        quantity: query.quantity,
        expand: {
          item: query.product,
        },
      };
      localCartItems.push(data as CartItemRecord);
    }

    saveLocalCart(localCartItems);
  }
};

export const removeItemFromCart = async (query: {
  itemID?: string;
  isonline?: boolean;
  productID?: string;
}) => {
  if (query.isonline) {
    await removeOnlineCartItem(query.itemID!);
  } else {
    const localCart = fetchLocalCart();
    const newCart = localCart.filter((item) => {
      return item.item != query.productID;
    });

    saveLocalCart(newCart);
  }
};

export const updateItemQuantity = async (query: {
  itemID?: string;
  quantity: number;
  isonline?: boolean;
  productID?: string;
}) => {
  if (query.isonline) {
    await updateOnlineCartItem(query.itemID!, {
      quantity: query.quantity,
    });
  } else {
    const localCartItems = fetchLocalCart();
    const existingItemIndex = localCartItems.findIndex((item) => {
      return item.item == query.productID;
    });
    localCartItems[existingItemIndex].quantity = query.quantity;
    saveLocalCart(localCartItems);
  }
};

export const transferLocalCart = async (userId: string) => {
  const localCartItems = fetchLocalCart();
  if (localCartItems.length > 0) {
    localCartItems.forEach(async (item) => {
      const existingItem = await findOnlineCartItem(userId, item.item);
      if (existingItem) {
        await updateOnlineCartItem(existingItem.id!, {
          "quantity+": item.quantity,
        });
      } else {
        await createOnlineCartItem(userId, item.item, item.quantity);
      }
      clearLocalCart();
    });
  }
};
