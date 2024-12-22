import type { Meta, StoryObj } from "@storybook/react";
import { useMemo, useState } from "react";

import type { Key } from "@projects/ui";
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
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  Rectangle,
  XAxis,
  YAxis,
} from "@projects/ui/recharts";
import {
  Select,
  SelectList,
  SelectOption,
  SelectOptionDetails,
  SelectTrigger,
} from "@projects/ui/select";

const meta = {
  title: "Components/Charts/Bar Chart",
  component: BarChart,
  subcomponents: {
    Bar: Bar as unknown as React.ComponentType<unknown>,
  },
  tags: ["autodocs", "charts"],
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => {
    // Data for the chart
    const chartData = Array.from({ length: 48 }, (_, index) => {
      const month = new Date(
        new Date().getFullYear() - 4,
        Math.floor(index / 2),
      ).toLocaleDateString("en-US", {
        month: "short",
      });
      const startDay = index % 2 === 0 ? 1 : 15;
      const endDay = index % 2 === 0 ? 14 : 28;
      return {
        period: `${month} ${startDay} - ${month} ${endDay}`,
        revenue: Math.floor(Math.random() * 5000 + 2000),
      };
    });

    // Configuration for the chart
    const chartConfig = {
      revenue: {
        label: "Revenue",
        color: "hsl(var(--chart-1))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle>Biweekly Revenue</CardTitle>
            <CardDescription>
              Revenue breakdown every 2 weeks (Jan - Dec 2024)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="period"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={0} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const Horizontal: Story = {
  render: () => {
    // Data for the chart
    const chartData = [
      { dataCenter: "New York", uptime: 99.9 },
      { dataCenter: "San Francisco", uptime: 97.5 },
      { dataCenter: "Singapore", uptime: 98.7 },
      { dataCenter: "London", uptime: 95.3 },
      { dataCenter: "Tokyo", uptime: 94.8 },
      { dataCenter: "Sydney", uptime: 99.9 },
      { dataCenter: "Seoul", uptime: 97.5 },
    ];

    // Configuration for the chart
    const chartConfig = {
      uptime: {
        label: "Uptime (%)",
        color: "hsl(var(--chart-1))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[550px]">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle>Data Center Uptime</CardTitle>
            <CardDescription>
              Uptime percentage by region for Q1 2024
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{
                  left: -20,
                }}
              >
                <XAxis type="number" dataKey="uptime" hide />
                <YAxis
                  dataKey="dataCenter"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="uptime" fill="var(--color-uptime)" radius={5} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const Label: Story = {
  render: () => {
    // Data for the chart
    const chartData = [
      { category: "Customer Support", satisfaction: 85 },
      { category: "Product Quality", satisfaction: 90 },
      { category: "Delivery Speed", satisfaction: 78 },
      { category: "Ease of Use", satisfaction: 88 },
      { category: "Value for Money", satisfaction: 82 },
      { category: "Customer Service", satisfaction: 85 },
      { category: "Product Quality", satisfaction: 90 },
      { category: "Delivery Speed", satisfaction: 78 },
      { category: "Ease of Use", satisfaction: 88 },
      { category: "Value for Money", satisfaction: 82 },
      { category: "Customer Service", satisfaction: 85 },
      { category: "Product Quality", satisfaction: 90 },
      { category: "Delivery Speed", satisfaction: 78 },
      { category: "Ease of Use", satisfaction: 88 },
      { category: "Value for Money", satisfaction: 82 },
      { category: "Customer Service", satisfaction: 85 },
      { category: "Product Quality", satisfaction: 90 },
      { category: "Delivery Speed", satisfaction: 78 },
      { category: "Ease of Use", satisfaction: 88 },
      { category: "Value for Money", satisfaction: 82 },
      { category: "Customer Service", satisfaction: 85 },
      { category: "Product Quality", satisfaction: 90 },
      { category: "Delivery Speed", satisfaction: 78 },
      { category: "Ease of Use", satisfaction: 88 },
      { category: "Value for Money", satisfaction: 82 },
    ];

    // Configuration for the chart
    const chartConfig = {
      satisfaction: {
        label: "Satisfaction",
        color: "hsl(var(--chart-1))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-screen md:px-24">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Customer Satisfaction Survey</CardTitle>
            <CardDescription>Satisfaction scores by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={chartData}
                margin={{ top: 20 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="satisfaction"
                  fill="var(--color-satisfaction)"
                  radius={8}
                >
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-fg"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const InsetLabel: Story = {
  render: () => {
    // Data for the chart
    const chartData = [
      {
        country: "United States",
        count: 45000,
        percentage: 45.0,
      },
      {
        country: "Canada",
        count: 34000,
        percentage: 18.0,
      },
      {
        country: "United Kingdom",
        count: 30000,
        percentage: 12.0,
      },
      {
        country: "Germany",
        count: 25000,
        percentage: 9.0,
      },
      {
        country: "Australia",
        count: 22000,
        percentage: 7.5,
      },
      {
        country: "France",
        count: 18000,
        percentage: 6.0,
      },
      {
        country: "Japan",
        count: 15000,
        percentage: 4.5,
      },
      {
        country: "Brazil",
        count: 13000,
        percentage: 5.0,
      },
      {
        country: "Indonesia",
        count: 10030,
        percentage: 6.0,
      },
    ];

    // Configuration for the chart
    const chartConfig = {
      count: {
        label: "Count",
        color: "hsl(var(--chart-1))",
      },
    } satisfies ChartConfig;

    interface BarShapeProps {
      country: string;
      count: number;
      percentage: number;
      x: number;
      y: number;
      width: number;
      height: number;
      background: {
        x: number;
        y: number;
        width: number;
        height: number;
        fill: string;
      };
    }

    // ! Components Should not be defined inside the another component, just did it to show the component in storybook
    const BarShape = (props: BarShapeProps) => {
      const { x, y, count, percentage, country, background } = props;
      return (
        <>
          <Rectangle {...props} />
          <text x={x + 10} y={y + 20} fill="white">
            {country}
          </text>
          <text
            x={background.width - 10}
            y={y + 20}
            textAnchor="end"
            fill="hsl(var(--fg))"
          >
            {count.toLocaleString()} ({percentage.toFixed(1)}%)
          </text>
        </>
      );
    };

    return (
      <div className="w-full md:w-screen md:px-24">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Traffic by Country</CardTitle>
            <CardDescription>Since Aug 17, 2014</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                barSize={30}
                margin={{ left: 0, right: 0 }}
              >
                <YAxis dataKey="name" type="category" hide />
                <XAxis dataKey="count" type="number" hide />
                <Bar
                  dataKey="count"
                  layout="vertical"
                  fill="var(--color-count)"
                  background={{
                    radius: 6,
                    fill: "hsl(var(--chart-1))",
                    opacity: 0.2,
                  }}
                  radius={6}
                  shape={(props: unknown) => (
                    <BarShape {...(props as BarShapeProps)} />
                  )}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
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
      { team: "Engineering", completed: 42, ongoing: 15 },
      { team: "Design", completed: 30, ongoing: 5 },
      { team: "Marketing", completed: 25, ongoing: 10 },
      { team: "Sales", completed: 20, ongoing: 8 },
      { team: "Support", completed: 35, ongoing: 12 },
      { team: "Engineering", completed: 42, ongoing: 15 },
      { team: "Design", completed: 30, ongoing: 5 },
      { team: "Marketing", completed: 25, ongoing: 10 },
      { team: "Sales", completed: 20, ongoing: 8 },
      { team: "Support", completed: 35, ongoing: 12 },
      { team: "Engineering", completed: 42, ongoing: 15 },
      { team: "Design", completed: 30, ongoing: 5 },
    ];

    // Configuration for the chart
    const chartConfig = {
      completed: {
        label: "Completed",
        color: "hsl(var(--chart-1))",
      },
      ongoing: {
        label: "Ongoing",
        color: "hsl(var(--chart-2))",
      },
      label: {
        color: "hsl(var(--bg))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-screen md:px-24">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Team Project Status</CardTitle>
            <CardDescription>
              Completed vs Ongoing Projects by Team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{
                  right: 16,
                }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="team"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <XAxis dataKey="completed" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Bar
                  dataKey="completed"
                  layout="vertical"
                  fill="var(--color-completed)"
                  radius={4}
                >
                  <LabelList
                    dataKey="team"
                    position="insideLeft"
                    offset={8}
                    className="fill-[var(--color-label)]"
                    fontSize={12}
                  />
                  <LabelList
                    dataKey="completed"
                    position="right"
                    offset={8}
                    className="fill-fg"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const Mixed: Story = {
  render: () => {
    // Data for the chart
    const chartData = [
      {
        browser: "chrome",
        visitors: 275,
        bounceRate: 40,
        avgSession: 5.6,
        fill: "var(--color-chrome)",
      },
      {
        browser: "safari",
        visitors: 200,
        bounceRate: 35,
        avgSession: 6.3,
        fill: "var(--color-safari)",
      },
      {
        browser: "firefox",
        visitors: 187,
        bounceRate: 45,
        avgSession: 4.2,
        fill: "var(--color-firefox)",
      },
      {
        browser: "edge",
        visitors: 173,
        bounceRate: 30,
        avgSession: 5.0,
        fill: "var(--color-edge)",
      },
      {
        browser: "other",
        visitors: 90,
        bounceRate: 50,
        avgSession: 3.7,
        fill: "var(--color-other)",
      },
    ];

    // Configuration for the chart
    const chartConfig = {
      visitors: {
        label: "Visitors",
        color: "hsl(var(--chart-1))",
      },
      bounceRate: {
        label: "Bounce Rate (%)",
        color: "hsl(var(--chart-2))",
      },
      avgSession: {
        label: "Avg Session (min)",
        color: "hsl(var(--chart-3))",
      },
      chrome: {
        label: "Chrome",
        color: "hsl(var(--chart-1))",
      },
      safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
      },
      firefox: {
        label: "Firefox",
        color: "hsl(var(--chart-3))",
      },
      edge: {
        label: "Edge",
        color: "hsl(var(--chart-4))",
      },
      other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-screen md:px-24">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Browser Metrics</CardTitle>
            <CardDescription>
              Grouped data for visitors, bounce rate, and average session
              duration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{
                  left: 0,
                }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="browser"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) =>
                    chartConfig[value as keyof typeof chartConfig].label
                  }
                />
                <XAxis type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Legend />
                <Bar
                  dataKey="visitors"
                  layout="vertical"
                  fill="var(--color-chrome)"
                  radius={5}
                />
                <Bar
                  dataKey="bounceRate"
                  layout="vertical"
                  fill="var(--color-safari)"
                  radius={5}
                />
                <Bar
                  dataKey="avgSession"
                  layout="vertical"
                  fill="var(--color-firefox)"
                  radius={5}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const Negative: Story = {
  render: () => {
    // Data for the chart
    const chartData = [
      { month: "Jan", profitLoss: 1200 },
      { month: "Feb", profitLoss: 1500 },
      { month: "Mar", profitLoss: -700 },
      { month: "Apr", profitLoss: 2000 },
      { month: "May", profitLoss: -1500 },
      { month: "Jun", profitLoss: 1700 },
      { month: "Jul", profitLoss: -1200 },
      { month: "Aug", profitLoss: 1900 },
      { month: "Sep", profitLoss: -1400 },
      { month: "Oct", profitLoss: -1800 },
      { month: "Nov", profitLoss: 2100 },
      { month: "Dec", profitLoss: 1600 },
    ];

    // Configuration for the chart
    const chartConfig = {
      profitLoss: {
        label: "Profit/Loss",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-screen md:px-24">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Monthly Profit and Loss</CardTitle>
            <CardDescription>January - December 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel hideIndicator />}
                />
                <Bar dataKey="profitLoss">
                  <LabelList position="top" dataKey="month" fillOpacity={1} />
                  {chartData.map((item) => (
                    <Cell
                      key={item.month}
                      fill={
                        item.profitLoss > 0
                          ? "hsl(var(--chart-1))"
                          : "hsl(var(--chart-2))"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
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
    const chartData = Array.from({ length: 12 }, (_, i) => {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return {
        month: months[i],
        sales: 1000 + Math.floor(Math.random() * 300), // Random value for Sales
        expenses: 800 + Math.floor(Math.random() * 400), // Random value for Expenses
        profit: 200 + Math.floor(Math.random() * 900), // Random value for Profit
      };
    });

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
      profit: {
        label: "Profit",
        color: "hsl(var(--chart-4))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-screen md:px-24">
        <Card className="w-full">
          <CardHeader className="items-center pb-4">
            <CardTitle>Sales vs Expenses</CardTitle>
            <CardDescription>
              The chart shows the sales and expenses for the last year.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="max-h-[250px] w-full"
            >
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
                <Bar
                  dataKey="expenses"
                  fill="var(--color-expenses)"
                  radius={4}
                />
                <Bar dataKey="profit" fill="var(--color-profit)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const StackedLegend: Story = {
  render: () => {
    // Data for the chart
    const chartData = [
      { month: "Jan", revenue: 3200, expenses: 2400 },
      { month: "Feb", revenue: 2800, expenses: 2000 },
      { month: "Mar", revenue: 3500, expenses: 2700 },
      { month: "Apr", revenue: 3000, expenses: 2200 },
      { month: "May", revenue: 3600, expenses: 2800 },
      { month: "Jun", revenue: 3400, expenses: 2600 },
      { month: "Jul", revenue: 3900, expenses: 3100 },
      { month: "Aug", revenue: 4100, expenses: 3300 },
      { month: "Sep", revenue: 3700, expenses: 2900 },
      { month: "Oct", revenue: 4200, expenses: 3400 },
      { month: "Nov", revenue: 4000, expenses: 3100 },
      { month: "Dec", revenue: 4300, expenses: 3500 },
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

    return (
      <div className="w-full md:w-screen md:px-24">
        <Card className="w-full">
          <CardHeader className="items-center pb-4">
            <CardTitle>Biweekly Revenue</CardTitle>
            <CardDescription>
              Revenue breakdown every 2 weeks (Jan - Dec 2024)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value: string) => value}
                />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar
                  dataKey="revenue"
                  stackId="a"
                  fill="var(--color-revenue)"
                  radius={[0, 0, 4, 4]}
                />
                <Bar
                  dataKey="expenses"
                  stackId="a"
                  fill="var(--color-expenses)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const Active: Story = {
  render: () => {
    // Data for the chart
    const chartData = [
      { os: "Windows", users: 320, fill: "hsl(var(--chart-1))" },
      { os: "MacOS", users: 200, fill: "hsl(var(--chart-2))" },
      { os: "Linux", users: 150, fill: "hsl(var(--chart-3))" },
      { os: "Android", users: 250, fill: "hsl(var(--chart-4))" },
      { os: "iOS", users: 180, fill: "hsl(var(--chart-5))" },
      { os: "ChromeOS", users: 90, fill: "hsl(var(--chart-1))" },
      { os: "Ubuntu", users: 130, fill: "hsl(var(--chart-2))" },
      { os: "Fedora", users: 100, fill: "hsl(var(--chart-3))" },
      { os: "FreeBSD", users: 60, fill: "hsl(var(--chart-5))" },
    ];

    // Configuration for the chart
    const chartConfig = {
      users: {
        label: "Users",
      },
      windows: {
        label: "Windows",
        color: "hsl(var(--chart-1))",
      },
      macos: {
        label: "MacOS",
        color: "hsl(var(--chart-2))",
      },
      linux: {
        label: "Linux",
        color: "hsl(var(--chart-3))",
      },
      android: {
        label: "Android",
        color: "hsl(var(--chart-4))",
      },
      ios: {
        label: "iOS",
        color: "hsl(var(--chart-5))",
      },
      chromeos: {
        label: "ChromeOS",
        color: "hsl(var(--chart-1))",
      },
      ubuntu: {
        label: "Ubuntu",
        color: "hsl(var(--chart-2))",
      },
      fedora: {
        label: "Fedora",
        color: "hsl(var(--chart-3))",
      },
      harmonyos: {
        label: "HarmonyOS",
        color: "hsl(var(--chart-4))",
      },
      freebsd: {
        label: "FreeBSD",
        color: "hsl(var(--chart-5))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-screen md:px-24">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Operating System Usage</CardTitle>
            <CardDescription>User distribution by OS in 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="os"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value: string) =>
                    chartConfig[value.toLowerCase() as keyof typeof chartConfig]
                      .label
                  }
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="users"
                  strokeWidth={2}
                  radius={8}
                  activeIndex={1}
                  activeBar={({ ...props }) => {
                    return (
                      <Rectangle
                        {...props}
                        fillOpacity={0.8}
                        stroke={
                          (props as unknown as { payload: { fill: string } })
                            .payload.fill
                        }
                        strokeDasharray={4}
                        strokeDashoffset={4}
                      />
                    );
                  }}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: function Render() {
    // Data for the chart
    const chartData = Array.from({ length: 50 }, (_, index) => {
      const date = new Date(2024, 0, 1 + index);
      return {
        date: date.toISOString().split("T")[0],
        sales: Math.floor(Math.random() * 1000 + 500),
        revenue: Math.floor(Math.random() * 3000 + 1500),
      };
    });

    // Configuration for the chart
    const chartConfig = {
      sales: {
        label: "Sales",
        color: "hsl(var(--chart-1))",
      },
      revenue: {
        label: "Revenue",
        color: "hsl(var(--chart-2))",
      },
    } satisfies ChartConfig;

    const [activeChart, setActiveChart] = useState<Key>("sales");

    const total = useMemo(
      () => ({
        sales: chartData.reduce((acc, curr) => acc + curr.sales, 0),
        revenue: chartData.reduce((acc, curr) => acc + curr.revenue, 0),
      }),
      [chartData],
    );

    return (
      <div className="w-full md:w-screen md:px-24">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Business Overview</CardTitle>
              <CardDescription>
                Displaying total sales and revenue for the last 50 days
              </CardDescription>
            </div>
            <div>
              <Select
                selectedKey={activeChart}
                onSelectionChange={setActiveChart}
              >
                <SelectTrigger />
                <SelectList placement="bottom end" className="sm:min-w-40">
                  {["sales", "revenue"].map((key) => {
                    const chart = key as keyof typeof chartConfig;
                    return (
                      <SelectOption
                        key={chart}
                        data-active={activeChart === chart}
                        id={key}
                        textValue={chartConfig[chart].label}
                      >
                        <SelectOptionDetails
                          label={chartConfig[chart].label}
                          description={total[
                            key as keyof typeof total
                          ].toLocaleString()}
                        />
                      </SelectOption>
                    );
                  })}
                </SelectList>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="px-2 sm:p-6">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full"
            >
              <BarChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value: string) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="w-[150px]"
                      nameKey="views"
                      labelFormatter={(value: string) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        });
                      }}
                    />
                  }
                />
                <Bar
                  dataKey={activeChart as keyof typeof chartConfig}
                  fill={`var(--color-${activeChart})`}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};
