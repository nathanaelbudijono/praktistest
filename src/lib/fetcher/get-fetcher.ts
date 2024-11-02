import { toast } from "@/hooks/use-toast";
import {
  buyersProps,
  itemProps,
  transactionProps,
} from "@/types/database-types";
import {
  fetchAllItems,
  fetchBuyer,
  fetchCategory,
  fetchTotalTransaction,
} from "../api/get-api";
import {
  checkBuyerName,
  checkItemsName,
  checkItemsPrice,
  checkValidTransaction,
} from "../validation";

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
    if (!data) {
      toast({
        variant: "destructive",
        title: "Failed to fetch items",
        description: "Data is empty",
      });
      return undefined;
    }

    const resCheckItem = checkItemsName(data);
    if (resCheckItem === true) {
      const resCheckPrice = checkItemsPrice(data);
      if (resCheckPrice === true) {
        return data;
      } else {
        toast({
          variant: "destructive",
          title: "Failed to fetch items",
          description: `There is no regular price on ${resCheckPrice}`,
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Failed to fetch items",
        description: `Item name is not unique on ${resCheckItem}`,
      });
      return undefined;
    }
  } catch (err) {
    toast({
      variant: "destructive",
      title: "Something went wrong file fetching all items",
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
      const resValidTransaction = checkValidTransaction(
        transactionData,
        itemsData
      );
      if (resValidTransaction === true) {
        return transactionData;
      } else {
        toast({
          variant: "destructive",
          title: "Failed to fetch transaction",
          description: `${resValidTransaction} item is not in item list`,
        });
        return undefined;
      }
    } else {
      toast({
        variant: "destructive",
        title: "Failed to fetch transaction",
        description:
          "Invalid transaction there is no items data and transaction data",
      });

      return undefined;
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

export const handleFetchBuyer = async (): Promise<
  buyersProps[] | undefined
> => {
  try {
    const data = await fetchBuyer();
    if (!data) {
      toast({
        variant: "destructive",
        title: "Failed to fetch buyer",
        description: "Data is empty",
      });
      return undefined;
    }

    const resValidBuyerName = checkBuyerName(data);
    if (resValidBuyerName === true) {
      return data;
    } else {
      toast({
        variant: "destructive",
        title: "Failed to fetch buyer",
        description: `Buyer name is not unqiue on ${resValidBuyerName}`,
      });
      return undefined;
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
