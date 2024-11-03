import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CircleUser, LogOut } from "lucide-react";

const AdminHeaderDropdown = ({
  handleLogOut,
}: {
  handleLogOut: () => void;
}) => {
  return (
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

        <DropdownMenuItem onClick={handleLogOut}>
          <LogOut strokeWidth={1} size={16} className="mr-1" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdminHeaderDropdown;
