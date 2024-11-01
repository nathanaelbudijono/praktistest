import * as React from "react";

import Typography from "@/components/ui/typography";
import { capitalizeFirstLetter, formatToIDR } from "@/lib/helper";
import { useSummaryStore } from "@/lib/zustand/store";
import {
  buyersProps,
  itemProps,
  transactionProps,
} from "@/types/database-types";
import { Trophy } from "lucide-react";
import Image from "next/image";

const BestSellingItemCard = ({
  bestSellingItemData,
  totalTransaction,
  buyers,
}: {
  bestSellingItemData: itemProps;
  totalTransaction: transactionProps[];
  buyers: buyersProps[];
}) => {
  const { calculateBestItemSoldQuantity, calculateBestItemRevenue } =
    useSummaryStore();

  const [imageSrc, setImageSrc] = React.useState<string>(
    `/assets/items/${bestSellingItemData?.name}.png`
  );

  const handleError = () => {
    setImageSrc("/assets/background.jpg");
  };

  const bestItemSoldQuantity = calculateBestItemSoldQuantity(
    totalTransaction,
    bestSellingItemData
  );

  const totalBestItemRevenue = calculateBestItemRevenue(
    totalTransaction,
    bestSellingItemData,
    buyers
  );

  return (
    <div className="w-full border rounded-md px-6 shadow-sm pb-4">
      <div className="pt-6">
        <Typography variant="label">Best Selling Item</Typography>
        <Typography variant="h3">
          {capitalizeFirstLetter(bestSellingItemData?.name)}
        </Typography>
      </div>
      <div className="w-full h-52 mt-4 rounded-md shadow-sm overflow-hidden bg-muted px-6 py-2 flex justify-center">
        <Image
          src={imageSrc}
          width={200}
          height={200}
          alt="item"
          onError={handleError}
        />
      </div>
      <div className="py-5">
        <Typography variant="h5">
          {bestItemSoldQuantity}{" "}
          {capitalizeFirstLetter(bestSellingItemData?.name)} sold today
        </Typography>

        <Typography variant="h5">
          This item generates a revenue of {formatToIDR(totalBestItemRevenue)}
        </Typography>
      </div>
    </div>
  );
};

const BestSellingItemCardNotFound = () => {
  return (
    <div className="w-full border rounded-md px-6 shadow-sm pb-4">
      <div className="pt-6">
        <Typography variant="label">Best Selling Item</Typography>
        <Typography variant="h3">No item found</Typography>
      </div>
      <div className="w-full h-52 mt-4 rounded-md shadow-sm overflow-hidden bg-muted px-6 py-2 flex justify-center"></div>
      <div className="py-5">
        <Typography variant="h5">Cannot retrive details</Typography>
      </div>
    </div>
  );
};

const BestSellingCategoryCard = ({
  allItems,
  totalTransaction,
}: {
  allItems: itemProps[];
  totalTransaction: transactionProps[];
}) => {
  const { bestSellingCategory, calculateBestItemCategoryQuantity, rpc } =
    useSummaryStore();
  const bestItemCategoryQuantity = calculateBestItemCategoryQuantity(
    allItems,
    totalTransaction
  );

  return (
    <div className="w-full border rounded-md px-6 shadow-sm pb-4">
      <div className="pt-6">
        <Typography variant="label">Best Selling Category</Typography>
        <Typography variant="h3">
          {capitalizeFirstLetter(bestSellingCategory)}
        </Typography>
      </div>
      <div className="w-full h-52 mt-4 flex justify-center items-center rounded-md shadow-sm overflow-hidden bg-muted px-6 py-2">
        <Trophy strokeWidth={1} size={30} />
      </div>
      <div className="py-5">
        <Typography variant="h5">
          {bestItemCategoryQuantity} {bestSellingCategory} sold today
        </Typography>

        <Typography variant="h5">
          This Item generated a revenue of {formatToIDR(rpc[0]?.revenue)}
        </Typography>
      </div>
    </div>
  );
};

const BestSellingCategoryCardNotFound = ({
  allItems,
  totalTransaction,
}: {
  allItems: itemProps[];
  totalTransaction: transactionProps[];
}) => {
  const { bestSellingCategory, calculateBestItemCategoryQuantity, rpc } =
    useSummaryStore();
  const bestItemCategoryQuantity = calculateBestItemCategoryQuantity(
    allItems,
    totalTransaction
  );

  return (
    <div className="w-full border rounded-md px-6 shadow-sm pb-4">
      <div className="pt-6">
        <Typography variant="label">Best Selling Category</Typography>
        <Typography variant="h3">No item found</Typography>
      </div>
      <div className="w-full h-52 mt-4 flex justify-center items-center rounded-md shadow-sm overflow-hidden bg-muted px-6 py-2">
        <Trophy strokeWidth={1} size={30} />
      </div>
      <div className="py-5">
        <Typography variant="h5">Cannot retrive details</Typography>
      </div>
    </div>
  );
};

export {
  BestSellingCategoryCard,
  BestSellingItemCard,
  BestSellingItemCardNotFound,
  BestSellingCategoryCardNotFound,
};
