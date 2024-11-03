import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { CircleUser, LogOut, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "../ui/button";
import CartSummaryCard from "./card/cart-summary-card";

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

  const handleLogOut = () => {
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
      {!nameStore ? (
        <Button size="sm" onClick={() => router.push(`${BASE_URL}/login`)}>
          Login
        </Button>
      ) : (
        <div className="flex items-center gap-3">
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button>
                <CircleUser strokeWidth={1} className="h-4 w-4" />
                <span className="sr-only">Toggle user menu</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {nameStore}, {typeStore}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogOut}>
                <LogOut strokeWidth={1} size={16} className="mr-1" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </main>
  );
};

export default Header;
