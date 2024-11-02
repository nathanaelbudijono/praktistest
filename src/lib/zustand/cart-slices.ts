import { cartProps } from "@/types/cart-types";
import { itemProps } from "@/types/database-types";
import { StateCreator } from "zustand";

export interface cartSlicesProps {
  cart: cartProps[];
  totalCart: number;
}

export interface cartFunctionProps {
  addCart: (
    item: itemProps,
    type: string | null,
    total: number,
    buyer: string | null
  ) => void;
  removeCart: (itemName: string) => void;
  clearCart: () => void;
}

export const cartSlices: StateCreator<cartSlicesProps & cartFunctionProps> = (
  set,
  get
) => ({
  cart: [],
  totalCart: 0,
  addCart: (
    item: itemProps,
    type: string | null,
    total: number,
    buyer: string | null
  ) => {
    if (!buyer) return;
    const cartData = get().cart;
    const checkCart = cartData.find((cart) => cart.item === item.name);
    const userPrice = item.prices.find((price) => price.priceFor === type);
    const price = userPrice ? userPrice.price : item.prices[0].price;
    if (checkCart) {
      checkCart.qty = total;
    } else {
      cartData.push({
        buyer: buyer,
        item: item.name,
        qty: total,
        price: price,
      });
    }
    set({ totalCart: get().cart.reduce((acc, curr) => acc + curr.qty, 0) });
  },
  removeCart: (itemName: string) => {
    const cartData = get().cart;
    const checkCart = cartData.find((cart) => cart.item === itemName);

    if (checkCart) {
      const newCart = cartData.filter((cart) => cart.item !== itemName);
      set({ cart: newCart });
    }
    set({ totalCart: get().cart.reduce((acc, curr) => acc + curr.qty, 0) });
  },
  clearCart: () => {
    set({ cart: [], totalCart: 0 });
  },
});
