import { toast } from "@/hooks/use-toast";
import { fetchBuyTransaction, fetchLogin } from "../api/post-api";
import { cartProps } from "@/types/cart-types";

export const handleFetchLogin = async ({
  name,
  type,
}: {
  name: string;
  type: string;
}): Promise<boolean | undefined> => {
  try {
    const data = await fetchLogin({ name, type });
    if (data) {
      if (data.status === true) {
        document.cookie = `name = user; path=/; max-age=86400`;
        localStorage.setItem("name", name);
        localStorage.setItem("type", type);
        localStorage.setItem("permission", "user");
        toast({
          title: `${name} account created successfully`,
          description: data.message,
        });
        return true;
      } else {
        toast({
          variant: "destructive",
          title: "Failed to add create account",
          description: data.message,
        });
        return false;
      }
    } else {
      toast({
        variant: "destructive",
        title: "Failed to add create account",
        description: "Data is empty",
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

export const handleFetchBuyTransaction = async (
  cart: cartProps[]
): Promise<boolean | undefined> => {
  try {
    const data = await fetchBuyTransaction(cart);
    if (data?.status === true) {
      toast({
        title: "Transaction success",
        description: data.message,
      });
      return true;
    } else {
      toast({
        variant: "destructive",
        title: "Failed to buy transaction",
        description: data?.message,
      });
      return false;
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
