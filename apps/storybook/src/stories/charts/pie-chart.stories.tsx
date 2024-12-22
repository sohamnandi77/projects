import type { Meta, StoryObj } from "@storybook/react";
import { useMemo, useState } from "react";

import type { Key } from "@projects/ui";
import type { ChartConfig } from "@projects/ui/chart";
import type { PieSectorDataItem } from "@projects/ui/recharts";
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
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@projects/ui/chart";
import { Label, LabelList, Pie, PieChart, Sector } from "@projects/ui/recharts";
import {
  Select,
  SelectList,
  SelectOption,
  SelectTrigger,
} from "@projects/ui/select";

const meta = {
  title: "Components/Charts/Pie Chart",
  component: PieChart,
  subcomponents: {
    Pie: Pie as unknown as React.ComponentType<unknown>,
  },
  tags: ["autodocs", "charts"],
} satisfies Meta<typeof PieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    // Data for the chart
    const chartData = [
      { category: "Sales", amount: 275, fill: "var(--color-sales)" },
      { category: "Marketing", amount: 200, fill: "var(--color-marketing)" },
      { category: "IT", amount: 187, fill: "var(--color-it)" },
      { category: "HR", amount: 173, fill: "var(--color-hr)" },
      { category: "Operations", amount: 90, fill: "var(--color-operations)" },
    ];

    // Configuration for the chart
    const chartConfig = {
      amount: {
        label: "Amount",
      },
      sales: {
        label: "Sales",
        color: "hsl(var(--chart-1))",
      },
      marketing: {
        label: "Marketing",
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

    return (
      <div className="w-full md:w-[400px]">
        <Card className="items-center pb-0">
          <CardHeader>
            <CardTitle>Departmental Budget Allocation</CardTitle>
            <CardDescription>Jan - Jun 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]">
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie data={chartData} dataKey="amount" nameKey="category" />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const Donut: Story = {
  render: () => {
    // Data for the chart
    const chartData = [
      { category: "Electronics", sales: 275, fill: "var(--color-electronics)" },
      { category: "Clothing", sales: 200, fill: "var(--color-clothing)" },
      { category: "Groceries", sales: 187, fill: "var(--color-groceries)" },
      { category: "Furniture", sales: 173, fill: "var(--color-furniture)" },
      { category: "Books", sales: 90, fill: "var(--color-books)" },
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
      clothing: {
        label: "Clothing",
        color: "hsl(var(--chart-2))",
      },
      groceries: {
        label: "Groceries",
        color: "hsl(var(--chart-3))",
      },
      furniture: {
        label: "Furniture",
        color: "hsl(var(--chart-4))",
      },
      books: {
        label: "Books",
        color: "hsl(var(--chart-5))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card className="items-center pb-0">
          <CardHeader>
            <CardTitle>Sales Allocation by Category</CardTitle>
            <CardDescription>Jan - Jun 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]">
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="sales"
                  nameKey="category"
                  innerRadius={60}
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const DonutActive: Story = {
  render: () => {
    // Data for the chart
    const chartData = [
      { category: "Electronics", sales: 500, fill: "var(--color-electronics)" },
      { category: "Clothing", sales: 300, fill: "var(--color-clothing)" },
      { category: "Groceries", sales: 450, fill: "var(--color-groceries)" },
      { category: "Furniture", sales: 200, fill: "var(--color-furniture)" },
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
      clothing: {
        label: "Clothing",
        color: "hsl(var(--chart-2))",
      },
      groceries: {
        label: "Groceries",
        color: "hsl(var(--chart-3))",
      },
      furniture: {
        label: "Furniture",
        color: "hsl(var(--chart-4))",
      },
      books: {
        label: "Books",
        color: "hsl(var(--chart-5))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card className="items-center pb-0">
          <CardHeader>
            <CardTitle>Sales Allocation by Category</CardTitle>
            <CardDescription>Jan - Jun 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]">
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="sales"
                  nameKey="category"
                  innerRadius={60}
                  strokeWidth={5}
                  activeIndex={0}
                  activeShape={({
                    outerRadius = 0,
                    ...props
                  }: PieSectorDataItem) => (
                    <Sector {...props} outerRadius={outerRadius + 10} />
                  )}
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

interface CustomContentProps {
  totalSales: number;
  viewBox?: {
    cx?: number;
    cy?: number;
  };
}

const CustomContent = (props: CustomContentProps) => {
  const { viewBox, totalSales } = props;
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
          className="fill-fg text-2xl font-bold">
          {totalSales.toLocaleString()}
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
};

export const DonutWithText: Story = {
  render: function Render() {
    // Data for the chart
    const chartData = useMemo(
      () => [
        {
          category: "Electronics",
          sales: 500,
          fill: "var(--color-electronics)",
        },
        { category: "Clothing", sales: 300, fill: "var(--color-clothing)" },
        {
          category: "Groceries",
          sales: 450,
          fill: "var(--color-groceries)",
        },
        {
          category: "Furniture",
          sales: 200,
          fill: "var(--color-furniture)",
        },
        { category: "Books", sales: 100, fill: "var(--color-books)" },
      ],
      [],
    );

    // Configuration for the chart
    const chartConfig = {
      sales: {
        label: "Sales",
      },
      electronics: {
        label: "Electronics",
        color: "hsl(var(--chart-1))",
      },
      clothing: {
        label: "Clothing",
        color: "hsl(var(--chart-2))",
      },
      groceries: {
        label: "Groceries",
        color: "hsl(var(--chart-3))",
      },
      furniture: {
        label: "Furniture",
        color: "hsl(var(--chart-4))",
      },
      books: {
        label: "Books",
        color: "hsl(var(--chart-5))",
      },
    } satisfies ChartConfig;

    const totalSales = useMemo(() => {
      return chartData.reduce((acc, curr) => acc + curr.sales, 0);
    }, [chartData]);

    return (
      <div className="w-full md:w-[400px]">
        <Card className="items-center pb-0">
          <CardHeader>
            <CardTitle>Sales Allocation by Category</CardTitle>
            <CardDescription>Jan - Jun 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]">
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="sales"
                  nameKey="category"
                  innerRadius={60}
                  strokeWidth={5}>
                  <Label content={<CustomContent totalSales={totalSales} />} />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

interface CustomLabelProps {
  cx?: number;
  cy?: number;
  x?: number;
  y?: number;
  textAnchor?: string;
  dominantBaseline?: string;
  payload: {
    amount: number;
  };
}

export const CustomLabel: Story = {
  render: () => {
    // Data for the chart
    const chartData = [
      { category: "Sales", amount: 275, fill: "var(--color-sales)" },
      { category: "Marketing", amount: 200, fill: "var(--color-marketing)" },
      { category: "IT", amount: 187, fill: "var(--color-it)" },
      { category: "HR", amount: 173, fill: "var(--color-hr)" },
      { category: "Operations", amount: 90, fill: "var(--color-operations)" },
    ];
    // Configuration for the chart
    const chartConfig = {
      amount: {
        label: "Amount",
      },
      sales: {
        label: "Sales",
        color: "hsl(var(--chart-1))",
      },
      marketing: {
        label: "Marketing",
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

    const CustomPieLabel = (props: CustomLabelProps) => {
      const { payload, cx, cy, x, y, textAnchor, dominantBaseline } = props;
      return (
        <text
          cx={cx}
          cy={cy}
          x={x}
          y={y}
          textAnchor={textAnchor}
          dominantBaseline={dominantBaseline}
          fill="hsl(var(--fg))">
          {payload.amount}
        </text>
      );
    };

    return (
      <div className="w-full md:w-[400px]">
        <Card className="items-center pb-0">
          <CardHeader>
            <CardTitle>Departmental Budget Allocation</CardTitle>
            <CardDescription>Jan - Jun 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]">
              <PieChart>
                <ChartTooltip
                  content={<ChartTooltipContent nameKey="amount" hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="amount"
                  labelLine={false}
                  nameKey="category"
                  label={CustomPieLabel}
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

const CustomActiveShape = (props: PieSectorDataItem) => {
  const { outerRadius = 0, ...rest } = props;
  return (
    <g>
      <Sector {...rest} outerRadius={outerRadius + 10} />
      <Sector
        {...rest}
        outerRadius={outerRadius + 25}
        innerRadius={outerRadius + 12}
      />
    </g>
  );
};

interface CustomControlledPieLabelProps {
  activeIndex: number;
  chartData: {
    month: string;
    sales: number;
  }[];
  viewBox?: {
    cx?: number;
    cy?: number;
  };
}

const CustomControlledPieLabel = (props: CustomControlledPieLabelProps) => {
  const { viewBox, chartData, activeIndex } = props;
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
          className="fill-fg text-2xl font-semibold">
          {chartData[activeIndex]?.sales.toLocaleString()}
        </tspan>
        <tspan
          x={viewBox.cx}
          y={(viewBox.cy ?? 0) + 24}
          className="fill-muted-fg">
          Visitors
        </tspan>
      </text>
    );
  }

  return null;
};

export const Controlled: Story = {
  render: function Render() {
    // Data for the chart
    const chartData = useMemo(
      () => [
        { month: "january", sales: 3186, fill: "var(--color-january)" },
        { month: "february", sales: 2305, fill: "var(--color-february)" },
        { month: "march", sales: 4237, fill: "var(--color-march)" },
        { month: "april", sales: 4173, fill: "var(--color-april)" },
        { month: "may", sales: 5209, fill: "var(--color-may)" },
      ],
      [],
    );
    // Configuration for the chart
    const chartConfig = {
      visitors: {
        label: "Visitors",
      },
      sales: {
        label: "Sales",
      },
      profit: {
        label: "Profit",
      },
      january: {
        label: "January",
        color: "hsl(var(--chart-1))",
      },
      february: {
        label: "February",
        color: "hsl(var(--chart-2))",
      },
      march: {
        label: "March",
        color: "hsl(var(--chart-3))",
      },
      april: {
        label: "April",
        color: "hsl(var(--chart-4))",
      },
      may: {
        label: "May",
        color: "hsl(var(--chart-5))",
      },
    } satisfies ChartConfig;

    const id = "pie-interactive";
    const [activeMonth, setActiveMonth] = useState<Key>(
      chartData[0]?.month ?? "january",
    );

    const activeIndex = useMemo(
      () => chartData.findIndex((item) => item.month === activeMonth),
      [activeMonth, chartData],
    );
    const months = useMemo(
      () => chartData.map((item) => item.month),
      [chartData],
    );

    return (
      <div className="w-full md:w-[400px]">
        <Card data-chart={id} className="flex flex-col">
          <ChartStyle id={id} config={chartConfig} />
          <CardHeader className="flex-row items-start space-y-0 pb-0">
            <div className="grid w-full gap-1">
              <CardTitle className="capitalize">{activeMonth}</CardTitle>
              <CardDescription>
                The total sales for the month is{" "}
                <strong className="font-semibold">
                  {chartData[activeIndex]?.sales.toLocaleString()}
                </strong>
              </CardDescription>
            </div>
            <Select
              selectedKey={activeMonth}
              onSelectionChange={setActiveMonth}>
              <SelectTrigger
                className="ml-auto h-8 w-[130px] rounded-lg px-2"
                aria-label="Select a value"
              />
              <SelectList className="rounded-xl">
                {months.map((key) => {
                  const _config = chartConfig[key as keyof typeof chartConfig];

                  return (
                    <SelectOption key={key} id={key}>
                      <div className="flex items-center gap-2 text-xs">
                        {_config.label}
                      </div>
                    </SelectOption>
                  );
                })}
              </SelectList>
            </Select>
          </CardHeader>
          <CardContent className="flex flex-1 justify-center pb-0">
            <ChartContainer
              id={id}
              config={chartConfig}
              className="mx-auto aspect-square w-full max-w-[315px]">
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="sales"
                  nameKey="month"
                  innerRadius={60}
                  strokeWidth={5}
                  activeIndex={activeIndex}
                  activeShape={<CustomActiveShape />}>
                  <Label
                    content={
                      <CustomControlledPieLabel
                        chartData={chartData}
                        activeIndex={activeIndex}
                      />
                    }
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const PieLabel: Story = {
  render: function Render() {
    // Data for the chart
    const chartData = [
      { category: "Electronics", sales: 275, fill: "var(--color-electronics)" },
      { category: "Clothing", sales: 200, fill: "var(--color-clothing)" },
      { category: "Groceries", sales: 187, fill: "var(--color-groceries)" },
      { category: "Furniture", sales: 173, fill: "var(--color-furniture)" },
      { category: "Books", sales: 90, fill: "var(--color-books)" },
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
      clothing: {
        label: "Clothing",
        color: "hsl(var(--chart-2))",
      },
      groceries: {
        label: "Groceries",
        color: "hsl(var(--chart-3))",
      },
      furniture: {
        label: "Furniture",
        color: "hsl(var(--chart-4))",
      },
      books: {
        label: "Books",
        color: "hsl(var(--chart-5))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card>
          <CardHeader>
            <CardTitle>Sales Allocation by Category</CardTitle>
            <CardDescription>Jan - Jun 2024</CardDescription>
          </CardHeader>

          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-fg">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={chartData}
                  dataKey="sales"
                  label
                  nameKey="category"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const PieLabelList: Story = {
  render: function Render() {
    // Data for the chart
    const chartData = [
      { manufacturer: "Tesla", marketShare: 500, fill: "var(--color-tesla)" },
      { manufacturer: "Rivian", marketShare: 150, fill: "var(--color-rivian)" },
      { manufacturer: "Ford", marketShare: 200, fill: "var(--color-ford)" },
      {
        manufacturer: "Lucid Motors",
        marketShare: 120,
        fill: "var(--color-lucid)",
      },
      { manufacturer: "Others", marketShare: 80, fill: "var(--color-others)" },
    ];

    // Configuration for the chart
    const chartConfig = {
      marketShare: {
        label: "Market Share",
      },
      tesla: {
        label: "Tesla",
        color: "hsl(var(--chart-1))",
      },
      rivian: {
        label: "Rivian",
        color: "hsl(var(--chart-2))",
      },
      ford: {
        label: "Ford",
        color: "hsl(var(--chart-3))",
      },
      lucid: {
        label: "Lucid Motors",
        color: "hsl(var(--chart-4))",
      },
      others: {
        label: "Others",
        color: "hsl(var(--chart-5))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card>
          <CardHeader>
            <CardTitle>EV Market Share by Manufacturer</CardTitle>
            <CardDescription>Jan - Jun 2024</CardDescription>
          </CardHeader>

          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-fg">
              <PieChart>
                <ChartTooltip
                  content={
                    <ChartTooltipContent nameKey="marketShare" hideLabel />
                  }
                />
                <Pie data={chartData} dataKey="marketShare">
                  <LabelList
                    dataKey="manufacturer"
                    className="fill-bg"
                    stroke="none"
                    fontSize={12}
                    formatter={(value: string) => value}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const PieLegend: Story = {
  render: function Render() {
    // Data for the chart
    const chartData = [
      { region: "tesla", visitors: 275, fill: "var(--color-tesla)" },
      { region: "rivian", visitors: 200, fill: "var(--color-rivian)" },
      { region: "ford", visitors: 187, fill: "var(--color-ford)" },
      { region: "lucid", visitors: 173, fill: "var(--color-lucid)" },
      { region: "other", visitors: 90, fill: "var(--color-other)" },
    ];

    // Configuration for the chart
    const chartConfig = {
      visitors: {
        label: "Visitors",
      },
      tesla: {
        label: "Tesla",
        color: "hsl(var(--chart-1))",
      },
      rivian: {
        label: "Rivian",
        color: "hsl(var(--chart-2))",
      },
      ford: {
        label: "Ford",
        color: "hsl(var(--chart-3))",
      },
      lucid: {
        label: "Lucid",
        color: "hsl(var(--chart-4))",
      },
      other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card>
          <CardHeader className="items-center pb-0">
            <CardTitle>EV Market</CardTitle>
            <CardDescription>
              Showing total visitors for the first half of 2024 by region
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-fg">
              <PieChart>
                <Pie data={chartData} dataKey="visitors" />
                <ChartLegend
                  content={<ChartLegendContent nameKey="region" />}
                  className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const NoneSeparator: Story = {
  render: function Render() {
    // Data for the chart
    const chartData = [
      { manufacturer: "Tesla", marketShare: 275, fill: "var(--color-tesla)" },
      { manufacturer: "Rivian", marketShare: 200, fill: "var(--color-rivian)" },
      { manufacturer: "Ford", marketShare: 187, fill: "var(--color-ford)" },
      {
        manufacturer: "Lucid Motors",
        marketShare: 173,
        fill: "var(--color-lucid)",
      },
      { manufacturer: "Others", marketShare: 90, fill: "var(--color-others)" },
    ];

    // Configuration for the chart
    const chartConfig = {
      marketShare: {
        label: "Market Share",
      },
      tesla: {
        label: "Tesla",
        color: "hsl(var(--chart-1))",
      },
      rivian: {
        label: "Rivian",
        color: "hsl(var(--chart-2))",
      },
      ford: {
        label: "Ford",
        color: "hsl(var(--chart-3))",
      },
      lucid: {
        label: "Lucid Motors",
        color: "hsl(var(--chart-4))",
      },
      others: {
        label: "Others",
        color: "hsl(var(--chart-5))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card>
          <CardHeader className="items-center pb-0">
            <CardTitle>Market Share</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>

          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-fg">
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="marketShare"
                  nameKey="manufacturer"
                  stroke="0"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const Stacked: Story = {
  render: function Render() {
    // Data for the chart
    const chartData = [
      {
        region: "North America",
        sales: 500,
        fill: "var(--color-north-america)",
      },
      { region: "Europe", sales: 300, fill: "var(--color-europe)" },
      { region: "Asia", sales: 400, fill: "var(--color-asia)" },
      { region: "Africa", sales: 150, fill: "var(--color-africa)" },
      {
        region: "South America",
        sales: 100,
        fill: "var(--color-south-america)",
      },
    ];

    // Configuration for the chart
    const chartConfig = {
      sales: {
        label: "Sales",
      },
      northAmerica: {
        label: "North America",
        color: "hsl(var(--chart-1))",
      },
      europe: {
        label: "Europe",
        color: "hsl(var(--chart-2))",
      },
      asia: {
        label: "Asia",
        color: "hsl(var(--chart-3))",
      },
      africa: {
        label: "Africa",
        color: "hsl(var(--chart-4))",
      },
      southAmerica: {
        label: "South America",
        color: "hsl(var(--chart-5))",
      },
    } satisfies ChartConfig;

    return (
      <div className="w-full md:w-[400px]">
        <Card>
          <CardHeader className="items-center pb-0">
            <CardTitle>Sales Distribution by Region</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>

          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-fg">
              <PieChart>
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      labelKey="sales"
                      nameKey="region"
                      indicator="line"
                      labelFormatter={(_, payload) => {
                        return chartConfig[
                          payload[0]?.dataKey as keyof typeof chartConfig
                        ].label;
                      }}
                    />
                  }
                />
                <Pie data={chartData} dataKey="sales" outerRadius={60} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  },
};
