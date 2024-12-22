import type { Meta, StoryObj } from "@storybook/react";
import { ChartColumn, ShoppingBag, Store } from "lucide-react";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@projects/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "@projects/ui/recharts";

const meta = {
  title: "Components/Charts/Area Chart",
  component: AreaChart,
  subcomponents: {
    Area: Area as unknown as React.ComponentType<unknown>,
  },
  tags: ["autodocs", "charts"],
} satisfies Meta<typeof AreaChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => {
    // Data for the chart
    const salesData = Array.from({ length: 24 }, (_, index) => {
      const date = new Date(new Date().getFullYear() - 1, index);
      const month = date.toLocaleDateString("en-US", { month: "long" });
      return {
        month,
        revenue: Math.floor(Math.random() * 5000 + 2000),
      };
    });

    // Configuration for the chart
    const salesConfig = {
      revenue: {
        label: "Revenue",
        color: "hsl(var(--chart-1))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>
              Monthly revenue for the last 24 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={salesConfig}>
              <AreaChart
                accessibilityLayer
                data={salesData}
                margin={{
                  left: 12,
                  right: 12,
                }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value: string) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                  dataKey="revenue"
                  type="natural"
                  fill="var(--color-revenue)"
                  fillOpacity={0.4}
                  stroke="var(--color-revenue)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const Gradiant: Story = {
  render: () => {
    // Data for the chart
    const chartData = Array.from({ length: 24 }, (_, index) => {
      const date = new Date(new Date().getFullYear() - 1, index);
      const month = date.toLocaleDateString("en-US", { month: "long" });
      return {
        month,
        online: Math.floor(Math.random() * 2000 + 3000),
        inStore: Math.floor(Math.random() * 1000 + 1500),
      };
    });

    // Configuration for the chart
    const chartConfig = {
      online: {
        label: "Online Sales",
        color: "hsl(var(--chart-1))",
      },
      inStore: {
        label: "In-Store Sales",
        color: "hsl(var(--chart-2))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card className="w-full max-w-3xl">
          <CardHeader className="items-center pb-4">
            <CardTitle>Sales Channel Analysis</CardTitle>
            <CardDescription>
              Monthly comparison of online and in-store sales over the last 24
              months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="max-h-[250px] w-full">
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value: string) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <defs>
                  <linearGradient id="fillOnline" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-online)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-online)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                  <linearGradient id="fillInStore" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-inStore)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-inStore)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="inStore"
                  type="natural"
                  fill="url(#fillInStore)"
                  fillOpacity={0.4}
                  stroke="var(--color-inStore)"
                  stackId="a"
                />
                <Area
                  dataKey="online"
                  type="natural"
                  fill="url(#fillOnline)"
                  fillOpacity={0.4}
                  stroke="var(--color-online)"
                  stackId="a"
                />
              </AreaChart>
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
    const chartData = Array.from({ length: 24 }, (_, index) => {
      const date = new Date(new Date().getFullYear() - 1, index);
      const month = date.toLocaleDateString("en-US", { month: "long" });
      return {
        month,
        likes: Math.floor(Math.random() * 50 + 100),
        comments: Math.floor(Math.random() * 30 + 40),
      };
    });

    // Configuration for the chart
    const chartConfig = {
      likes: {
        label: "Likes",
        color: "hsl(var(--chart-1))",
      },
      comments: {
        label: "Comments",
        color: "hsl(var(--chart-2))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card className="w-full max-w-3xl">
          <CardHeader className="items-center pb-4">
            <CardTitle>Audience Engagement Analysis</CardTitle>
            <CardDescription>
              Tracking monthly likes and comments over the last 24 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="max-h-[250px] w-full">
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value: string) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Area
                  dataKey="comments"
                  type="natural"
                  fill="var(--color-comments)"
                  fillOpacity={0.4}
                  stroke="var(--color-comments)"
                  stackId="a"
                />
                <Area
                  dataKey="likes"
                  type="natural"
                  fill="var(--color-likes)"
                  fillOpacity={0.4}
                  stroke="var(--color-likes)"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const Linear: Story = {
  render: () => {
    // Data for the chart
    const chartData = Array.from({ length: 24 }, (_, index) => {
      const date = new Date(new Date().getFullYear() - 1, index);
      const month = date.toLocaleDateString("en-US", { month: "long" });
      return {
        month,
        uniqueVisitors: Math.floor(Math.random() * 500 + 1000),
      };
    });

    // Configuration for the chart
    const chartConfig = {
      uniqueVisitors: {
        label: "Unique Visitors",
        color: "hsl(var(--chart-1))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card className="w-full max-w-3xl">
          <CardHeader className="items-center pb-4">
            <CardTitle>Visitor Insights</CardTitle>
            <CardDescription>
              Monthly unique visitors over the last 24 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              // className="max-h-[250px] w-full"
            >
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value: string) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" hideLabel />}
                />
                <Area
                  dataKey="uniqueVisitors"
                  type="linear"
                  fill="var(--color-uniqueVisitors)"
                  fillOpacity={0.4}
                  stroke="var(--color-uniqueVisitors)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const Step: Story = {
  render: () => {
    // Data for the chart
    const chartData = Array.from({ length: 24 }, (_, index) => {
      const date = new Date(new Date().getFullYear() - 1, index);
      const month = date.toLocaleDateString("en-US", { month: "long" });
      return {
        month,
        newEnrollments: Math.floor(Math.random() * 20 + 40),
      };
    });

    // Configuration for the chart
    const chartConfig = {
      newEnrollments: {
        label: "New Enrollments",
        color: "hsl(var(--chart-1))",
        icon: ChartColumn,
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card className="w-full max-w-3xl">
          <CardHeader className="items-center pb-4">
            <CardTitle>Enrollment Growth</CardTitle>
            <CardDescription>
              Monthly student enrollments over the last 24 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value: string) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Area
                  dataKey="newEnrollments"
                  type="step"
                  fill="var(--color-newEnrollments)"
                  fillOpacity={0.4}
                  stroke="var(--color-newEnrollments)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const Icon: Story = {
  render: () => {
    // Data for the chart
    const chartData = Array.from({ length: 24 }, (_, index) => {
      const date = new Date(new Date().getFullYear() - 1, index);
      const month = date.toLocaleDateString("en-US", { month: "long" });
      return {
        month,
        ecommerce: Math.floor(Math.random() * 5000 + 10000),
        retail: Math.floor(Math.random() * 3000 + 7000),
      };
    });

    // Configuration for the chart
    const chartConfig = {
      ecommerce: {
        label: "E-Commerce",
        color: "hsl(var(--chart-1))",
        icon: ShoppingBag,
      },
      retail: {
        label: "Retail",
        color: "hsl(var(--chart-2))",
        icon: Store,
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card className="w-full max-w-3xl">
          <CardHeader className="items-center pb-4">
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              Monthly revenue comparison between E-Commerce and Retail over the
              last 24 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value: string) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                  dataKey="retail"
                  type="natural"
                  fill="var(--color-retail)"
                  fillOpacity={0.4}
                  stroke="var(--color-retail)"
                  stackId="a"
                />
                <Area
                  dataKey="ecommerce"
                  type="natural"
                  fill="var(--color-ecommerce)"
                  fillOpacity={0.4}
                  stroke="var(--color-ecommerce)"
                  stackId="a"
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const Legend: Story = {
  render: () => {
    // Data for the chart
    const chartData = Array.from({ length: 24 }, (_, index) => {
      const date = new Date(new Date().getFullYear() - 1, index);
      const month = date.toLocaleDateString("en-US", { month: "long" });
      return {
        month,
        wholesale: Math.floor(Math.random() * 1000 + 500),
        retail: Math.floor(Math.random() * 1000 + 1500),
      };
    });

    // Configuration for the chart
    const chartConfig = {
      wholesale: {
        label: "Wholesale",
        color: "hsl(var(--chart-1))",
      },
      retail: {
        label: "Retail",
        color: "hsl(var(--chart-2))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card className="w-full max-w-3xl">
          <CardHeader className="items-center pb-4">
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>
              Distribution of wholesale and retail sales over the last 24 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value: string) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                  dataKey="retail"
                  type="natural"
                  fill="var(--color-retail)"
                  fillOpacity={0.4}
                  stroke="var(--color-retail)"
                  stackId="a"
                />
                <Area
                  dataKey="wholesale"
                  type="natural"
                  fill="var(--color-wholesale)"
                  fillOpacity={0.4}
                  stroke="var(--color-wholesale)"
                  stackId="a"
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};
