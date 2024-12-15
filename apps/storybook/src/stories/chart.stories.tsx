import type { Meta, StoryObj } from "@storybook/react";
import { TrendingUp } from "lucide-react";

import type { ChartConfig } from "@projects/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@projects/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@projects/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "@projects/ui/recharts";

const meta = {
  title: "Components/Chart",
  component: ChartContainer,
  subcomponents: {
    ChartLegend: ChartLegend as unknown as React.ComponentType<unknown>,
    ChartLegendContent:
      ChartLegendContent as unknown as React.ComponentType<unknown>,
    ChartStyle: ChartStyle as unknown as React.ComponentType<unknown>,
    ChartTooltip: ChartTooltip as unknown as React.ComponentType<unknown>,
    ChartTooltipContent:
      ChartTooltipContent as unknown as React.ComponentType<unknown>,
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ChartContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export const Primary: Story = {
  args: {
    config: chartConfig,
    children: <></>,
  },
  render: (args) => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Bar Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer {...args}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="size-4" />
        </div>
        <div className="leading-none text-muted-fg">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  ),
};
