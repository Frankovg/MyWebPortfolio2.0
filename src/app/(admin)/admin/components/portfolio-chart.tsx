"use client";

import { useMemo } from "react";
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
import { ICategoryWithProjectsAdmin } from "@/lib/types";

export const description = "A bar chart with a custom label";

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
        color: "whiteText",
      };
    });
    return config;
  }, [chartData, categories]);

  const totalProjects = useMemo(() => {
    return categories.reduce(
      (acc, category) => acc + category.projects.length,
      0
    );
  }, [categories]);

  return (
    <Card className="border-darkPrimary border-2 rounded-md w-full h-full">
      <CardHeader>
        <CardTitle>Projects per category</CardTitle>
        <CardDescription>
          Total projects:{" "}
          <span className="font-semibold text-lg">{totalProjects}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 40,
            }}
          >
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={5}
              axisLine={false}
              tickFormatter={(value) =>
                (chartConfig[value as keyof typeof chartConfig]
                  ?.label as string) ?? ""
              }
            />
            <XAxis dataKey="quantity" type="number" hide />
            <Bar dataKey="quantity" layout="vertical" fill="#5cedc1" radius={5}>
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
        <div className="text-muted-foreground leading-none">
          *This chart includes hidden projects
        </div>
      </CardFooter>
    </Card>
  );
}
