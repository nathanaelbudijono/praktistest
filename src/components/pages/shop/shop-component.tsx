import ShopCard from "@/components/modules/card/shop-card";
import Header from "@/components/modules/header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import Layout from "@/components/ui/layout/layout";
import Typography from "@/components/ui/typography";
import {
  handleFetchAllItems,
  handleFetchCategory,
} from "@/lib/fetcher/get-fetcher";
import { capitalizeFirstLetter } from "@/lib/helper";
import { itemProps } from "@/types/database-types";
import { Filter } from "lucide-react";
import * as React from "react";

const ShopComponent = () => {
  const [allItems, setAllItems] = React.useState<itemProps[] | null>(null);
  const [category, setCategory] = React.useState<string[] | null>(null);
  const [filteredItems, setFilteredItems] = React.useState<itemProps[] | null>(
    null
  );
  const [categorySelected, setCategorySelected] = React.useState<string>("");
  const [search, setSearch] = React.useState<string>("");
  const [filter, setFilter] = React.useState<string>("");

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
    let sortedItems = filteredItems;
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
    getAllItems();
    getCategory();
  }, []);

  return (
    <Layout>
      <Header />
      <section className="mt-5">
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <Filter strokeWidth={1} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter items</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={filter}
                onValueChange={(value) => {
                  setFilter(value);
                  handleFilterBar(value);
                }}
              >
                <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="cheap">
                  Cheapest
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="expensive">
                  Expensive
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
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
      </section>
    </Layout>
  );
};

export default ShopComponent;
