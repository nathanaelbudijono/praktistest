import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Typography from "@/components/ui/typography";
import { capitalizeFirstLetter, formatToIDR } from "@/lib/helper";

import { bestSpendersProps, transactionProps } from "@/types/database-types";
import { User } from "lucide-react";

const TopSpenderCard = ({
  item,
  index,
  totalTransaction,
}: {
  item: bestSpendersProps;
  index: number;
  totalTransaction: transactionProps[];
}) => {
  const colors = ["bg-yellow-300", "bg-gray-400", "bg-amber-800"];
  const textColors = ["text-yellow-100", "text-gray-100", "text-amber-500"];

  const userData = totalTransaction.filter(
    (transaction) => transaction.buyer === item.name
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex justify-center items-center flex-col">
          <div
            className={`w-32 h-32 ${colors[index]} rounded-full border p-6 flex justify-center items-center`}
          >
            <User className={`w-24 h-24 ${textColors[index]}`} />
          </div>
          <div className="mt-3 space-y-1 text-center">
            <Typography variant="h5" className="font-bold">
              #{index + 1}
            </Typography>
            <Typography variant="h5">{item.name}</Typography>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{item.name} Transaction Details</DialogTitle>
          <DialogDescription>User transaction history</DialogDescription>
          <div>
            <Typography variant="p">
              {item.name} is a {item.type} member and has spent a total of{" "}
              {formatToIDR(item.spent)} with details as follow.
            </Typography>
            <div className="flex gap-2 items-center mt-2">
              {userData?.map((item, index) => {
                return (
                  <Button variant="outline" size="sm" key={index}>
                    {item.qty} {capitalizeFirstLetter(item.item)}
                  </Button>
                );
              })}
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TopSpenderCard;
