import type { Meta, StoryObj } from "@storybook/react";
import { ShoppingBag, Strikethrough } from "lucide-react";

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
import { Bar, BarChart, XAxis } from "@projects/ui/recharts";

const meta = {
  title: "Components/Charts/Tooltip",
  component: ChartTooltip as unknown as React.ComponentType<unknown>,
  subcomponents: {
    ChartTooltipContent:
      ChartTooltipContent as unknown as React.ComponentType<unknown>,
  },
  tags: ["autodocs", "charts"],
} satisfies Meta<typeof ChartTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    // Data for the chart
    const chartData = Array.from({ length: 24 }, (_, index) => {
      const date = new Date(
        new Date().getFullYear() - 1,
        index,
      ).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
      return {
        date,
        groceries: Math.floor(Math.random() * 300 + 100),
        utilities: Math.floor(Math.random() * 400 + 200),
      };
    });

    // Configuration for the chart
    const chartConfig = {
      groceries: {
        label: "Groceries",
        color: "hsl(var(--chart-1))",
      },
      utilities: {
        label: "Utilities",
        color: "hsl(var(--chart-2))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[550px]">
        <Card className="items-center pb-0 text-center">
          <CardHeader>
            <CardTitle>Monthly Expense Breakdown</CardTitle>
            <CardDescription>
              Analyzing grocery and utility expenses for the last 24 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value: string) => value}
                />
                <Bar
                  dataKey="groceries"
                  stackId="a"
                  fill="var(--color-groceries)"
                  radius={[0, 0, 4, 4]}
                />
                <Bar
                  dataKey="utilities"
                  stackId="a"
                  fill="var(--color-utilities)"
                  radius={[4, 4, 0, 0]}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      hideLabel
                      className="w-[180px]"
                      formatter={(value, name, item, index) => (
                        <>
                          <div
                            className="size-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                            style={
                              {
                                "--color-bg": `var(--color-${name})`,
                              } as React.CSSProperties
                            }
                          />
                          {chartConfig[name as keyof typeof chartConfig]
                            .label || name}
                          <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-fg">
                            {value}
                            <span className="ml-1 font-normal text-muted-fg">
                              USD
                            </span>
                          </div>
                          {index === 1 && (
                            <div className="mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium text-fg">
                              Total
                              <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-fg">
                                {(
                                  item.payload as unknown as {
                                    groceries: number;
                                  }
                                ).groceries +
                                  (
                                    item.payload as unknown as {
                                      utilities: number;
                                    }
                                  ).utilities}
                                <span className="ml-1 font-normal text-muted-fg">
                                  USD
                                </span>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    />
                  }
                  cursor={false}
                  defaultIndex={1}
                />
              </BarChart>
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
    const chartData = Array.from({ length: 24 }, (_, index) => {
      const date = new Date(
        new Date().getFullYear() - 1,
        index,
      ).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
      return {
        date,
        sales: Math.floor(Math.random() * 500 + 100),
        expenses: Math.floor(Math.random() * 300 + 50),
      };
    });

    // Configuration for the chart
    const chartConfig = {
      sales: {
        label: "Sales",
        color: "hsl(var(--chart-1))",
        icon: ShoppingBag,
      },
      expenses: {
        label: "Expenses",
        color: "hsl(var(--chart-2))",
        icon: Strikethrough,
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[550px]">
        <Card className="items-center pb-0 text-center">
          <CardHeader>
            <CardTitle>Monthly Expense Breakdown</CardTitle>
            <CardDescription>
              Sales and expenses for the past 24 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value: string) => value}
                />
                <Bar
                  dataKey="sales"
                  stackId="a"
                  fill="var(--color-sales)"
                  radius={[0, 0, 4, 4]}
                />
                <Bar
                  dataKey="expenses"
                  stackId="a"
                  fill="var(--color-expenses)"
                  radius={[4, 4, 0, 0]}
                />
                <ChartTooltip
                  content={<ChartTooltipContent hideLabel />}
                  cursor={false}
                  defaultIndex={1}
                />
              </BarChart>
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
      { date: "2024-07-15", sales: 450, profit: 300 },
      { date: "2024-07-16", sales: 380, profit: 420 },
      { date: "2024-07-17", sales: 520, profit: 120 },
      { date: "2024-07-18", sales: 140, profit: 550 },
      { date: "2024-07-19", sales: 600, profit: 350 },
      { date: "2024-07-20", sales: 480, profit: 400 },
    ];

    // Configuration for the chart
    const chartConfig = {
      metrics: {
        label: "Metrics",
      },
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
      <div className="w-full md:w-[550px]">
        <Card className="items-center pb-0 text-center">
          <CardHeader>
            <CardTitle>Weekly Performance Metrics</CardTitle>
            <CardDescription>
              Analyzing sales and profit trends for Jul 2024
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value: string) => value}
                />
                <Bar
                  dataKey="sales"
                  stackId="a"
                  fill="var(--color-sales)"
                  radius={[0, 0, 4, 4]}
                />
                <Bar
                  dataKey="expenses"
                  stackId="a"
                  fill="var(--color-expenses)"
                  radius={[4, 4, 0, 0]}
                />
                <ChartTooltip
                  content={<ChartTooltipContent hideLabel />}
                  cursor={false}
                  defaultIndex={1}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const Formatter: Story = {
  render: () => {
    // Data for the chart
    const chartData = Array.from({ length: 24 }, (_, index) => {
      const date = new Date(
        new Date().getFullYear() - 1,
        index,
      ).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
      return {
        date,
        sales: Math.floor(Math.random() * 1000 + 200),
        profit: Math.floor(Math.random() * 500 + 100),
      };
    });

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
      <div className="w-full md:w-[550px]">
        <Card className="items-center pb-0 text-center">
          <CardHeader>
            <CardTitle>Monthly Sales and Profit</CardTitle>
            <CardDescription>
              Visualizing data for the last 24 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value: string) => value}
                />
                <Bar
                  dataKey="sales"
                  stackId="a"
                  fill="var(--color-sales)"
                  radius={[0, 0, 4, 4]}
                />
                <Bar
                  dataKey="profit"
                  stackId="a"
                  fill="var(--color-profit)"
                  radius={[4, 4, 0, 0]}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      hideLabel
                      formatter={(value, name) => (
                        <div className="flex min-w-[130px] items-center text-xs text-muted-fg">
                          {chartConfig[name as keyof typeof chartConfig]
                            .label || name}
                          <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-fg">
                            {value}
                            <span className="font-normal text-muted-fg">
                              USD
                            </span>
                          </div>
                        </div>
                      )}
                    />
                  }
                  cursor={false}
                  defaultIndex={1}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const LabelFormatter: Story = {
  render: () => {
    // Data for the chart
    const chartData = Array.from({ length: 24 }, (_, index) => {
      const date = new Date(
        new Date().getFullYear() - 1,
        index,
      ).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
      return {
        date,
        sales: Math.floor(Math.random() * 500 + 200),
        profit: Math.floor(Math.random() * 300 + 100),
      };
    });

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
      <div className="w-full md:w-[550px]">
        <Card className="items-center pb-0 text-center">
          <CardHeader>
            <CardTitle>Monthly Financial Trends</CardTitle>
            <CardDescription>
              Sales and profit data for the last 24 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value: string) => value}
                />
                <Bar
                  dataKey="sales"
                  stackId="a"
                  fill="var(--color-sales)"
                  radius={[0, 0, 4, 4]}
                />
                <Bar
                  dataKey="profit"
                  stackId="a"
                  fill="var(--color-profit)"
                  radius={[4, 4, 0, 0]}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value: string) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        });
                      }}
                    />
                  }
                  cursor={false}
                  defaultIndex={1}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const LineIndicator: Story = {
  render: () => {
    // Data for the chart
    const chartData = Array.from({ length: 24 }, (_, index) => {
      const date = new Date(
        new Date().getFullYear() - 1,
        index,
      ).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
      return {
        date,
        sales: Math.floor(Math.random() * 500 + 200),
        profit: Math.floor(Math.random() * 300 + 100),
      };
    });

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
      <div className="w-full md:w-[550px]">
        <Card className="items-center pb-0 text-center">
          <CardHeader>
            <CardTitle>Monthly Sales and Profit</CardTitle>
            <CardDescription>
              Sales and profit trends for the past 24 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value: string) => value}
                />
                <Bar
                  dataKey="sales"
                  stackId="a"
                  fill="var(--color-sales)"
                  radius={[0, 0, 4, 4]}
                />
                <Bar
                  dataKey="profit"
                  stackId="a"
                  fill="var(--color-profit)"
                  radius={[4, 4, 0, 0]}
                />
                <ChartTooltip
                  content={<ChartTooltipContent indicator="line" />}
                  cursor={false}
                  defaultIndex={1}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const NoIndicator: Story = {
  render: () => {
    // Data for the chart
    const chartData = Array.from({ length: 24 }, (_, index) => {
      const date = new Date(
        new Date().getFullYear() - 1,
        index,
      ).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
      return {
        date,
        revenue: Math.floor(Math.random() * 500 + 300),
        cost: Math.floor(Math.random() * 300 + 150),
      };
    });

    // Configuration for the chart
    const chartConfig = {
      revenue: {
        label: "Revenue",
        color: "hsl(var(--chart-1))",
      },
      cost: {
        label: "Cost",
        color: "hsl(var(--chart-2))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[550px]">
        <Card className="items-center pb-0 text-center">
          <CardHeader>
            <CardTitle>Monthly Revenue and Costs</CardTitle>
            <CardDescription>
              Tracking revenue and costs over the last 24 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value: string) => value}
                />
                <Bar
                  dataKey="revenue"
                  stackId="a"
                  fill="var(--color-revenue)"
                  radius={[0, 0, 4, 4]}
                />
                <Bar
                  dataKey="cost"
                  stackId="a"
                  fill="var(--color-cost)"
                  radius={[4, 4, 0, 0]}
                />
                <ChartTooltip
                  content={<ChartTooltipContent hideIndicator />}
                  cursor={false}
                  defaultIndex={1}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const NoLabel: Story = {
  render: () => {
    // Data for the chart
    const chartData = Array.from({ length: 24 }, (_, index) => {
      const date = new Date(
        new Date().getFullYear() - 1,
        index,
      ).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
      return {
        date,
        products: Math.floor(Math.random() * 600 + 200),
        services: Math.floor(Math.random() * 400 + 100),
      };
    });

    // Configuration for the chart
    const chartConfig = {
      products: {
        label: "Products",
        color: "hsl(var(--chart-1))",
      },
      services: {
        label: "Services",
        color: "hsl(var(--chart-2))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[550px]">
        <Card className="items-center pb-0 text-center">
          <CardHeader>
            <CardTitle>Monthly Products and Services Data</CardTitle>
            <CardDescription>
              Displaying products and services data over the last 24 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value: string) => value}
                />
                <Bar
                  dataKey="products"
                  stackId="a"
                  fill="var(--color-products)"
                  radius={[0, 0, 4, 4]}
                />
                <Bar
                  dataKey="services"
                  stackId="a"
                  fill="var(--color-services)"
                  radius={[4, 4, 0, 0]}
                />
                <ChartTooltip
                  content={<ChartTooltipContent hideIndicator hideLabel />}
                  cursor={false}
                  defaultIndex={1}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const Advanced: Story = {
  render: () => {
    // Data for the chart
    const chartData = Array.from({ length: 24 }, (_, index) => {
      const date = new Date(
        new Date().getFullYear() - 1,
        index,
      ).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
      return {
        date,
        coffee: Math.floor(Math.random() * 50 + 50),
        snacks: Math.floor(Math.random() * 100 + 100),
      };
    });

    // Configuration for the chart
    const chartConfig = {
      coffee: {
        label: "Coffee",
        color: "hsl(var(--chart-1))",
      },
      snacks: {
        label: "Snacks",
        color: "hsl(var(--chart-2))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[550px]">
        <Card className="items-center pb-0 text-center">
          <CardHeader>
            <CardTitle>Monthly Coffee & Snacks Expenses</CardTitle>
            <CardDescription>
              Tracking expenses on coffee and snacks for the last 24 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value: string) => value}
                />
                <Bar
                  dataKey="coffee"
                  stackId="a"
                  fill="var(--color-coffee)"
                  radius={[0, 0, 4, 4]}
                />
                <Bar
                  dataKey="snacks"
                  stackId="a"
                  fill="var(--color-snacks)"
                  radius={[4, 4, 0, 0]}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      hideLabel
                      className="w-[180px]"
                      formatter={(value, name, item, index) => (
                        <>
                          <div
                            className="size-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                            style={
                              {
                                "--color-bg": `var(--color-${name})`,
                              } as React.CSSProperties
                            }
                          />
                          {chartConfig[name as keyof typeof chartConfig]
                            .label || name}
                          <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-fg">
                            {value}
                            <span className="ml-1 font-normal text-muted-fg">
                              USD
                            </span>
                          </div>
                          {/* Add this after the last item */}
                          {index === 1 && (
                            <div className="mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium text-fg">
                              Total
                              <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-fg">
                                {(item.payload as unknown as { coffee: number })
                                  .coffee +
                                  (
                                    item.payload as unknown as {
                                      snacks: number;
                                    }
                                  ).snacks}
                                <span className="ml-1 font-normal text-muted-fg">
                                  USD
                                </span>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    />
                  }
                  cursor={false}
                  defaultIndex={1}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};
