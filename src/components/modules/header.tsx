import * as React from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BASE_URL } from "@/constant/env";
import { useCartStore } from "@/lib/zustand/store";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "../ui/button";
import CartSummaryCard from "./card/cart-summary-card";
import HeaderDropdown from "./dropdown/header-dropdown";
import GamesDropdown from "./dropdown/games-dropdown";

const Header = () => {
  const router = useRouter();
  const { totalCart, clearCart } = useCartStore();

  const [nameStore, setNameStore] = React.useState<string | null>(null);
  const [typeStore, setTypeStore] = React.useState<string | null>(null);

  React.useEffect(() => {
    const name = localStorage.getItem("name");
    const type = localStorage.getItem("type");
    setNameStore(name);
    setTypeStore(type);
  }, []);

  const handleLogOut = (): void => {
    try {
      localStorage.clear();
      setNameStore(null);
      setTypeStore(null);
      if (typeStore === "admin") {
        document.cookie =
          "permission=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      } else {
        document.cookie =
          "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        clearCart();
      }

      router.push(`${BASE_URL}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="flex justify-between items-center">
      <Link
        href={`${BASE_URL}`}
        className="font-semibold text-2xl text-green-800"
      >
        The Islanders
      </Link>

      <div className="flex gap-4 items-center">
        <GamesDropdown />
        {!nameStore ? (
          <Button size="sm" onClick={() => router.push(`${BASE_URL}/login`)}>
            Login
          </Button>
        ) : (
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <ShoppingCart strokeWidth={1} size={20} />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Total Cart Items</SheetTitle>
                  <SheetDescription>
                    {totalCart === 0
                      ? "No items in cart, start shopping!"
                      : `You have ${totalCart} items`}
                  </SheetDescription>
                </SheetHeader>
                <CartSummaryCard />
              </SheetContent>
            </Sheet>
            <HeaderDropdown
              nameStore={nameStore}
              typeStore={typeStore}
              handleLogOut={handleLogOut}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default Header;
