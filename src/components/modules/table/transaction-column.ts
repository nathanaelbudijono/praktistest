import { capitalizeFirstLetter, formatToIDR } from "@/lib/helper";
import { buyerTransactionProps } from "@/types/database-types";
import { ColumnDef } from "@tanstack/react-table";

export const transactionColumns: ColumnDef<buyerTransactionProps>[] = [
  {
    accessorKey: "item",
    header: "Item",
    cell: ({ row }) => `${capitalizeFirstLetter(row.getValue("item"))}`,
  },
  {
    accessorKey: "qty",
    header: "Quantity",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
    cell: ({ row }) => `${formatToIDR(row.getValue("totalPrice"))}`,
  },
  {
    accessorKey: "buyer",
    header: "Buyer",
  },
  {
    accessorKey: "type",
    header: "Membership",
    cell: ({ row }) => `${capitalizeFirstLetter(row.getValue("type"))}`,
  },
];
