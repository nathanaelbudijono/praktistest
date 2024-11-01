import {
  buyersProps,
  itemProps,
  transactionProps,
} from "@/types/database-types";

export const checkItemsName = (items: itemProps[]): string | boolean => {
  const uniqueNames = new Set();

  for (const item of items) {
    if (uniqueNames.has(item.name)) {
      return item.name;
    }
    uniqueNames.add(item.name);
  }

  return true;
};

export const checkItemsPrice = (items: itemProps[]): boolean | string => {
  for (const item of items) {
    const hasRegulerPrice = item.prices.some(
      (price) => price.priceFor === "regular"
    );

    if (!hasRegulerPrice) {
      return item.name;
    }
  }
  return true;
};

export const checkValidTransaction = (
  transactions: transactionProps[],
  items: itemProps[]
): string | boolean => {
  const validItems = new Set(items.map((item) => item.name));

  for (const transaction of transactions) {
    if (!validItems.has(transaction.item)) {
      return transaction.item;
    }
  }

  return true;
};

export const checkBuyerName = (items: buyersProps[]): boolean | string => {
  const uniqueNames = new Set();

  for (const item of items) {
    if (uniqueNames.has(item.name)) {
      return item.name;
    }
    uniqueNames.add(item.name);
  }

  return true;
};
