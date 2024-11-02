import {
  bestSpendersProps,
  buyersProps,
  buyerTransactionProps,
  itemProps,
  rpcProps,
  transactionProps,
} from "@/types/database-types";
import { StateCreator } from "zustand";

export interface summarySlicesProps {
  transactionCount: number;
  bestSellingItem: string;
  bestSellingCategory: string;
  revenue: number;
  rpc: rpcProps[];
  bestSpenders: bestSpendersProps[];
  buyerTransaction: buyerTransactionProps[];
}

export interface summarySlicesFunctionProps {
  calculateSummary: (
    items: itemProps[],
    buyers: buyersProps[],
    transactions: transactionProps[]
  ) => void;
  calculateBestItemSoldQuantity: (
    transaction: transactionProps[],
    bestSellingData: itemProps
  ) => number;
  calculateBestItemRevenue: (
    totalTransaction: transactionProps[],
    bestSellingData: itemProps,
    buyers: buyersProps[]
  ) => number;
  calculateBestItemCategoryQuantity(
    items: itemProps[],
    transaction: transactionProps[]
  ): number;
}

export const summarySlices: StateCreator<
  summarySlicesProps & summarySlicesFunctionProps
> = (set, get) => ({
  transactionCount: 0,
  bestSellingItem: "",
  bestSellingCategory: "",
  revenue: 0,
  rpc: [],
  bestSpenders: [],
  buyerTransaction: [],
  calculateSummary: (
    items: itemProps[],
    buyers: buyersProps[],
    transactions: transactionProps[]
  ) => {
    try {
      let totalTransaction: number = 0;
      let transactionCount: number = 0;

      const revenueByCategory: Record<string, number> = {};
      const itemSalesCount: Record<string, number> = {};
      const spenderTotal: Record<string, bestSpendersProps> = {};
      const buyerTransaction: buyerTransactionProps[] = [];

      transactions.forEach((transaction) => {
        //data
        const itemData = items.find((item) => item.name === transaction.item);
        const buyer = buyers.find((item) => item.name === transaction.buyer);
        const priceData = itemData?.prices.find(
          (item) => item.priceFor === buyer?.type
        );

        const regularPrice = itemData?.prices.find(
          (item) => item.priceFor === "regular"
        );

        if (!itemData || !buyer || !regularPrice) return;

        let price: number = 0;
        if (priceData) {
          price = priceData.price;
        } else {
          price = regularPrice.price;
        }

        // calculate total revenue
        const transactionRevenue = price * transaction.qty;
        totalTransaction += transactionRevenue;

        // calculate total order
        transactionCount++;

        // calculate revenue by category
        revenueByCategory[itemData?.type] =
          (revenueByCategory[itemData?.type] || 0) + transactionRevenue;

        //calculate itemSalescount
        itemSalesCount[itemData.name] =
          (itemSalesCount[itemData.name] || 0) + transaction.qty;

        //track total spending
        if (!spenderTotal[buyer.name]) {
          spenderTotal[buyer.name] = {
            name: buyer.name,
            type: buyer.type,
            spent: 0,
          };
        }
        spenderTotal[buyer.name].spent += transactionRevenue;

        // new array transaction and type
        buyerTransaction.push({
          item: transaction.item,
          qty: transaction.qty,
          buyer: transaction.buyer,
          type: buyer.type,
          totalPrice: price * transaction.qty,
        });
      });

      //get best selling item
      const bestSellingItem = Object.entries(itemSalesCount).reduce(
        (max, entry) =>
          entry[1] > (itemSalesCount[max] || 0) ? entry[0] : max,
        ""
      );
      // get best selling category
      const bestSellingCategory = Object.entries(revenueByCategory).reduce(
        (max, entry) =>
          entry[1] > (revenueByCategory[max] || 0) ? entry[0] : max,
        ""
      );

      // get rpc
      const rpc = Object.entries(revenueByCategory)
        .map(([category, revenue]) => ({
          category,
          revenue,
        }))
        .sort((a, b) => b.revenue - a.revenue);

      // get 3 best spender
      const bestSpenders = Object.values(spenderTotal)
        .sort((a, b) => b.spent - a.spent)
        .slice(0, 3);

      set({
        transactionCount: transactionCount,
        bestSellingItem,
        bestSellingCategory,
        revenue: totalTransaction,
        rpc,
        bestSpenders,
        buyerTransaction,
      });
    } catch (err) {
      console.log(err);
    }
  },

  calculateBestItemSoldQuantity: (
    totalTransaction: transactionProps[],
    bestSellingData: itemProps
  ): number => {
    return totalTransaction
      .filter((item) => item.item === bestSellingData.name)
      .reduce((acc, curr) => acc + curr.qty, 0);
  },
  calculateBestItemRevenue: (
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
  },
  calculateBestItemCategoryQuantity: (
    items: itemProps[],
    transaction: transactionProps[]
  ): number => {
    const bestItem = items
      .filter((item) => item.type === get().bestSellingCategory)
      .map((item) => item.name);

    let totalQuantity = 0;

    transaction.forEach((item) => {
      if (bestItem.includes(item.item)) {
        totalQuantity += item.qty;
      }
    });

    return totalQuantity;
  },
});
