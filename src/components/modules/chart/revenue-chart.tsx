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
import useBarWidth from "@/hooks/useBarWidth";
import { capitalizeFirstLetter } from "@/lib/helper";
import { rpcProps, rpiProps } from "@/types/database-types";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import ChartDropDown from "../dropdown/chart-dropdown";

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
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>
            Revenue Per {selectedCategory === "rpc" ? "Category" : "Item"}
          </CardTitle>
          <ChartDropDown
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        <CardDescription className="mt-1">This Month</CardDescription>
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
