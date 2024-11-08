import * as React from "react";

import ItemsCard from "@/components/modules/card/items-card";
import ManageItemSkeleton from "@/components/modules/skeleton/manage-item-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/typography";
import {
  handleFetchAllItems,
  handleFetchCategory,
} from "@/lib/fetcher/get-fetcher";
import { capitalizeFirstLetter } from "@/lib/helper";
import { itemProps } from "@/types/database-types";

const ManageItemsComponent = () => {
  const [category, setCategory] = React.useState<string[]>([]);
  const [allItems, setAllItems] = React.useState<itemProps[] | null>(null);
  const [filteredItems, setFilteredItems] = React.useState<itemProps[] | null>(
    null
  );

  const [search, setSearch] = React.useState<string>("");
  const [categorySelected, setCategorySelected] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // Fetch category
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

  // Fetch all items
  const getAllItems = async (): Promise<void> => {
    try {
      const allItemsData = await handleFetchAllItems();
      if (allItemsData) {
        setAllItems(allItemsData);
        setFilteredItems(allItemsData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Filter category
  const handleFilterCategory = (item: string): void => {
    if (allItems) {
      if (categorySelected === item) {
        setCategorySelected("");
        setFilteredItems(allItems);
        return;
      }
      setCategorySelected(item);
      const filteredItems = allItems.filter((data) => data.type === item);
      setFilteredItems(filteredItems);
    }
  };

  // Perform search
  const performSearch = React.useCallback(() => {
    if (allItems) {
      const lowerCasedSearch = search.toLowerCase();
      const searchedItems = allItems.filter((item) =>
        item.name.toLowerCase().includes(lowerCasedSearch)
      );
      setFilteredItems(searchedItems);
    }
  }, [search, allItems]);

  const fetchItems = async (): Promise<void> => {
    setIsLoading(true);
    await getCategory();
    await getAllItems();
    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchItems();
  }, []);

  React.useEffect(() => {
    performSearch();
  }, [search, performSearch]);

  if (isLoading) {
    return <ManageItemSkeleton />;
  }

  return (
    <main>
      <Typography variant="p" color="muted">
        Manage and see details of all items in the store right here.
      </Typography>
      <section className="md:h-[95vh] overflow-auto mt-5">
        <section>
          <div className="flex flex-wrap gap-2">
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
        </section>
        <section className="mt-5">
          {allItems && (
            <Input
              placeholder="Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-52 mb-5 translate-y-2.5"
            />
          )}

          {filteredItems?.length !== 0 ? (
            <div className="grid grid-cols-1 gap-3 tablet:grid-cols-2 xl:grid-cols-3">
              {filteredItems?.map((item, index) => {
                return <ItemsCard key={index} item={item} />;
              })}
            </div>
          ) : (
            <Typography variant="p" color="muted">
              No items found
            </Typography>
          )}
        </section>

        {!allItems && (
          <section className="mt-5 text-center">
            <Typography variant="h4">No records</Typography>
          </section>
        )}
      </section>
    </main>
  );
};

export default ManageItemsComponent;
