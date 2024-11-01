import Typography from "@/components/ui/typography";
import {
  calculateBestItemRevenue,
  calculateBestItemSold,
  capitalizeFirstLetter,
  formatToIDR,
} from "@/lib/helper";
import {
  buyersProps,
  itemProps,
  transactionProps,
} from "@/types/database-types";
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
  const pricesLength: number = bestSellingItemData.prices.length;
  const totalBestItemSold: number = calculateBestItemSold(
    totalTransaction,
    bestSellingItemData
  );
  const totalBestItemRevenue: number = calculateBestItemRevenue(
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
          src={`/assets/items/${bestSellingItemData?.name}.png`}
          width={200}
          height={200}
          alt="item"
        />
      </div>
      <div className="py-5">
        <Typography variant="h5">
          {totalBestItemSold} {capitalizeFirstLetter(bestSellingItemData?.name)}{" "}
          sold today
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
  bestSellingItemData,
  totalTransaction,
  buyers,
}: {
  bestSellingItemData: itemProps;
  totalTransaction: transactionProps[];
  buyers: buyersProps[];
}) => {
  const pricesLength: number = bestSellingItemData.prices.length;
  const totalBestItemSold: number = calculateBestItemSold(
    totalTransaction,
    bestSellingItemData
  );
  const totalBestItemRevenue: number = calculateBestItemRevenue(
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
          src={`/assets/items/${bestSellingItemData?.name}.png`}
          width={200}
          height={200}
          alt="item"
        />
      </div>
      <div className="py-5">
        <Typography variant="h5">
          {totalBestItemSold} {capitalizeFirstLetter(bestSellingItemData?.name)}{" "}
          sold today
        </Typography>

        <Typography variant="h5">
          This item generates a revenue of {formatToIDR(totalBestItemRevenue)}
        </Typography>
      </div>
    </div>
  );
};

export {
  BestSellingItemCard,
  BestSellingItemCardNotFound,
  BestSellingCategoryCard,
};