import type { Meta, StoryObj } from "@storybook/react";
import { CircleDollarSign, ShoppingBag } from "lucide-react";

import type { ChartConfig } from "@projects/ui/chart";
import type { PieChart } from "@projects/ui/recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@projects/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@projects/ui/chart";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "@projects/ui/recharts";

const meta = {
  title: "Components/Charts/Radar Chart",
  component: RadarChart,
  subcomponents: {
    Radar: Radar as unknown as React.ComponentType<unknown>,
  },
  tags: ["autodocs", "charts"],
} satisfies Meta<typeof PieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    // Data for the chart
    const chartData = [
      { category: "Electronics", sales: 186 },
      { category: "Clothing", sales: 305 },
      { category: "Groceries", sales: 237 },
      { category: "Furniture", sales: 273 },
      { category: "Toys", sales: 209 },
      { category: "Beauty", sales: 214 },
    ];

    // Configuration for the chart
    const chartConfig = {
      sales: {
        label: "Sales",
        color: "hsl(var(--chart-1))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card className="items-center pb-0">
          <CardHeader>
            <CardTitle>By Category</CardTitle>
            <CardDescription>
              Sales performance by category (Jan - Jun 2024)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]">
              <RadarChart data={chartData}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <PolarAngleAxis dataKey="category" />
                <PolarGrid />
                <Radar
                  dataKey="sales"
                  fill="var(--color-sales)"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const CustomLabel: Story = {
  render: () => {
    // Data for the chart
    const chartData = [
      { month: "Jan", revenue: 45000, expenses: 30000 },
      { month: "Feb", revenue: 50000, expenses: 32000 },
      { month: "Mar", revenue: 47000, expenses: 31000 },
      { month: "Apr", revenue: 52000, expenses: 35000 },
      { month: "May", revenue: 48000, expenses: 33000 },
      { month: "Jun", revenue: 51000, expenses: 34000 },
      { month: "Jul", revenue: 53000, expenses: 36000 },
      { month: "Aug", revenue: 55000, expenses: 37000 },
      { month: "Sep", revenue: 54000, expenses: 35000 },
      { month: "Oct", revenue: 56000, expenses: 38000 },
      { month: "Nov", revenue: 58000, expenses: 39000 },
      { month: "Dec", revenue: 60000, expenses: 40000 },
    ];

    // Configuration for the chart
    const chartConfig = {
      revenue: {
        label: "Revenue",
        color: "hsl(var(--chart-1))",
      },
      expenses: {
        label: "Expenses",
        color: "hsl(var(--chart-2))",
      },
    } satisfies ChartConfig;

    interface TickProps {
      x: number;
      y: number;
      textAnchor: string;
      index: number;
    }

    return (
      <div className="w-full md:w-[400px]">
        <Card className="items-center pb-0">
          <CardHeader>
            <CardTitle>Monthly Financial Overview</CardTitle>
            <CardDescription>
              Revenue and expenses for Jan - Dec 2024
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="mx-auto">
              <RadarChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 10,
                  bottom: 10,
                  left: 10,
                }}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <PolarAngleAxis
                  dataKey="month"
                  tick={(props: TickProps) => {
                    const { x, y, textAnchor, index, ...rest } = props;
                    const data = chartData[index];

                    return (
                      <text
                        x={x}
                        y={index === 0 ? y - 10 : y}
                        textAnchor={textAnchor}
                        fontSize={13}
                        fontWeight={500}
                        {...rest}>
                        <tspan className="fill-fg text-xs">
                          {data?.revenue}
                        </tspan>
                        <tspan className="fill-muted-fg">/</tspan>
                        <tspan className="fill-fg text-xs">
                          {data?.expenses}
                        </tspan>
                        <tspan
                          x={x}
                          dy={"1rem"}
                          fontSize={12}
                          className="fill-muted-fg">
                          {data?.month}
                        </tspan>
                      </text>
                    );
                  }}
                />
                <PolarGrid />
                <Radar
                  dataKey="revenue"
                  fill="var(--color-revenue)"
                  fillOpacity={0.6}
                />
                <Radar dataKey="expenses" fill="var(--color-expenses)" />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const Dots: Story = {
  render: () => {
    // Data for the chart
    const chartData = [
      { month: "Jan", revenue: 186 },
      { month: "Feb", revenue: 305 },
      { month: "Mar", revenue: 237 },
      { month: "Apr", revenue: 273 },
      { month: "May", revenue: 209 },
      { month: "Jun", revenue: 214 },
      { month: "Jul", revenue: 220 },
      { month: "Aug", revenue: 230 },
      { month: "Sep", revenue: 240 },
      { month: "Oct", revenue: 250 },
      { month: "Nov", revenue: 260 },
      { month: "Dec", revenue: 270 },
    ];

    // Configuration for the chart
    const chartConfig = {
      revenue: {
        label: "Revenue",
        color: "hsl(var(--chart-1))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card className="items-center pb-0">
          <CardHeader>
            <CardTitle>Monthly Revenue Radar Chart</CardTitle>
            <CardDescription>
              Displaying revenue trends for Jan - Dec 2024
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="mx-auto">
              <RadarChart data={chartData}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <PolarAngleAxis dataKey="month" />
                <PolarGrid />
                <Radar
                  dataKey="revenue"
                  fill="var(--color-revenue)"
                  fillOpacity={0.6}
                  dot={{
                    r: 4,
                    fillOpacity: 1,
                  }}
                />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const GridCircle: Story = {
  render: () => {
    // Data for the chart
    const chartData = [
      { month: "Jan", profit: 186 },
      { month: "Feb", profit: 305 },
      { month: "Mar", profit: 237 },
      { month: "Apr", profit: 273 },
      { month: "May", profit: 209 },
      { month: "Jun", profit: 214 },
      { month: "Jul", profit: 220 },
      { month: "Aug", profit: 230 },
      { month: "Sep", profit: 240 },
      { month: "Oct", profit: 250 },
      { month: "Nov", profit: 260 },
      { month: "Dec", profit: 270 },
    ];

    // Configuration for the chart
    const chartConfig = {
      profit: {
        label: "Profit",
        color: "hsl(var(--chart-1))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card className="items-center pb-0">
          <CardHeader>
            <CardTitle>Monthly Revenue Radar Chart</CardTitle>
            <CardDescription>
              Displaying revenue trends for Jan - Dec 2024
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="mx-auto">
              <RadarChart data={chartData}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <PolarGrid gridType="circle" />
                <PolarAngleAxis dataKey="month" />
                <Radar
                  dataKey="profit"
                  fill="var(--color-profit)"
                  fillOpacity={0.6}
                  dot={{
                    r: 4,
                    fillOpacity: 1,
                  }}
                />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const GridCircleFilled: Story = {
  render: () => {
    // Data for the chart
    const chartData = [
      { month: "Jan", sales: 186 },
      { month: "Feb", sales: 285 },
      { month: "Mar", sales: 237 },
      { month: "Apr", sales: 203 },
      { month: "May", sales: 209 },
      { month: "Jun", sales: 264 },
      { month: "Jul", sales: 290 },
      { month: "Aug", sales: 310 },
      { month: "Sep", sales: 320 },
      { month: "Oct", sales: 330 },
      { month: "Nov", sales: 350 },
      { month: "Dec", sales: 370 },
    ];

    // Configuration for the chart
    const chartConfig = {
      sales: {
        label: "Sales",
        color: "hsl(var(--chart-1))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card className="items-center pb-4">
          <CardHeader>
            <CardTitle>Monthly Sales Overview</CardTitle>
            <CardDescription>
              Displaying sales data for Jan - Dec 2024
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]">
              <RadarChart data={chartData}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <PolarGrid
                  className="fill-[--color-sales] opacity-20"
                  gridType="circle"
                />
                <PolarAngleAxis dataKey="month" />
                <Radar
                  dataKey="sales"
                  fill="var(--color-sales)"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const GridCircleNoLines: Story = {
  render: () => {
    // Data for the chart
    const chartData = [
      { month: "Jan", revenue: 186 },
      { month: "Feb", revenue: 305 },
      { month: "Mar", revenue: 237 },
      { month: "Apr", revenue: 203 },
      { month: "May", revenue: 209 },
      { month: "Jun", revenue: 214 },
      { month: "Jul", revenue: 220 },
      { month: "Aug", revenue: 250 },
      { month: "Sep", revenue: 270 },
      { month: "Oct", revenue: 290 },
      { month: "Nov", revenue: 310 },
      { month: "Dec", revenue: 330 },
    ];

    // Configuration for the chart
    const chartConfig = {
      revenue: {
        label: "Revenue",
        color: "hsl(var(--chart-1))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card className="items-center pb-0">
          <CardHeader>
            <CardTitle>Monthly Revenue Breakdown</CardTitle>
            <CardDescription>
              Revenue data displayed for Jan - Dec 2024
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="mx-auto">
              <RadarChart data={chartData}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <PolarGrid gridType="circle" radialLines={false} />
                <PolarAngleAxis dataKey="month" />
                <Radar
                  dataKey="revenue"
                  fill="var(--color-revenue)"
                  fillOpacity={0.6}
                  dot={{
                    r: 4,
                    fillOpacity: 1,
                  }}
                />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const GridCustom: Story = {
  render: () => {
    // Data for the chart
    const chartData = [
      { month: "Jan", sales: 186, expenses: 80 },
      { month: "Feb", sales: 305, expenses: 200 },
      { month: "Mar", sales: 237, expenses: 120 },
      { month: "Apr", sales: 73, expenses: 190 },
      { month: "May", sales: 209, expenses: 130 },
      { month: "Jun", sales: 214, expenses: 140 },
      { month: "Jul", sales: 230, expenses: 150 },
      { month: "Aug", sales: 250, expenses: 170 },
      { month: "Sep", sales: 270, expenses: 180 },
      { month: "Oct", sales: 290, expenses: 200 },
      { month: "Nov", sales: 310, expenses: 220 },
      { month: "Dec", sales: 330, expenses: 250 },
    ];

    // Configuration for the chart
    const chartConfig = {
      sales: {
        label: "Sales",
        color: "hsl(var(--chart-1))",
      },
      expenses: {
        label: "Expenses",
        color: "hsl(var(--chart-2))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card className="items-center pb-0">
          <CardHeader>
            <CardTitle>Annual Sales vs Expenses</CardTitle>
            <CardDescription>
              Comparing sales and expenses for Jan - Dec 2024
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="mx-auto">
              <RadarChart data={chartData}>
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent indicator="line" labelKey="month" />
                  }
                />
                <PolarGrid />
                <Radar
                  dataKey="sales"
                  fill="var(--color-sales)"
                  fillOpacity={0.6}
                />
                <Radar dataKey="expenses" fill="var(--color-expenses)" />
                <PolarRadiusAxis
                  angle={60}
                  stroke="hsl(var(--fg))"
                  orientation="middle"
                  axisLine={false}
                />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const GridFilled: Story = {
  render: () => {
    // Data for the chart
    const chartData = [
      { month: "Jan", revenue: 186 },
      { month: "Feb", revenue: 285 },
      { month: "Mar", revenue: 237 },
      { month: "Apr", revenue: 203 },
      { month: "May", revenue: 209 },
      { month: "Jun", revenue: 264 },
      { month: "Jul", revenue: 290 },
      { month: "Aug", revenue: 310 },
      { month: "Sep", revenue: 330 },
      { month: "Oct", revenue: 350 },
      { month: "Nov", revenue: 370 },
      { month: "Dec", revenue: 390 },
    ];

    // Configuration for the chart
    const chartConfig = {
      revenue: {
        label: "Revenue",
        color: "hsl(var(--chart-1))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card className="items-center pb-4">
          <CardHeader>
            <CardTitle>Annual Revenue Radar Chart</CardTitle>
            <CardDescription>Revenue data for Jan - Dec 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="mx-auto">
              <RadarChart data={chartData}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <PolarGrid className="fill-[--color-revenue] opacity-20" />
                <PolarAngleAxis dataKey="month" />
                <Radar
                  dataKey="revenue"
                  fill="var(--color-revenue)"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const GridNone: Story = {
  render: () => {
    // Data for the chart
    const chartData = [
      { month: "Jan", revenue: 186 },
      { month: "Feb", revenue: 305 },
      { month: "Mar", revenue: 237 },
      { month: "Apr", revenue: 273 },
      { month: "May", revenue: 209 },
      { month: "Jun", revenue: 214 },
      { month: "Jul", revenue: 250 },
      { month: "Aug", revenue: 270 },
      { month: "Sep", revenue: 290 },
      { month: "Oct", revenue: 310 },
      { month: "Nov", revenue: 330 },
      { month: "Dec", revenue: 350 },
    ];

    // Configuration for the chart
    const chartConfig = {
      revenue: {
        label: "Revenue",
        color: "hsl(var(--chart-1))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card className="items-center pb-4">
          <CardHeader>
            <CardTitle>Annual Revenue Growth</CardTitle>
            <CardDescription>Revenue trends for Jan - Dec 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="mx-auto">
              <RadarChart data={chartData}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <PolarAngleAxis dataKey="month" />
                <Radar
                  dataKey="revenue"
                  fill="var(--color-revenue)"
                  fillOpacity={0.6}
                  dot={{
                    r: 4,
                    fillOpacity: 1,
                  }}
                />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const RadarLegend: Story = {
  render: () => {
    // Data for the chart
    const chartData = [
      { month: "Jan", sales: 186, expenses: 80 },
      { month: "Feb", sales: 305, expenses: 200 },
      { month: "Mar", sales: 237, expenses: 120 },
      { month: "Apr", sales: 73, expenses: 190 },
      { month: "May", sales: 209, expenses: 130 },
      { month: "Jun", sales: 214, expenses: 140 },
      { month: "Jul", sales: 230, expenses: 150 },
      { month: "Aug", sales: 250, expenses: 160 },
      { month: "Sep", sales: 270, expenses: 170 },
      { month: "Oct", sales: 290, expenses: 180 },
      { month: "Nov", sales: 310, expenses: 190 },
      { month: "Dec", sales: 330, expenses: 200 },
    ];

    // Configuration for the chart
    const chartConfig = {
      sales: {
        label: "Sales",
        color: "hsl(var(--chart-1))",
      },
      expenses: {
        label: "Expenses",
        color: "hsl(var(--chart-2))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card className="items-center pb-4">
          <CardHeader>
            <CardTitle>Annual Sales vs Expenses</CardTitle>
            <CardDescription>Comparing data for Jan - Dec 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="mx-auto">
              <RadarChart
                data={chartData}
                margin={{
                  top: -40,
                  bottom: -10,
                }}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <PolarAngleAxis dataKey="month" />
                <PolarGrid />
                <Radar
                  dataKey="sales"
                  fill="var(--color-sales)"
                  fillOpacity={0.6}
                />
                <Radar dataKey="expenses" fill="var(--color-expenses)" />
                <ChartLegend
                  className="mt-8"
                  content={<ChartLegendContent />}
                />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const LinesOnly: Story = {
  render: () => {
    // Data for the chart
    const chartData = [
      { month: "Jan", revenue: 186, profit: 160 },
      { month: "Feb", revenue: 185, profit: 170 },
      { month: "Mar", revenue: 207, profit: 180 },
      { month: "Apr", revenue: 173, profit: 160 },
      { month: "May", revenue: 160, profit: 190 },
      { month: "Jun", revenue: 174, profit: 204 },
      { month: "Jul", revenue: 190, profit: 210 },
      { month: "Aug", revenue: 200, profit: 220 },
      { month: "Sep", revenue: 210, profit: 230 },
      { month: "Oct", revenue: 220, profit: 240 },
      { month: "Nov", revenue: 230, profit: 250 },
      { month: "Dec", revenue: 240, profit: 260 },
    ];

    // Configuration for the chart
    const chartConfig = {
      revenue: {
        label: "Revenue",
        color: "hsl(var(--chart-1))",
      },
      profit: {
        label: "Profit",
        color: "hsl(var(--chart-2))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card className="items-center pb-4">
          <CardHeader>
            <CardTitle>Annual Revenue vs Profit</CardTitle>
            <CardDescription>
              Performance data for Jan - Dec 2024
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]">
              <RadarChart data={chartData}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <PolarAngleAxis dataKey="month" />
                <PolarGrid radialLines={false} />
                <Radar
                  dataKey="revenue"
                  fill="var(--color-revenue)"
                  fillOpacity={0}
                  stroke="var(--color-revenue)"
                  strokeWidth={2}
                />
                <Radar
                  dataKey="profit"
                  fill="var(--color-profit)"
                  fillOpacity={0}
                  stroke="var(--color-profit)"
                  strokeWidth={2}
                />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const Multiple: Story = {
  render: () => {
    // Data for the chart
    const chartData = [
      { month: "Jan", sales: 186, profit: 80 },
      { month: "Feb", sales: 305, profit: 200 },
      { month: "Mar", sales: 237, profit: 120 },
      { month: "Apr", sales: 73, profit: 190 },
      { month: "May", sales: 209, profit: 130 },
      { month: "Jun", sales: 214, profit: 140 },
      { month: "Jul", sales: 230, profit: 150 },
      { month: "Aug", sales: 250, profit: 160 },
      { month: "Sep", sales: 270, profit: 170 },
      { month: "Oct", sales: 290, profit: 180 },
      { month: "Nov", sales: 310, profit: 190 },
      { month: "Dec", sales: 330, profit: 200 },
    ];

    // Configuration for the chart
    const chartConfig = {
      sales: {
        label: "Sales",
        color: "hsl(var(--chart-1))",
      },
      profit: {
        label: "Profit",
        color: "hsl(var(--chart-2))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card className="items-center pb-4">
          <CardHeader>
            <CardTitle>Annual Sales and Profit Comparison</CardTitle>
            <CardDescription>
              Performance data for Jan - Dec 2024
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]">
              <RadarChart data={chartData}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <PolarAngleAxis dataKey="month" />
                <PolarGrid />
                <Radar
                  dataKey="sales"
                  fill="var(--color-sales)"
                  fillOpacity={0.6}
                />
                <Radar dataKey="profit" fill="var(--color-profit)" />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const RadiusAxis: Story = {
  render: () => {
    // Data for the chart
    const chartData = [
      { month: "Jan", sales: 186, profit: 80 },
      { month: "Feb", sales: 305, profit: 200 },
      { month: "Mar", sales: 237, profit: 120 },
      { month: "Apr", sales: 73, profit: 190 },
      { month: "May", sales: 209, profit: 130 },
      { month: "Jun", sales: 214, profit: 140 },
      { month: "Jul", sales: 230, profit: 150 },
      { month: "Aug", sales: 250, profit: 160 },
      { month: "Sep", sales: 270, profit: 170 },
      { month: "Oct", sales: 290, profit: 180 },
      { month: "Nov", sales: 310, profit: 190 },
      { month: "Dec", sales: 330, profit: 200 },
    ];

    // Configuration for the chart
    const chartConfig = {
      sales: {
        label: "Sales",
        color: "hsl(var(--chart-1))",
      },
      profit: {
        label: "Profit",
        color: "hsl(var(--chart-2))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card className="items-center pb-4">
          <CardHeader>
            <CardTitle>Annual Sales and Profit Analysis</CardTitle>
            <CardDescription>
              Performance data for Jan - Dec 2024
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]">
              <RadarChart data={chartData}>
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent indicator="line" labelKey="month" />
                  }
                />
                <PolarGrid />
                <Radar
                  dataKey="sales"
                  fill="var(--color-sales)"
                  fillOpacity={0.6}
                />
                <Radar dataKey="profit" fill="var(--color-profit)" />
                <PolarRadiusAxis
                  angle={60}
                  stroke="hsl(var(--fg))"
                  orientation="middle"
                  axisLine={false}
                />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const Icons: Story = {
  render: () => {
    // Data for the chart
    const chartData = [
      { month: "Jan", sales: 186, profit: 80 },
      { month: "Feb", sales: 305, profit: 200 },
      { month: "Mar", sales: 237, profit: 120 },
      { month: "Apr", sales: 73, profit: 190 },
      { month: "May", sales: 209, profit: 130 },
      { month: "Jun", sales: 214, profit: 140 },
      { month: "Jul", sales: 250, profit: 150 },
      { month: "Aug", sales: 270, profit: 160 },
      { month: "Sep", sales: 290, profit: 170 },
      { month: "Oct", sales: 310, profit: 180 },
      { month: "Nov", sales: 330, profit: 190 },
      { month: "Dec", sales: 350, profit: 200 },
    ];

    // Configuration for the chart
    const chartConfig = {
      sales: {
        label: "Sales",
        color: "hsl(var(--chart-1))",
        icon: ShoppingBag,
      },
      profit: {
        label: "Profit",
        color: "hsl(var(--chart-2))",
        icon: CircleDollarSign,
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card className="items-center pb-4">
          <CardHeader>
            <CardTitle>Annual Sales and Profit</CardTitle>
            <CardDescription>
              Performance data for Jan - Dec 2024
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]">
              <RadarChart
                data={chartData}
                margin={{
                  top: -40,
                  bottom: -10,
                }}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <PolarAngleAxis dataKey="month" />
                <PolarGrid />
                <Radar
                  dataKey="sales"
                  fill="var(--color-sales)"
                  fillOpacity={0.6}
                />
                <Radar dataKey="profit" fill="var(--color-profit)" />
                <ChartLegend
                  className="mt-8"
                  content={<ChartLegendContent />}
                />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};
