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
import { cn } from "@/lib/utils";
import { navItemProps } from "@/types/types";

import {
  CircleUser,
  FileUp,
  FolderPlus,
  FolderUp,
  LayoutDashboard,
  LogOut,
  Menu,
  PackageOpen,
  Plus,
  SendToBack,
  UserPen,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Typography from "../ui/typography";

const AdminHeader = ({ title }: { title: string }) => {
  const path = usePathname();

  return (
    <header className="flex h-14 items-center justify-between md:justify-between gap-4 bg-muted px-4 lg:h-[60px] lg:px-6">
      <div className="max-md:flex max-md:items-center max-md:gap-2">
        <Sheet>
          <SheetTrigger asChild className="md:hidden shrink-0">
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <Image
              src="/assets/logo.png"
              alt="WooBlazz Meet"
              width={96}
              height={30}
              className="object-cover mb-5"
              loading="lazy"
            />

            <nav className="grid gap-3 text-lg font-medium">
              <div className="mb-5">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className={cn(
                      "inline-flex gap-3 items-center justify-center shadow-sm whitespace-nowrap rounded-lg text-sm font-medium",
                      "ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      "disabled:pointer-events-none disabled:opacity-50",
                      "h-12 px-4 py-2",
                      "text-primary-foreground bg-gradient-to-r from-[#106DBD] to-[#3C45AB]",
                      "mx-2 lg:mx-4"
                    )}
                  >
                    <Plus strokeWidth={1} /> New
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mx-2 lg:mx-4">
                    <DropdownMenuLabel>Uploads</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <FolderPlus
                        strokeWidth={1.25}
                        size={16}
                        className="mr-2"
                      />
                      New Folder
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FolderUp strokeWidth={1.25} size={16} className="mr-2" />
                      Upload Folder
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileUp strokeWidth={1.25} size={16} className="mr-2" />
                      Upload File
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <UserPen strokeWidth={1} size={16} className="mr-1" />
            Edit Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
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
    href: "/",
    icon: <LayoutDashboard strokeWidth={1} className="icon" />,
    label: "Dashboard",
  },
  {
    href: "/drive",
    icon: <SendToBack strokeWidth={1} className="icon" />,
    label: "Order line",
  },

  {
    href: "/shared",
    icon: <PackageOpen strokeWidth={1} className="icon" />,
    label: "Manage Items",
  },
  {
    href: "/trash",
    icon: <Users strokeWidth={1} className="icon" />,
    label: "Customers",
  },
];
