import * as React from "react";

import Typography from "@/components/ui/typography";

import {
  buyersProps,
  itemProps,
  summaryProps,
  transactionProps,
} from "@/types/database-types";
import {
  handleFetchAllItems,
  handleFetchBuyer,
  handleFetchSummary,
  handleFetchTotalTransaction,
} from "@/lib/fetcher";
import { ArrowLeftRight, Coins, ShoppingBasket } from "lucide-react";
import RevenueCard from "@/components/modules/card/revenue-card";
import RevenuePerCategoryChart from "@/components/modules/chart/revenue-per-category-chart";
import Image from "next/image";
import { capitalizeFirstLetter } from "@/lib/helper";
import {
  BestSellingCard,
  BestSellingCardNotFound,
} from "@/components/modules/card/best-selling-card";

const DashboardComponent = () => {
  const [totalTransaction, setTotalTransaction] = React.useState<
    transactionProps[] | null
  >(null);
  const [summary, setSummary] = React.useState<summaryProps | null>(null);
  const [allItems, setAllItems] = React.useState<itemProps[] | null>(null);
  const [buyers, setBuyers] = React.useState<buyersProps[] | null>(null);

  const getTransaction = async (): Promise<void> => {
    try {
      const data = await handleFetchTotalTransaction();
      if (data) {
        setTotalTransaction(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getSummary = async (): Promise<void> => {
    try {
      const data = await handleFetchSummary();
      if (data) {
        setSummary(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllItems = async (): Promise<void> => {
    try {
      const allItemsData = await handleFetchAllItems();
      if (allItemsData) {
        setAllItems(allItemsData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllBuyers = async (): Promise<void> => {
    try {
      const data = await handleFetchBuyer();
      if (data) {
        setBuyers(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getTransaction();
    getSummary();
    getAllItems();
    getAllBuyers();
  }, []);

  return (
    summary &&
    allItems &&
    buyers &&
    totalTransaction && (
      <main className="w-full flex gap-5 max-lg:flex-col">
        <section className="w-1/2 max-md:w-full">
          <div className="flex gap-2 max-md:flex-col">
            <Revenue summary={summary} totalTransaction={totalTransaction} />
            <RevenuePerCategoryChart summary={summary} />
          </div>
        </section>
        <section className="w-1/2 max-md:w-full">
          <div className="h-full">
            <BestSelling
              summary={summary}
              allItems={allItems}
              totalTransaction={totalTransaction}
              buyers={buyers}
            />
          </div>
        </section>
      </main>
    )
  );
};

export default DashboardComponent;

const Revenue = ({
  summary,
  totalTransaction,
}: {
  summary: summaryProps;
  totalTransaction: transactionProps[];
}) => {
  const totalItemsSold = totalTransaction.reduce(
    (acc, curr) => acc + curr.qty,
    0
  );
  return (
    <section className="w-full flex flex-col gap-2 max-md:grid max-md:grid-cols-3">
      <RevenueCard
        title="Today Revenue"
        description="Sales increase by 12%."
        info={summary.revenue}
        currency={true}
        icon={Coins}
        color="0ea7fd"
      />
      <RevenueCard
        title="Total Transaction"
        info={summary.totalTransaction}
        icon={ArrowLeftRight}
        color="fdc455"
      />

      <RevenueCard
        title="Total Item Sold"
        info={totalItemsSold}
        icon={ShoppingBasket}
        color="138378"
      />
    </section>
  );
};

const BestSelling = ({
  summary,
  allItems,
  totalTransaction,
  buyers,
}: {
  summary: summaryProps;
  allItems: itemProps[];
  totalTransaction: transactionProps[];
  buyers: buyersProps[];
}) => {
  const bestSellingData: itemProps | undefined = allItems.find(
    (item) => item.name === summary.bestSellingItem
  );

  return (
    <div className="grid grid-cols-2 gap-2 h-full">
      {bestSellingData ? (
        <BestSellingCard
          bestSellingData={bestSellingData}
          totalTransaction={totalTransaction}
          buyers={buyers}
        />
      ) : (
        <BestSellingCardNotFound />
      )}

      <BestSellingCard
        bestSellingData={bestSellingData}
        totalTransaction={totalTransaction}
        buyers={buyers}
      />
    </div>
  );
};
