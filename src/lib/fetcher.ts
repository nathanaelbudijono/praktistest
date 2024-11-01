import { toast } from "@/hooks/use-toast";
import {
  buyersProps,
  itemProps,
  summaryProps,
  transactionProps,
} from "@/types/database-types";
import {
  fetchAllItems,
  fetchBuyer,
  fetchCategory,
  fetchSummary,
  fetchTotalTransaction,
} from "./api";
import {
  checkBuyerName,
  checkItemsName,
  checkItemsPrice,
  checkValidTransaction,
} from "./validation";

export const handleFetchCategory = async (): Promise<string[] | undefined> => {
  try {
    const data = await fetchCategory();

    if (data) {
      const uniqueCategory = Array.from(new Set(data));
      return uniqueCategory;
    }
  } catch (err) {
    toast({
      variant: "destructive",
      title: "Something went wrong",
    });
    console.log(err);
    return undefined;
  }
};

export const handleFetchAllItems = async (): Promise<
  itemProps[] | undefined
> => {
  try {
    const data = await fetchAllItems();
    if (data && checkItemsName(data)) {
      if (checkItemsPrice(data)) {
        return data;
      } else {
        toast({
          variant: "destructive",
          title: "Failed to fetch items",
          description: "There is no regular price",
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Failed to fetch items",
        description: "Item name is not unique",
      });
    }
  } catch (err) {
    toast({
      variant: "destructive",
      title: "Something went wrong",
    });
    console.log(err);
    return undefined;
  }
};

export const handleFetchTotalTransaction = async (): Promise<
  transactionProps[] | undefined
> => {
  try {
    const transactionData = await fetchTotalTransaction();
    const itemsData = await fetchAllItems();
    if (transactionData && itemsData) {
      if (checkValidTransaction(transactionData, itemsData)) {
        return transactionData;
      } else {
        toast({
          variant: "destructive",
          title: "Failed to fetch transaction",
          description: "Transaction item is not in item list",
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Failed to fetch transaction",
        description: "Invalid transaction",
      });
    }
  } catch (err) {
    toast({
      variant: "destructive",
      title: "Something went wrong",
    });
    console.log(err);
    return undefined;
  }
};

export const handleFetchSummary = async (): Promise<
  summaryProps | undefined
> => {
  try {
    const data = await fetchSummary();
    return data;
  } catch (err) {
    toast({
      variant: "destructive",
      title: "Something went wrong",
    });
    console.log(err);
    return undefined;
  }
};

export const handleFetchBuyer = async (): Promise<
  buyersProps[] | undefined
> => {
  try {
    const data = await fetchBuyer();
    if (data && checkBuyerName(data)) {
      return data;
    } else {
      toast({
        variant: "destructive",
        title: "Failed to fetch buyer",
        description: "Buyer name is not unique",
      });
    }
  } catch (err) {
    toast({
      variant: "destructive",
      title: "Something went wrong",
    });
    console.log(err);
    return undefined;
  }
};
