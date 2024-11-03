import React from "react";

import Header from "@/components/modules/header";
import { Button } from "@/components/ui/button";
import Layout from "@/components/ui/layout/layout";
import Typography from "@/components/ui/typography";
import { BASE_URL } from "@/constant/env";
import useCheckLogged from "@/hooks/use-check-logged";
import { toast } from "@/hooks/use-toast";
import { handleFetchItemDetail } from "@/lib/fetcher/get-fetcher";
import { capitalizeFirstLetter, formatToIDR } from "@/lib/helper";
import { useCartStore } from "@/lib/zustand/store";
import { itemProps } from "@/types/database-types";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import ItemDetailSkeleton from "@/components/modules/skeleton/item-detail-skeleton";
import Footer from "@/components/modules/footer";

const ItemDetailComponent = ({ item }: { item: string }) => {
  const [name, type, permission] = useCheckLogged();
  const { addCart, cart } = useCartStore();
  const router = useRouter();

  const [itemDetail, setItemDetail] = React.useState<itemProps | null>(null);
  const [counter, setCounter] = React.useState<number>(
    cart.find((cartItem) => cartItem.item === item)?.qty || 1
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const itemDetailLength = itemDetail?.prices.length || 0;

  const getItemDetail = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const data = await handleFetchItemDetail(item);
      if (data) {
        setItemDetail(data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddtoCart = (itemDetail: itemProps): void => {
    try {
      if (!name && !type && !permission) {
        router.push(`${BASE_URL}/login`);
        toast({
          variant: "destructive",
          title: "Please create an account to add item to cart",
        });
        return;
      }
      addCart(itemDetail, type, counter, name);
      toast({
        title: `${counter} ${itemDetail.name} added to cart`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    if (!item) return;
    getItemDetail();
  }, [item]);

  if (isLoading) {
    return <ItemDetailSkeleton />;
  }

  return itemDetail ? (
    <Layout>
      <Header />
      <main className="h-screen">
        <section className="mt-5">
          <Link href={`${BASE_URL}/shop`}>
            <ArrowLeft className="text-gray-500" />
          </Link>
        </section>
        <section className="mt-5 flex h-[90vh] items-center max-tablet:h-full">
          <div className="w-1/2 bg-muted max-lg:hidden">
            <div className="flex justify-center items-center py-6">
              <Image
                priority
                alt={item}
                src={`/assets/items/${itemDetail.name}.png`}
                className="object-cover -z-0"
                width={500}
                height={500}
              />
            </div>
          </div>
          <div className="w-1/2 flex flex-col  justify-center text-start max-lg:w-full lg:px-32">
            <div className="flex justify-center items-center py-6 lg:hidden">
              <Image
                priority
                alt={item}
                src={`/assets/items/${itemDetail.name}.png`}
                className="object-cover -z-0"
                width={500}
                height={500}
              />
            </div>
            <div className="space-y-1 w-full">
              <Typography variant="h5" color="muted">
                {capitalizeFirstLetter(itemDetail.type)}
              </Typography>
              <Typography variant="h2">
                {capitalizeFirstLetter(itemDetail.name)}
              </Typography>
              <Typography variant="p" color="muted">
                {capitalizeFirstLetter(itemDetail.description)}
              </Typography>
            </div>
            <div className="mt-5 w-full">
              <Typography variant="p">Item Price</Typography>

              {permission !== "user" && (
                <div>
                  {itemDetailLength > 1 ? (
                    <Typography variant="h4">
                      {formatToIDR(
                        itemDetail.prices[itemDetailLength - 1].price
                      )}{" "}
                      - {formatToIDR(itemDetail.prices[0].price)}
                    </Typography>
                  ) : (
                    <Typography variant="h4">
                      {formatToIDR(itemDetail.prices[0].price)}
                    </Typography>
                  )}
                </div>
              )}

              {name && permission === "user" && (
                <Typography variant="h4">
                  {formatToIDR(
                    itemDetail.prices.find((item) => item.priceFor === type)
                      ?.price || itemDetail.prices[0].price
                  )}
                </Typography>
              )}
            </div>
            {permission !== "admin" && (
              <div className="mt-5 flex items-center space-x-2 max-lg:justify-center max-lg:mb-10">
                <Button
                  onClick={() => {
                    handleAddtoCart(itemDetail);
                  }}
                >
                  {cart.find((cartItem) => cartItem.item === item)
                    ? "Update Cart"
                    : "Add to Cart"}
                </Button>
                <Counter counter={counter} setCounter={setCounter} />
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </Layout>
  ) : (
    <Layout>
      <Header />
      <section>
        <Typography variant="h2">Item not found</Typography>
      </section>
    </Layout>
  );
};

export default ItemDetailComponent;

const Counter = ({
  counter,
  setCounter,
}: {
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="flex border rounded-md">
      <Button
        onClick={() => {
          if (counter > 1) setCounter(counter - 1);
        }}
        variant="ghost"
        className="mr-2"
        size="sm"
      >
        -
      </Button>
      <Typography variant="h4">{counter}</Typography>
      <Button
        onClick={() => setCounter(counter + 1)}
        variant="ghost"
        className="ml-2"
        size="sm"
      >
        +
      </Button>
    </div>
  );
};
