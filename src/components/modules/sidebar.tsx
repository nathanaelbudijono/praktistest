"use client";

import { BASE_URL } from "@/constant/env";
import { navItemProps } from "@/types/types";
import { LayoutDashboard, PackageOpen, SendToBack, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const path = usePathname();

  return (
    <main className="hidden bg-muted md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6 mb-5">
          <h1>Island</h1>
        </div>
        <div className="flex-1">
          <nav className="grid items-start gap-y-3 px-2 text-sm font-medium lg:px-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all ${
                  (
                    item.href === "/"
                      ? path === "/"
                      : path.startsWith(item.href)
                  )
                    ? "font-bold bg-white shadow-sm border-l-4 border-secondary text-black"
                    : "hover:text-primary"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </main>
  );
};

export default Sidebar;

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
    href: `${BASE_URL}/admin/dashboard/items`,
    icon: <PackageOpen strokeWidth={1} className="icon" />,
    label: "Manage Items",
  },
  {
    href: "/trash",
    icon: <Users strokeWidth={1} className="icon" />,
    label: "Customers",
  },
];
