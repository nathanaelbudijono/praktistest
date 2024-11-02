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

import Typography from "@/components/ui/typography";
import {
  handleFetchAllItems,
  handleFetchBuyer,
  handleFetchTotalTransaction,
} from "@/lib/fetcher/get-fetcher";
import { useSummaryStore } from "@/lib/zustand/store";
import {
  bestSpendersProps,
  buyersProps,
  itemProps,
  transactionProps,
} from "@/types/database-types";
import {
  ArrowLeftRight,
  Coins,
  RefreshCcw,
  ShoppingBasket,
  Wrench,
} from "lucide-react";
import DashboardSkeleton from "@/components/modules/skeleton/dashboard-skeleton";
import RefreshToolTip from "@/components/modules/tooltip/refresh-tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SpenderTable from "@/components/modules/table/spender-table";
import { spenderColumns } from "@/components/modules/table/spender-column";

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
  const [spenderView, setSpenderView] = React.useState<string>("card");

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

  const getAllData = async (): Promise<void> => {
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
        <RefreshToolTip getAllData={getAllData} />
      </section>
    );
  }
  return (
    <main>
      <section className="mb-5 flex justify-between items-center">
        <Typography variant="p" color="muted">
          This is your dashboard, you can view your store performance here.
        </Typography>
        <RefreshToolTip getAllData={getAllData} />
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
          <section className="mt-5 flex gap-7 h-full max-dashboard:flex-col">
            <section className="w-1/2 max-dashboard:w-full">
              <Typography variant="label" className="mb-3">
                Today Transactions
              </Typography>
              <TransactionDataTable
                columns={transactionColumns}
                data={buyerTransaction}
              />
            </section>
            <section className="w-1/2  max-dashboard:w-full">
              <Spender
                spenderView={spenderView}
                setSpenderView={setSpenderView}
                bestSpender={bestSpenders}
                totalTransaction={totalTransaction}
              />
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

const Spender = ({
  spenderView,
  setSpenderView,
  bestSpender,
  totalTransaction,
}: {
  spenderView: string;
  setSpenderView: React.Dispatch<React.SetStateAction<string>>;
  bestSpender: bestSpendersProps[];
  totalTransaction: transactionProps[];
}) => {
  return (
    <section className="h-full">
      <div className="flex justify-between items-center">
        <Typography variant="label" className="mb-3">
          Top Spenders
        </Typography>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <Wrench className="text-black/50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>View</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={spenderView}
              onValueChange={setSpenderView}
            >
              <DropdownMenuRadioItem value="card">Cards</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="table">Table</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Typography variant="p" color="muted" className="mb-3">
        Click to view more details
      </Typography>
      {spenderView === "card" ? (
        <div className="grid grid-cols-3 items-center max-dashboard:mt-5">
          {bestSpender?.map((item, index) => {
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
      ) : (
        <SpenderTable data={bestSpender} columns={spenderColumns} />
      )}
    </section>
  );
};
