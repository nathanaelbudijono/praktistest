import * as React from "react";

import ShopCard from "@/components/modules/card/shop-card";
import FilterShopDropdown from "@/components/modules/dropdown/filter-shop-dropdown";
import Footer from "@/components/modules/footer";
import Header from "@/components/modules/header";
import ShopSkeleton from "@/components/modules/skeleton/shop-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/ui/layout/layout";
import Typography from "@/components/ui/typography";
import {
  handleFetchAllItems,
  handleFetchCategory,
} from "@/lib/fetcher/get-fetcher";
import { capitalizeFirstLetter } from "@/lib/helper";
import { itemProps } from "@/types/database-types";

const ShopComponent = () => {
  const [allItems, setAllItems] = React.useState<itemProps[] | null>(null);
  const [category, setCategory] = React.useState<string[] | null>(null);
  const [filteredItems, setFilteredItems] = React.useState<itemProps[] | null>(
    null
  );
  const [categorySelected, setCategorySelected] = React.useState<string>("");
  const [search, setSearch] = React.useState<string>("");
  const [filter, setFilter] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const getAllItems = async () => {
    try {
      const data = await handleFetchAllItems();
      if (data) {
        setAllItems(data);
        setFilteredItems(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCategory = async (): Promise<void> => {
    try {
      const categoryData = await handleFetchCategory();
      if (categoryData) {
        setCategory(categoryData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllData = async (): Promise<void> => {
    setIsLoading(true);
    await getAllItems();
    await getCategory();
    setIsLoading(false);
  };

  const handleFilterCategory = (item: string): void => {
    if (allItems) {
      if (categorySelected === item) {
        setCategorySelected("");
        setFilter("");
        setFilteredItems(allItems);
        return;
      }
      setCategorySelected(item);
      const filteredItems = allItems.filter((data) => data.type === item);
      console.log(filteredItems);
      setFilteredItems(filteredItems);
    }
  };

  const handleFilterBar = (filterType: string): void => {
    const sortedItems = filteredItems;
    if (sortedItems === null) return;
    try {
      switch (filterType) {
        case "name":
          sortedItems.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "cheap":
          sortedItems.sort((a, b) => a.prices[0].price - b.prices[0].price);
          break;
        case "expensive":
          sortedItems.sort((a, b) => b.prices[0].price - a.prices[0].price);
      }

      setFilteredItems(sortedItems);
    } catch (err) {
      console.log(err);
    }
  };

  const performSearch = React.useCallback(() => {
    if (allItems) {
      const lowerCasedSearch = search.toLowerCase();
      const searchedItems = allItems.filter((item) =>
        item.name.toLowerCase().includes(lowerCasedSearch)
      );
      setFilteredItems(searchedItems);
    }
  }, [search, allItems]);

  React.useEffect(() => {
    performSearch();
  }, [search, performSearch]);

  React.useEffect(() => {
    getAllData();
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <ShopSkeleton />
      </Layout>
    );
  }

  return (
    <Layout>
      <Header />
      <main className="mt-5">
        <div>
          <Typography variant="h3">Today&apos;s Deal</Typography>
          <Typography variant="p" color="muted" className="mt-3">
            What&apos;s your vibe for today? Use the quick search or the search
            bar to find what you need quickly.
          </Typography>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <div className="flex flex-wrap gap-2 ">
            {allItems &&
              category &&
              category?.map((item, index) => {
                return (
                  <Button
                    size="sm"
                    key={index}
                    onClick={() => handleFilterCategory(item)}
                    variant={categorySelected !== item ? "default" : "outline"}
                  >
                    <Typography variant="p" color="white">
                      {capitalizeFirstLetter(item)}
                    </Typography>
                  </Button>
                );
              })}
          </div>
          <FilterShopDropdown
            filter={filter}
            setFilter={setFilter}
            handleFilterBar={handleFilterBar}
          />
        </div>
        <div className="mt-3">
          {allItems && (
            <Input
              placeholder="Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-52 mb-5"
            />
          )}
          {filteredItems?.length !== 0 ? (
            <div className="grid grid-cols-1 gap-3 tablet:grid-cols-2 xl:grid-cols-3">
              {filteredItems?.map((item, index) => {
                return <ShopCard key={index} item={item} />;
              })}
            </div>
          ) : (
            <Typography variant="p" color="muted">
              No items found
            </Typography>
          )}
        </div>
      </main>
      <Footer />
    </Layout>
  );
};

export default ShopComponent;
