import { capitalizeFirstLetter, formatToIDR } from "@/lib/helper";
import {
    bestSpendersProps
} from "@/types/database-types";
import { ColumnDef } from "@tanstack/react-table";

export const spenderColumns: ColumnDef<bestSpendersProps>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => `${capitalizeFirstLetter(row.getValue("name"))}`,
  },
  {
    accessorKey: "type",
    header: "Membership",
    cell: ({ row }) => `${capitalizeFirstLetter(row.getValue("type"))}`,
  },
  {
    accessorKey: "spent",
    header: "Spent",
    cell: ({ row }) => `${formatToIDR(row.getValue("spent"))}`,
  },
];
