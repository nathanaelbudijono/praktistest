import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BASE_URL } from "@/constant/env";
import { CircleUser, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "../ui/button";

const Header = () => {
  const router = useRouter();
  const [name, setName] = React.useState<string | null>(null);

  React.useEffect(() => {
    const storedName = localStorage.getItem("name");
    setName(storedName);
  }, []);

  const handleLogOut = () => {
    try {
      localStorage.removeItem("name");
      document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setName(null);
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
      {!name ? (
        <Button size="sm" onClick={() => router.push(`${BASE_URL}/login`)}>
          Login
        </Button>
      ) : (
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

            <DropdownMenuItem onClick={handleLogOut}>
              <LogOut strokeWidth={1} size={16} className="mr-1" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </main>
  );
};

export default Header;
