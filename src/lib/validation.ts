import {
  buyersProps,
  itemProps,
  transactionProps,
} from "@/types/database-types";

export const checkItemsName = (items: itemProps[]): boolean => {
  const uniqueNames = new Set();

  for (const item of items) {
    if (uniqueNames.has(item.name)) {
      return false;
    }
    uniqueNames.add(item.name);

    if (!item.prices || item.prices.length === 0) {
      return false;
    }
  }

  return true;
};

export const checkItemsPrice = (items: itemProps[]): boolean => {
  for (const item of items) {
    const hasRegulerPrice = item.prices.some(
      (price) => price.priceFor === "regular"
    );

    if (!hasRegulerPrice) {
      return false;
    }
  }
  return true;
};

export const checkValidTransaction = (
  transactions: transactionProps[],
  items: itemProps[]
): boolean => {
  const validItems = new Set(items.map((item) => item.name));
  return transactions.every((transaction) => validItems.has(transaction.item));
};

export const checkBuyerName = (items: buyersProps[]): boolean => {
  const uniqueNames = new Set();

  for (const item of items) {
    if (uniqueNames.has(item.name)) {
      return false;
    }
    uniqueNames.add(item.name);
  }

  return true;
};
