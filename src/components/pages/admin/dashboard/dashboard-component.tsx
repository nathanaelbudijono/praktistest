import * as React from "react";

import {
  BestSellingCategoryCard,
  BestSellingItemCard,
  BestSellingItemCardNotFound,
} from "@/components/modules/card/best-selling-card";
import RevenueCard from "@/components/modules/card/revenue-card";
import TopSpenderCard from "@/components/modules/card/top-spender-card";
import RevenueChart from "@/components/modules/chart/revenue-chart";
import { transactionColumns } from "@/components/modules/table/transaction-column";
import TransactionDataTable from "@/components/modules/table/transaction-table";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Typography from "@/components/ui/typography";
import {
  handleFetchAllItems,
  handleFetchBuyer,
  handleFetchTotalTransaction,
} from "@/lib/fetcher/get-fetcher";
import { useSummaryStore } from "@/lib/zustand/store";
import {
  buyersProps,
  itemProps,
  transactionProps,
} from "@/types/database-types";
import {
  ArrowLeftRight,
  Coins,
  RefreshCcw,
  ShoppingBasket,
} from "lucide-react";
import DashboardSkeleton from "@/components/modules/skeleton/dashboard-skeleton";

const DashboardComponent = () => {
  const {
    calculateSummary,
    transactionCount,
    revenue,
    rpc,
    rpi,
    buyerTransaction,
    bestSellingCategory,
    bestSellingItem,
    bestSpenders,
  } = useSummaryStore();
  const [totalTransaction, setTotalTransaction] = React.useState<
    transactionProps[] | null
  >(null);
  const [allItems, setAllItems] = React.useState<itemProps[] | null>(null);
  const [buyers, setBuyers] = React.useState<buyersProps[] | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

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

  const getAllData = async () => {
    setIsLoading(true);
    await getTransaction();
    await getAllItems();
    await getAllBuyers();
    setIsLoading(false);
  };

  React.useEffect(() => {
    getAllData();
  }, []);

  // useEffect to calcualte summary
  React.useEffect(() => {
    if (allItems && buyers && totalTransaction) {
      calculateSummary(allItems, buyers, totalTransaction);
    }
  }, [allItems, buyers, totalTransaction]);

  if (isLoading) {
    return <DashboardSkeleton />;
  }
  if (!allItems || !buyers || !totalTransaction) {
    return (
      <section className="mb-5 flex justify-between items-center">
        <Typography variant="p" color="muted">
          Failed to load data. Please refresh the page and look toast for error
        </Typography>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={getAllData} variant="ghost">
                <RefreshCcw strokeWidth={1} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Refresh</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </section>
    );
  }
  return (
    <main>
      <section className="mb-5 flex justify-between items-center">
        <Typography variant="p" color="muted">
          This is your dashboard, you can view your store performance here.
        </Typography>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={getAllData} variant="ghost">
                <RefreshCcw strokeWidth={1} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Refresh</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </section>
      {allItems && buyers && totalTransaction && (
        <section className="md:h-[95vh] overflow-auto">
          <section className="w-full flex gap-7 max-dashboard:flex-col">
            <section className="w-1/2 max-dashboard:w-full">
              <div className="flex gap-5 max-md:flex-col">
                <Revenue
                  totalTransaction={totalTransaction}
                  transactionCount={transactionCount}
                  revenue={revenue}
                />
                <RevenueChart rpc={rpc} rpi={rpi} />
              </div>
            </section>
            <section className="w-1/2 max-dashboard:w-full">
              <div className="h-full">
                <BestSelling
                  allItems={allItems}
                  totalTransaction={totalTransaction}
                  buyers={buyers}
                  bestSellingCategory={bestSellingCategory}
                  bestSellingItem={bestSellingItem}
                />
              </div>
            </section>
          </section>
          <section className="mt-5 flex gap-7 max-dashboard:flex-col">
            <section className="w-1/2 max-dashboard:w-full">
              <Typography variant="label" className="mb-3">
                Today Transactions
              </Typography>
              <TransactionDataTable
                columns={transactionColumns}
                data={buyerTransaction}
              />
            </section>
            <section className="w-1/2 max-dashboard:w-full">
              <Typography variant="label" className="mb-3">
                Top Spenders
              </Typography>
              <Typography variant="p" color="muted">
                Click to view more details
              </Typography>
              <div className="h-full grid grid-cols-3 items-center max-dashboard:mt-5">
                {bestSpenders?.map((item, index) => {
                  return (
                    <div key={index}>
                      <TopSpenderCard
                        item={item}
                        index={index}
                        totalTransaction={totalTransaction}
                      />
                    </div>
                  );
                })}
              </div>
            </section>
          </section>
        </section>
      )}
    </main>
  );
};

export default DashboardComponent;

const Revenue = ({
  transactionCount,
  totalTransaction,
  revenue,
}: {
  transactionCount: number;
  revenue: number;
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
        info={revenue}
        currency={true}
        icon={Coins}
        color="0ea7fd"
      />
      <RevenueCard
        title="Total Transaction"
        info={transactionCount}
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
  bestSellingCategory,
  bestSellingItem,
  allItems,
  totalTransaction,
  buyers,
}: {
  bestSellingCategory: string;
  bestSellingItem: string;
  allItems: itemProps[];
  totalTransaction: transactionProps[];
  buyers: buyersProps[];
}) => {
  const bestSellingItemData: itemProps | undefined = allItems.find(
    (item) => item.name === bestSellingItem
  );

  return (
    <div className="grid grid-cols-2 gap-2 h-full">
      {bestSellingItemData ? (
        <BestSellingItemCard
          bestSellingItemData={bestSellingItemData}
          totalTransaction={totalTransaction}
          buyers={buyers}
        />
      ) : (
        <BestSellingItemCardNotFound />
      )}
      {bestSellingCategory ? (
        <BestSellingCategoryCard
          totalTransaction={totalTransaction}
          allItems={allItems}
        />
      ) : (
        <BestSellingItemCardNotFound />
      )}
    </div>
  );
};
