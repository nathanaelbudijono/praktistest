import { API_URL } from "@/constant/env";
import {
  buyersProps,
  itemProps,
  summaryProps,
  transactionProps,
} from "@/types/database-types";

export const fetchCategory = async (): Promise<string[] | undefined> => {
  try {
    const res = await fetch(`${API_URL}/items/category`, {
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const fetchAllItems = async (): Promise<itemProps[] | undefined> => {
  try {
    const res = await fetch(`${API_URL}/items`, {
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const fetchTotalTransaction = async (): Promise<
  transactionProps[] | undefined
> => {
  try {
    const res = await fetch(`${API_URL}/transaction`, {
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const fetchSummary = async (): Promise<summaryProps | undefined> => {
  try {
    const res = await fetch(`${API_URL}/summary`, {
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const fetchBuyer = async (): Promise<buyersProps[] | undefined> => {
  try {
    const res = await fetch(`${API_URL}/buyers`, {
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
