import { API_URL } from "@/constant/env";
import { cartProps } from "@/types/cart-types";
import {
  loginResponseProps,
  transactionResponse,
} from "@/types/response-types";

export const fetchLogin = async ({
  name,
  type,
}: {
  name: string;
  type: string;
}): Promise<loginResponseProps | undefined> => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ name, type }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const fetchBuyTransaction = async (
  carts: cartProps[]
): Promise<transactionResponse | undefined> => {
  try {
    const res = await fetch(`${API_URL}/transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carts),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
