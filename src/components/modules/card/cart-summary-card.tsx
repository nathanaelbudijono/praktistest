import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Typography from "@/components/ui/typography";
import { handleFetchBuyTransaction } from "@/lib/fetcher/post-fetcher";
import { capitalizeFirstLetter, formatToIDR } from "@/lib/helper";
import { useCartStore } from "@/lib/zustand/store";
import { CircleMinus } from "lucide-react";

const CartSummaryCard = () => {
  const { cart, removeCart, totalCart, clearCart } = useCartStore();
  const grandTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const transaction = async (): Promise<void> => {
    try {
      const data = await handleFetchBuyTransaction(cart);
      if (data) {
        clearCart();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="overflow-auto mt-5">
      <div className="grid grid-cols-4 mb-2 border-b pb-2 text-center">
        <Typography variant="p">Item</Typography>
        <Typography variant="p">Quantity</Typography>

        <Typography variant="p">Total Price</Typography>
        <Typography variant="p">Action</Typography>
      </div>
      <div className="space-y-2">
        {cart.map((item, index) => {
          return (
            <div key={index} className="grid grid-cols-4 text-center ">
              <Typography variant="p">
                {capitalizeFirstLetter(item.item)}
              </Typography>
              <Typography variant="p">{item.qty}</Typography>

              <Typography variant="p">
                {formatToIDR(item.price * item.qty)}
              </Typography>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => {
                        removeCart(item.item);
                      }}
                    >
                      <CircleMinus
                        strokeWidth={1}
                        size={15}
                        className="w-full"
                      />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Remove item from cart</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          );
        })}
      </div>

      {totalCart > 0 && (
        <div className="mt-5">
          <div className="grid grid-cols-4 text-center">
            <Typography variant="p" className="border-t pt-2 text-nowrap">
              Grand Total
            </Typography>
            <p></p>
            <Typography variant="p" className="border-t pt-2 text-nowrap">
              {formatToIDR(grandTotal)}
            </Typography>
            <p></p>
          </div>

          <div className="mt-5 flex justify-center">
            <Button size="sm" className="w-full" onClick={transaction}>
              Pay
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartSummaryCard;
