import * as React from "react";

import Typography from "@/components/ui/typography";
import { capitalizeFirstLetter, formatToIDR } from "@/lib/helper";
import { itemProps } from "@/types/database-types";

import Image from "next/image";
import { useRouter } from "next/router";
import { BASE_URL } from "@/constant/env";

const ShopCard = ({ item }: { item: itemProps }) => {
  const router = useRouter();

  const [imageSrc, setImageSrc] = React.useState<string>(
    `/assets/items/${item.name}.png`
  );

  const pricesLength: number = item.prices.length;

  const handleError = () => {
    setImageSrc("/assets/background.jpg");
  };
  const handleRouteDetailsItem = () => {
    router.push(`${BASE_URL}/shop/items/${item.name}`);
  };

  React.useEffect(() => {
    setImageSrc(`/assets/items/${item.name}.png`);
  }, [item.name]);

  return (
    <button onClick={handleRouteDetailsItem}>
      <div className="w-full border border-muted rounded-md px-6 shadow-sm pb-4 hover:scale-105 transition-transform duration-100 ease-in-out text-start">
        <div className="w-full h-52 mt-4 rounded-md shadow-sm overflow-hidden bg-muted px-6 py-2 flex justify-center">
          <Image
            src={imageSrc}
            width={200}
            height={200}
            alt="item"
            onError={handleError}
          />
        </div>
        <div className="mt-3">
          <Typography variant="p" color="muted">
            {capitalizeFirstLetter(item.type)}
          </Typography>
          <Typography variant="h5">
            {capitalizeFirstLetter(item.name)}
          </Typography>
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
      </div>
    </button>
  );
};

export default ShopCard;
