import { cartProps } from "@/types/cart-types";
import { itemProps } from "@/types/database-types";
import { StateCreator } from "zustand";

export interface cartSlicesProps {
  cart: cartProps[];
  totalCart: number;
}

export interface cartFunctionProps {
  addCart: (item: itemProps, type: string) => void;
  removeCart: (item: itemProps) => void;
  clearCart: () => void;
}

export const cartSlices: StateCreator<cartSlicesProps & cartFunctionProps> = (
  set,
  get
) => ({
  cart: [],
  totalCart: 0,
  addCart: (item: itemProps, type: string) => {
    const cartData = get().cart;
    const checkCart = cartData.find((cart) => cart.item === item.name);
    const userPrice = item.prices.find((price) => price.priceFor === type);
    const price = userPrice ? userPrice.price : item.prices[0].price;
    if (checkCart) {
      checkCart.qty += 1;
    } else {
      cartData.push({
        buyer: "buyer",
        item: item.name,
        qty: 1,
        price: price,
      });
    }
    set({ totalCart: get().totalCart + 1 });
  },
  removeCart: (item: itemProps) => {
    const cartData = get().cart;
    const checkCart = cartData.find((cart) => cart.item === item.name);
    if (checkCart) {
      if (checkCart.qty === 1) {
        cartData.filter((cart) => cart.item !== item.name);
      } else if (checkCart.qty > 1) {
        checkCart.qty -= 1;
      }
    }
    set({ totalCart: get().totalCart - 1 });
  },
  clearCart: () => {
    set({ cart: [], totalCart: 0 });
  },
});
