"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useMemo } from "react";
import { ICategoryWithProjectsAdmin } from "@/lib/types";

export const description = "A bar chart with a custom label";

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ];

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//   },
//   mobile: {
//     label: "Mobile",
//   },
//   label: {
//     color: "#000000",
//   },
// } satisfies ChartConfig;

export function PortfolioChart({
  categories,
}: {
  categories: ICategoryWithProjectsAdmin[];
}) {
  const chartData = useMemo(() => {
    return categories.map((category) => ({
      category: category.value,
      quantity: category.projects.length,
      fill: "#5cedc1",
    }));
  }, [categories]);

  const chartConfig = useMemo(() => {
    const config: ChartConfig = {
      quantity: {
        label: "Quantity",
      },
    };
    categories.forEach((item) => {
      config[item.value] = {
        label: item.name,
      };
    });
    return config;
  }, [chartData, categories]);

  return (
    <Card className="border-darkPrimary border-2 rounded-md w-full max-w-lg">
      <CardHeader>
        <CardTitle>Shared projects</CardTitle>
        <CardDescription>Uploaded projects in the platform</CardDescription>
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
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="quantity" type="number" hide />
            <Bar dataKey="quantity" layout="vertical" fill="#5cedc1" radius={5}>
              <LabelList
                dataKey="category"
                position="insideLeft"
                offset={8}
                className="fill-background"
                fontWeight="bold"
                fontSize={12}
              />
              <LabelList
                dataKey="quantity"
                position="right"
                offset={8}
                className="fill-textPrimary"
                fontWeight="bold"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
