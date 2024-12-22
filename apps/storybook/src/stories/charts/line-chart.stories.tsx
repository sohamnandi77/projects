import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CircleDollarSign } from "lucide-react";

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
  CartesianGrid,
  Dot,
  LabelList,
  Line,
  LineChart,
  XAxis,
} from "@projects/ui/recharts";
import { Toggle } from "@projects/ui/toggle";

const meta = {
  title: "Components/Charts/Line Chart",
  component: LineChart,
  subcomponents: {
    Line: Line as unknown as React.ComponentType<unknown>,
  },
  tags: ["autodocs", "charts"],
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    // Data for the chart
    const chartData = [
      { month: "Jan", revenue: 1500 },
      { month: "Feb", revenue: 3200 },
      { month: "Mar", revenue: 2900 },
      { month: "Apr", revenue: 2100 },
      { month: "May", revenue: 4000 },
      { month: "Jun", revenue: 3700 },
      { month: "Jul", revenue: 4300 },
      { month: "Aug", revenue: 4900 },
      { month: "Sep", revenue: 4700 },
      { month: "Oct", revenue: 5200 },
      { month: "Nov", revenue: 6000 },
      { month: "Dec", revenue: 7200 },
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
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle>Monthly Revenue Overview</CardTitle>
            <CardDescription>Jan - Dec 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
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
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="revenue"
                  type="natural"
                  stroke="var(--color-revenue)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
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
      { month: "Jan", revenue: 186, profit: 80 },
      { month: "Feb", revenue: 305, profit: 200 },
      { month: "Mar", revenue: 237, profit: 120 },
      { month: "Apr", revenue: 73, profit: 190 },
      { month: "May", revenue: 209, profit: 130 },
      { month: "Jun", revenue: 214, profit: 140 },
      { month: "Jul", revenue: 240, profit: 160 },
      { month: "Aug", revenue: 250, profit: 170 },
      { month: "Sep", revenue: 260, profit: 180 },
      { month: "Oct", revenue: 275, profit: 190 },
      { month: "Nov", revenue: 290, profit: 200 },
      { month: "Dec", revenue: 300, profit: 220 },
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
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle>Monthly Revenue and Profit</CardTitle>
            <CardDescription>Jan - Dec 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
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
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="revenue"
                  type="natural"
                  stroke="var(--color-revenue)"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-revenue)",
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const DotsColor: Story = {
  render: () => {
    // Data for the chart
    const chartData = [
      {
        department: "Marketing",
        expenses: 275,
        fill: "var(--color-marketing)",
      },
      { department: "Sales", expenses: 200, fill: "var(--color-sales)" },
      { department: "IT", expenses: 187, fill: "var(--color-it)" },
      { department: "HR", expenses: 173, fill: "var(--color-hr)" },
      {
        department: "Operations",
        expenses: 90,
        fill: "var(--color-operations)",
      },
    ];

    // Configuration for the chart
    const chartConfig = {
      expenses: {
        label: "Expenses",
        color: "hsl(var(--chart-2))",
      },
      marketing: {
        label: "Marketing",
        color: "hsl(var(--chart-1))",
      },
      sales: {
        label: "Sales",
        color: "hsl(var(--chart-2))",
      },
      it: {
        label: "IT",
        color: "hsl(var(--chart-3))",
      },
      hr: {
        label: "HR",
        color: "hsl(var(--chart-4))",
      },
      operations: {
        label: "Operations",
        color: "hsl(var(--chart-5))",
      },
    } satisfies ChartConfig;

    interface DotProps {
      cx: number;
      cy: number;
      payload: {
        department: string;
        fill: string;
      };
    }

    return (
      <div className="w-full md:w-[400px]">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle>Departmental Expenses Overview</CardTitle>
            <CardDescription>Jan - Jun 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  top: 24,
                  left: 24,
                  right: 24,
                }}>
                <CartesianGrid vertical={false} />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      indicator="line"
                      nameKey="expenses"
                      hideLabel
                    />
                  }
                />
                <Line
                  dataKey="expenses"
                  type="natural"
                  stroke="var(--color-expenses)"
                  strokeWidth={2}
                  dot={(props: DotProps) => {
                    const { payload, cx, cy } = props;
                    return (
                      <Dot
                        key={payload.department}
                        r={5}
                        cx={cx}
                        cy={cy}
                        fill={payload.fill}
                        stroke={payload.fill}
                      />
                    );
                  }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const CustomDot: Story = {
  render: () => {
    // Data for the chart
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

    const chartData = months.map((month) => ({
      month,
      sales: Math.floor(Math.random() * 300) + 150,
      profit: Math.floor(Math.random() * 150) + 50,
    }));

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

    interface CustomDotProps {
      cx: number;
      cy: number;
      payload: {
        month: string;
      };
    }

    return (
      <div className="w-full md:w-[400px]">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle>Monthly Sales & Profit</CardTitle>
            <CardDescription>
              Visualizing Monthly Sales & Profit for Jan - Dec 2024
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
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
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="sales"
                  type="natural"
                  stroke="var(--color-sales)"
                  strokeWidth={2}
                  dot={({ cx, cy, payload }: CustomDotProps) => {
                    const r = 24;
                    return (
                      <CircleDollarSign
                        className="text-[var(--color-profit)]"
                        key={payload.month}
                        x={cx - r / 2}
                        y={cy - r / 2}
                        width={r}
                        height={r}
                        fill="hsl(var(--bg))"
                        stroke="var(--color-sales)"
                      />
                    );
                  }}
                />
              </LineChart>
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
      { month: "Jan", revenue: 186, expenses: 80 },
      { month: "Feb", revenue: 305, expenses: 200 },
      { month: "Mar", revenue: 237, expenses: 120 },
      { month: "Apr", revenue: 73, expenses: 190 },
      { month: "May", revenue: 209, expenses: 130 },
      { month: "Jun", revenue: 214, expenses: 140 },
      { month: "Jul", revenue: 260, expenses: 160 },
      { month: "Aug", revenue: 320, expenses: 180 },
      { month: "Sep", revenue: 280, expenses: 150 },
      { month: "Oct", revenue: 350, expenses: 200 },
      { month: "Nov", revenue: 400, expenses: 210 },
      { month: "Dec", revenue: 450, expenses: 230 },
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
      <div className="w-full md:w-[400px]">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle>Annual Revenue & Expenses Overview</CardTitle>
            <CardDescription>Jan - Dec 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  top: 20,
                  left: 12,
                  right: 12,
                }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Line
                  dataKey="revenue"
                  type="natural"
                  stroke="var(--color-revenue)"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-revenue)",
                  }}
                  activeDot={{
                    r: 6,
                  }}>
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-fg"
                    fontSize={12}
                  />
                </Line>
                <Line
                  dataKey="expenses"
                  type="natural"
                  stroke="var(--color-expenses)"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-expenses)",
                  }}
                  activeDot={{
                    r: 6,
                  }}>
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-fg"
                    fontSize={12}
                  />
                </Line>
              </LineChart>
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
      { platform: "Instagram", users: 275, fill: "var(--color-instagram)" },
      { platform: "TikTok", users: 200, fill: "var(--color-tiktok)" },
      { platform: "Twitter", users: 187, fill: "var(--color-twitter)" },
      { platform: "LinkedIn", users: 173, fill: "var(--color-linkedin)" },
      { platform: "Other", users: 90, fill: "var(--color-other)" },
    ];
    // Configuration for the chart
    const chartConfig = {
      users: {
        label: "Users",
        color: "hsl(var(--chart-2))",
      },
      Instagram: {
        label: "Instagram",
        color: "hsl(var(--chart-1))",
      },
      TikTok: {
        label: "TikTok",
        color: "hsl(var(--chart-2))",
      },
      Twitter: {
        label: "Twitter",
        color: "hsl(var(--chart-3))",
      },
      LinkedIn: {
        label: "LinkedIn",
        color: "hsl(var(--chart-4))",
      },
      Other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle>Platform User Growth</CardTitle>
            <CardDescription>Jan - Dec 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  top: 24,
                  left: 24,
                  right: 24,
                }}>
                <CartesianGrid vertical={false} />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      indicator="line"
                      nameKey="users"
                      hideLabel
                    />
                  }
                />
                <Line
                  dataKey="users"
                  type="natural"
                  stroke="var(--color-users)"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-users)",
                  }}
                  activeDot={{
                    r: 6,
                  }}>
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-fg"
                    fontSize={12}
                    dataKey="platform"
                    formatter={(value: keyof typeof chartConfig) =>
                      chartConfig[value].label
                    }
                  />
                </Line>
              </LineChart>
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
    const chartData = [
      { month: "Jan", revenue: 186 },
      { month: "Feb", revenue: 305 },
      { month: "Mar", revenue: 237 },
      { month: "Apr", revenue: 73 },
      { month: "May", revenue: 209 },
      { month: "Jun", revenue: 214 },
      { month: "Jul", revenue: 250 },
      { month: "Aug", revenue: 320 },
      { month: "Sep", revenue: 280 },
      { month: "Oct", revenue: 350 },
      { month: "Nov", revenue: 400 },
      { month: "Dec", revenue: 450 },
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
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle>Annual Revenue Overview</CardTitle>
            <CardDescription>Jan - Dec 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
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
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="revenue"
                  type="linear"
                  stroke="var(--color-revenue)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
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
    const chartData = Array.from({ length: 24 }, (_, index) => {
      const date = new Date(new Date().getFullYear() - 1, index);
      const month = date.toLocaleDateString("en-US", { month: "short" });
      return {
        month,
        revenue: Math.floor(Math.random() * 300 + 200),
        expenses: Math.floor(Math.random() * 150 + 50),
      };
    });

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
      <div className="w-full md:w-[400px]">
        <Card className="w-full max-w-3xl">
          <CardHeader className="items-center pb-0">
            <CardTitle>Revenue and Expenses Trend</CardTitle>
            <CardDescription>
              Monthly trends for revenue and expenses over the last 24 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
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
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Line
                  dataKey="revenue"
                  type="monotone"
                  stroke="var(--color-revenue)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="expenses"
                  type="monotone"
                  stroke="var(--color-expenses)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
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
    const chartData = Array.from({ length: 12 }, (_, index) => {
      const date = new Date(2024, index);
      const month = date.toLocaleDateString("en-US", { month: "short" });
      return {
        month,
        sales: Math.floor(Math.random() * 300 + 150),
      };
    });

    // Configuration for the chart
    const chartConfig = {
      sales: {
        label: "Sales",
        color: "hsl(var(--chart-1))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card className="w-full max-w-3xl">
          <CardHeader className="items-center pb-0">
            <CardTitle>Monthly Sales Overview</CardTitle>
            <CardDescription>Jan - Dec 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
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
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="sales"
                  type="step"
                  stroke="var(--color-sales)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
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
    const generateChartData = (startDate: string, endDate: string) => {
      const result = [];
      const currentDate = new Date(startDate);

      while (currentDate <= new Date(endDate)) {
        const date = currentDate.toISOString().split("T")[0];
        result.push({
          date,
          revenue: Math.floor(Math.random() * 5000), // Random revenue value
          expenses: Math.floor(Math.random() * 3000), // Random expenses value
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return result;
    };

    const chartData = generateChartData("2024-04-01", "2024-06-30");

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

    const [activeChart, setActiveChart] =
      useState<keyof typeof chartConfig>("revenue");

    return (
      <div className="w-full md:w-[550px]">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Revenue vs Expenses</CardTitle>
              <CardDescription>
                Tracking daily revenue and expenses over the last 3 months
              </CardDescription>
            </div>
            <div className="flex gap-x-1">
              {["revenue", "expenses"].map((key) => {
                const chart = key as keyof typeof chartConfig;
                return (
                  <Toggle
                    key={chart}
                    isSelected={activeChart === chart}
                    onPress={() => setActiveChart(chart)}>
                    {chartConfig[chart].label}
                  </Toggle>
                );
              })}
            </div>
          </CardHeader>
          <CardContent className="px-2 sm:p-6">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full">
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}>
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
                <Line
                  dataKey={activeChart}
                  type="monotone"
                  stroke={`var(--color-${activeChart})`}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};
