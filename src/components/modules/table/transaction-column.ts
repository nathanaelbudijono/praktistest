import { transactionProps } from "@/types/database-types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatToIDR } from "@/lib/helper";

export const transactionColumns: ColumnDef<transactionProps>[] = [
  {
    accessorKey: "item",
    header: "Item",
  },
  {
    accessorKey: "qty",
    header: "Quantity",
  },
  {
    accessorKey: "buyer",
    header: "Buyer",
  },
];
