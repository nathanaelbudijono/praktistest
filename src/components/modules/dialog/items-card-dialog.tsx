import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Typography from "@/components/ui/typography";
import { capitalizeFirstLetter, formatToIDR } from "@/lib/helper";
import { pricesProps } from "@/types/database-types";

const ItemCardDialog = ({
  name,
  description,
  prices,
}: {
  name: string;
  description: string;
  prices: pricesProps[];
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">See Details</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{capitalizeFirstLetter(name)} Details</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          <div className="space-y-3">
            {prices?.map((price, index) => {
              const isSpecialPrice = prices?.some(
                (item) =>
                  item.priceFor === "VIP" || item.priceFor === "wholesale"
              );
              return isSpecialPrice ? (
                <div key={index} className="flex gap-1 items-center">
                  <Typography variant="p">
                    {capitalizeFirstLetter(price.priceFor)} Price
                  </Typography>
                  <Typography variant="p">
                    {formatToIDR(price.price)}
                  </Typography>
                </div>
              ) : (
                <div key={index} className="flex gap-1 items-center">
                  <Typography variant="p">
                    This item is being sold to all buyers with a price of{" "}
                    {formatToIDR(price.price)}
                  </Typography>
                </div>
              );
            })}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ItemCardDialog;
