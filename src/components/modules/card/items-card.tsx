import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { capitalizeFirstLetter, formatToIDR } from "@/lib/helper";
import { itemProps } from "@/types/database-types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Image from "next/image";

const ItemsCard = ({ item }: { item: itemProps }) => {
  const pricesLength: number = item.prices.length;
  return (
    <div className="w-full border border-muted rounded-md px-6 shadow-sm pb-4 hover:scale-105 transition-transform duration-100 ease-in-out">
      <div className="w-full h-52 mt-4 rounded-md shadow-sm overflow-hidden bg-muted px-6 py-2 flex justify-center">
        <Image
          src={`/assets/items/${item.name}.png`}
          width={200}
          height={200}
          alt="item"
        />
      </div>
      <div className="mt-3">
        <Typography variant="p" color="muted">
          {capitalizeFirstLetter(item.type)}
        </Typography>
        <Typography variant="h5">{capitalizeFirstLetter(item.name)}</Typography>
        {pricesLength > 1 ? (
          <Typography variant="h5">
            {formatToIDR(item.prices[pricesLength - 1].price)} -{" "}
            {formatToIDR(item.prices[0].price)}
          </Typography>
        ) : (
          <Typography variant="h5">
            {formatToIDR(item.prices[0].price)}
          </Typography>
        )}
      </div>
      <div className="mt-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">See Details</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {capitalizeFirstLetter(item.name)} Details
              </DialogTitle>
              <DialogDescription>
                Details regarding items will be shown here, including prices and
                buyers.
              </DialogDescription>
              <div className="space-y-3">
                {item.prices.map((price, index) => {
                  const isSpecialPrice = item.prices.some(
                    (item) =>
                      item.priceFor === "vip" || item.priceFor === "wholesale"
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
      </div>
    </div>
  );
};

export default ItemsCard;
