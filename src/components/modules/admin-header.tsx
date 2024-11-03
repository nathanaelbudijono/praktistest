"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BASE_URL } from "@/constant/env";
import { navItemProps } from "@/types/types";
import {
  CircleUser,
  LayoutDashboard,
  LogOut,
  Menu,
  PackageOpen,
  Store,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import Typography from "../ui/typography";

const AdminHeader = ({ title }: { title: string }) => {
  const path = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    try {
      localStorage.clear();
      document.cookie =
        "permission=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      router.push(`${BASE_URL}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="flex h-14 items-center justify-between md:justify-between gap-4 bg-muted px-4 lg:h-[60px] lg:px-6">
      <div className="max-md:flex max-md:items-center max-md:gap-2">
        <Sheet>
          <SheetTrigger asChild className="md:hidden shrink-0">
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-3 text-lg font-medium">
              <div className="mb-5">
                <h1 className="font-semibold text-lg text-green-800">
                  The Islanders
                </h1>
              </div>
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex items-center gap-3 text-lg font-semibold rounded-lg px-3 py-2 text-muted-foreground transition-all ${
                    path === item.href
                      ? "font-bold bg-white shadow-sm border-l-4 border-secondary text-black"
                      : "hover:text-primary"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <Typography variant="h3" className="text-primary">
          {title}
        </Typography>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>
            <CircleUser strokeWidth={1} className="h-4 w-4" />
            <span className="sr-only">Toggle user menu</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Admin</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleLogout}>
            <LogOut strokeWidth={1} size={16} className="mr-1" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default AdminHeader;

const navItems: navItemProps[] = [
  {
    href: `${BASE_URL}/admin/dashboard`,
    icon: <LayoutDashboard strokeWidth={1} className="icon" />,
    label: "Dashboard",
  },

  {
    href: `${BASE_URL}/admin/dashboard/items`,
    icon: <PackageOpen strokeWidth={1} className="icon" />,
    label: "Manage Items",
  },
  {
    href: `${BASE_URL}/shop`,
    icon: <Store strokeWidth={1} className="icon" />,
    label: "Shop",
  },
];
