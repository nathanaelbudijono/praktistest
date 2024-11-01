import * as React from "react";

import ItemsCard from "@/components/modules/card/items-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/typography";
import { handleFetchAllItems, handleFetchCategory } from "@/lib/fetcher";
import { capitalizeFirstLetter } from "@/lib/helper";
import { itemProps } from "@/types/database-types";
import Image from "next/image";

const ManageItemsComponent = () => {
  const [category, setCategory] = React.useState<string[] | null>(null);
  const [allItems, setAllItems] = React.useState<itemProps[] | null>(null);
  const [filteredItems, setFilteredItems] = React.useState<itemProps[] | null>(
    null
  );

  const [search, setSearch] = React.useState<string>("");
  const [categorySelected, setCategorySelected] = React.useState<string>("");

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

  React.useEffect(() => {
    getCategory();
    getAllItems();
  }, []);

  React.useEffect(() => {
    performSearch();
  }, [search, performSearch]);

  return (
    <main>
      <Typography variant="h4">Explore Categories</Typography>
      <section className="mt-5">
        <div className="space-x-3">
          {category &&
            category?.map((item, index) => {
              return (
                <Button
                  className="w-40"
                  key={index}
                  onClick={() => handleFilterCategory(item)}
                  variant={categorySelected !== item ? "default" : "secondary"}
                >
                  <Image
                    src={`/assets/category/${item}.png`}
                    width={30}
                    height={30}
                    alt="item"
                  />
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
            className="w-52 mb-5"
          />
        )}

        {filteredItems?.length !== 0 && (
          <div className="grid grid-cols-1 gap-3 tablet:grid-cols-2  lg:grid=cols-3 xl:grid-cols-4 ">
            {filteredItems?.map((item, index) => {
              return <ItemsCard key={index} item={item} />;
            })}
          </div>
        )}
      </section>
      {!allItems && (
        <section className="mt-5 text-center">
          <Typography variant="h4">No records are found</Typography>
        </section>
      )}
    </main>
  );
};

export default ManageItemsComponent;
