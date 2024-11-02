import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useBarWidth from "@/hooks/useBarWidth";
import { capitalizeFirstLetter } from "@/lib/helper";
import { rpiProps, rpcProps } from "@/types/database-types";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Wrench } from "lucide-react";

const RevenueChart = ({ rpc, rpi }: { rpc: rpcProps[]; rpi: rpiProps[] }) => {
  const width = useBarWidth();
  const [selectedCategory, setSelectedCategory] = React.useState<string>("rpc");
  const chartConfig = {
    revenue: {
      label: `Rp`,
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center">
        <div>
          <CardTitle>
            Revenue Per {selectedCategory === "rpc" ? "Category" : "Item"}
          </CardTitle>
          <CardDescription className="mt-1">This Month</CardDescription>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <Wrench className="text-black/50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <DropdownMenuRadioItem value="rpc">
                Revenue Per Category
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="rpi">
                Revenue Per Item
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full">
          <BarChart
            accessibilityLayer
            data={selectedCategory === "rpc" ? rpc : rpi}
            width={width}
            height={300}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={`${selectedCategory === "rpc" ? "category" : "item"}`}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => capitalizeFirstLetter(value)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
