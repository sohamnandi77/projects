import type { Meta, StoryObj } from "@storybook/react";

import type { ChartConfig } from "@projects/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@projects/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@projects/ui/chart";
import {
  Label,
  LabelList,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "@projects/ui/recharts";

const meta = {
  title: "Components/Charts/Radial Bar Chart",
  component: RadialBarChart,
  subcomponents: {
    RadialBar: RadialBar as unknown as React.ComponentType<unknown>,
  },
  tags: ["autodocs", "charts"],
} satisfies Meta<typeof RadialBarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    // Data for the chart
    const chartData = [
      { category: "Electronics", sales: 320, fill: "var(--color-electronics)" },
      { category: "Furniture", sales: 250, fill: "var(--color-furniture)" },
      { category: "Clothing", sales: 200, fill: "var(--color-clothing)" },
      { category: "Sports", sales: 180, fill: "var(--color-sports)" },
      { category: "Books", sales: 100, fill: "var(--color-books)" },
    ];

    // Configuration for the chart
    const chartConfig = {
      sales: {
        label: "Sales",
      },
      electronics: {
        label: "Electronics",
        color: "hsl(var(--chart-1))",
      },
      furniture: {
        label: "Furniture",
        color: "hsl(var(--chart-2))",
      },
      clothing: {
        label: "Clothing",
        color: "hsl(var(--chart-3))",
      },
      sports: {
        label: "Sports",
        color: "hsl(var(--chart-4))",
      },
      books: {
        label: "Books",
        color: "hsl(var(--chart-5))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card className="items-center pb-0 text-center">
          <CardHeader>
            <CardTitle>Category Sales Overview</CardTitle>
            <CardDescription>
              Visualizing sales distribution across categories for the year 2024
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]">
              <RadialBarChart
                data={chartData}
                innerRadius={30}
                outerRadius={110}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel nameKey="category" />}
                />
                <RadialBar dataKey="sales" background />
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const RadialBarLabel: Story = {
  render: () => {
    // Data for the chart
    const chartData = [
      { category: "Apples", quantity: 320, fill: "var(--color-apples)" },
      { category: "Oranges", quantity: 250, fill: "var(--color-oranges)" },
      { category: "Bananas", quantity: 200, fill: "var(--color-bananas)" },
      { category: "Grapes", quantity: 180, fill: "var(--color-grapes)" },
      { category: "Berries", quantity: 100, fill: "var(--color-berries)" },
    ];

    // Configuration for the chart
    const chartConfig = {
      quantity: {
        label: "Quantity",
      },
      apples: {
        label: "Apples",
        color: "hsl(var(--chart-1))",
      },
      oranges: {
        label: "Oranges",
        color: "hsl(var(--chart-2))",
      },
      bananas: {
        label: "Bananas",
        color: "hsl(var(--chart-3))",
      },
      grapes: {
        label: "Grapes",
        color: "hsl(var(--chart-4))",
      },
      berries: {
        label: "Berries",
        color: "hsl(var(--chart-5))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card className="items-center pb-0 text-center">
          <CardHeader>
            <CardTitle>Fruit Sales Distribution</CardTitle>
            <CardDescription>
              Sales data of various fruit categories for Jan - Dec 2024
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]">
              <RadialBarChart
                data={chartData}
                startAngle={-90}
                endAngle={380}
                innerRadius={30}
                outerRadius={110}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel nameKey="category" />}
                />
                <RadialBar dataKey="quantity" background>
                  <LabelList
                    position="insideStart"
                    dataKey="category"
                    className="fill-white capitalize mix-blend-luminosity"
                    fontSize={11}
                  />
                </RadialBar>
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const Grid: Story = {
  render: () => {
    // Data for the chart
    const chartData = [
      { category: "Electronics", sales: 320, fill: "var(--color-electronics)" },
      { category: "Furniture", sales: 250, fill: "var(--color-furniture)" },
      { category: "Clothing", sales: 200, fill: "var(--color-clothing)" },
      { category: "Sports", sales: 180, fill: "var(--color-sports)" },
      { category: "Books", sales: 100, fill: "var(--color-books)" },
    ];

    // Configuration for the chart
    const chartConfig = {
      sales: {
        label: "Sales",
      },
      electronics: {
        label: "Electronics",
        color: "hsl(var(--chart-1))",
      },
      furniture: {
        label: "Furniture",
        color: "hsl(var(--chart-2))",
      },
      clothing: {
        label: "Clothing",
        color: "hsl(var(--chart-3))",
      },
      sports: {
        label: "Sports",
        color: "hsl(var(--chart-4))",
      },
      books: {
        label: "Books",
        color: "hsl(var(--chart-5))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card className="items-center pb-0 text-center">
          <CardHeader>
            <CardTitle>Category Sales Overview</CardTitle>
            <CardDescription>
              Visualizing sales distribution across categories for Jan - Dec
              2024
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]">
              <RadialBarChart
                data={chartData}
                innerRadius={30}
                outerRadius={100}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel nameKey="category" />}
                />
                <PolarGrid gridType="circle" />
                <RadialBar dataKey="sales" />
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const Text: Story = {
  render: () => {
    // Data for the chart
    const chartData = [
      { product: "Laptops", sales: 200, fill: "var(--color-laptops)" },
    ];

    // Configuration for the chart
    const chartConfig = {
      sales: {
        label: "Sales",
      },
      laptops: {
        label: "Laptops",
        color: "hsl(var(--chart-2))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card className="items-center pb-0 text-center">
          <CardHeader>
            <CardTitle>Laptop Sales Performance</CardTitle>
            <CardDescription>
              Tracking sales data for Jan - Dec 2024
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]">
              <RadialBarChart
                data={chartData}
                startAngle={0}
                endAngle={250}
                innerRadius={80}
                outerRadius={110}>
                <PolarGrid
                  gridType="circle"
                  radialLines={false}
                  stroke="none"
                  className="first:fill-muted last:fill-bg"
                  polarRadius={[86, 74]}
                />
                <RadialBar dataKey="sales" background cornerRadius={10} />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle">
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-fg text-4xl font-bold">
                              {chartData[0]?.sales.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy ?? 0) + 24}
                              className="fill-muted-fg">
                              Sales
                            </tspan>
                          </text>
                        );
                      }
                      return null;
                    }}
                  />
                </PolarRadiusAxis>
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const Shape: Story = {
  render: () => {
    // Data for the chart
    const chartData = [
      {
        category: "Electronics",
        sales: 1260,
        fill: "var(--color-electronics)",
      },
    ];

    // Configuration for the chart
    const chartConfig = {
      sales: {
        label: "Sales",
      },
      electronics: {
        label: "Electronics",
        color: "hsl(var(--chart-2))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card className="items-center pb-0 text-center">
          <CardHeader>
            <CardTitle>Electronics Sales Performance</CardTitle>
            <CardDescription>Sales data for Jan - Dec 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]">
              <RadialBarChart
                data={chartData}
                endAngle={100}
                innerRadius={80}
                outerRadius={140}>
                <PolarGrid
                  gridType="circle"
                  radialLines={false}
                  stroke="none"
                  className="first:fill-muted last:fill-bg"
                  polarRadius={[86, 74]}
                />
                <RadialBar dataKey="sales" background />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle">
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-fg text-4xl font-bold">
                              {chartData[0]?.sales.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy ?? 0) + 24}
                              className="fill-muted-fg">
                              Sales
                            </tspan>
                          </text>
                        );
                      }
                      return null;
                    }}
                  />
                </PolarRadiusAxis>
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const Stacked: Story = {
  render: () => {
    // Data for the chart
    const chartData = [{ month: "January", sales: 1260, profit: 570 }];

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

    const totalRevenue =
      (chartData[0]?.sales ?? 0) + (chartData[0]?.profit ?? 0);

    return (
      <div className="w-full md:w-[400px]">
        <Card className="items-center pb-0 text-center">
          <CardHeader>
            <CardTitle>Monthly Revenue Distribution</CardTitle>
            <CardDescription>
              Visualizing sales and profit for Jan - Dec 2024
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]">
              <RadialBarChart
                data={chartData}
                endAngle={180}
                innerRadius={80}
                outerRadius={130}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle">
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy ?? 0) - 16}
                              className="fill-fg text-2xl font-bold">
                              {totalRevenue.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy ?? 0) + 4}
                              className="fill-muted-fg">
                              Total Revenue
                            </tspan>
                          </text>
                        );
                      }
                      return null;
                    }}
                  />
                </PolarRadiusAxis>
                <RadialBar
                  dataKey="sales"
                  stackId="a"
                  cornerRadius={5}
                  fill="var(--color-sales)"
                  className="stroke-transparent stroke-2"
                />
                <RadialBar
                  dataKey="profit"
                  fill="var(--color-profit)"
                  stackId="a"
                  cornerRadius={5}
                  className="stroke-transparent stroke-2"
                />
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};
