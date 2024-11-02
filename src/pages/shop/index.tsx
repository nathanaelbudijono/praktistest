import * as React from "react";

import { handleFetchAllItems } from "@/lib/fetcher";
import { useCartStore } from "@/lib/zustand/store";
import { itemProps } from "@/types/database-types";
import { Button } from "@/components/ui/button";

const ShopPage = () => {
  const [allItems, setAllItems] = React.useState<itemProps[] | null>(null);

  const { cart, addCart, removeCart, clearCart } = useCartStore();

  const getAllItems = async () => {
    try {
      const data = await handleFetchAllItems();
      if (data) {
        setAllItems(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getAllItems();
  }, []);
  return (
    <div>
      <h1>Shop Page</h1>
      <div>
        {allItems?.map((item) => (
          <div key={item.name}>
            <h3>{item.name}</h3>
            <button onClick={() => addCart(item)}>Add to Cart</button>
            <button onClick={() => removeCart(item)}>Remove from Cart</button>
          </div>
        ))}
      </div>
      <h1>Cart ite asm</h1>
      {cart &&
        cart.map((item, index) => {
          return (
            <div key={index}>
              <h3>{item.item}</h3>
              <p>Qty: {item.qty}</p>
            </div>
          );
        })}

      <Button onClick={clearCart}>clear </Button>
    </div>
  );
};

export default ShopPage;
