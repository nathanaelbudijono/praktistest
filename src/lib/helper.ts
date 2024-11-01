import {
  buyersProps,
  itemProps,
  transactionProps,
} from "@/types/database-types";

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const formatToIDR = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    currency: "IDR",
    currencyDisplay: "symbol",
    currencySign: "standard",
    style: "currency",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-GB", options);
};

export const calculateBestItemSold = (
  totalTransaction: transactionProps[],
  bestSellingData: itemProps
): number => {
  return totalTransaction
    .filter((item) => item.item === bestSellingData.name)
    .reduce((acc, curr) => acc + curr.qty, 0);
};

export const calculateBestItemRevenue = (
  totalTransaction: transactionProps[],
  bestSellingData: itemProps,
  buyers: buyersProps[]
): number => {
  return totalTransaction
    .filter((item) => item.item === bestSellingData.name)
    .reduce((acc, curr) => {
      const buyer = buyers.find((item) => item.name === curr.buyer);
      const priceForType =
        bestSellingData.prices.find((price) => price.priceFor === buyer?.type)
          ?.price ?? 0;
      return acc + curr.qty * priceForType;
    }, 0);
};
