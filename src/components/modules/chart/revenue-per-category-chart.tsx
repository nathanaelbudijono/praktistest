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
import { rpcProps } from "@/lib/zustand/summary-slice";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const RevenuePerCategoryChart = ({ rpc }: { rpc: rpcProps[] }) => {
  const width = useBarWidth();
  const chartConfig = {
    revenue: {
      label: `Rp`,
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Per Category</CardTitle>
        <CardDescription>This Month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full">
          <BarChart accessibilityLayer data={rpc} width={width} height={300}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
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

export default RevenuePerCategoryChart;
