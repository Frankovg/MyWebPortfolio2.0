"use client";

import { useMemo } from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

import type { Role } from "@/generated/prisma/client";

function ProjectChart({ roles }: { roles: Role[] }) {
  const chartData = useMemo(() => {
    return roles.map((role) => ({
      rol: role.value,
      percentage: role.percentage,
      fill: "#5cedc1",
    }));
  }, [roles]);

  const chartConfig = useMemo(() => {
    const config: ChartConfig = {
      percentage: {
        label: "Percentage",
      },
    };
    chartData.forEach((item) => {
      const roleFromData = roles.find((role) => role.value === item.rol);
      if (roleFromData) {
        config[item.rol] = {
          label: roleFromData.label,
        };
      }
    });
    return config;
  }, [chartData, roles]);

  return (
    <Card className="w-full 930:w-1/2 border-none">
      <CardHeader>
        <CardTitle className="text-white">Responsibilities</CardTitle>
        <CardDescription>
          My role during all the project lifetime
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              className="w-full"
              dataKey="rol"
              type="category"
              tickLine={false}
              tickMargin={10}
              width={100}
              axisLine={false}
              tickFormatter={(value) =>
                String(
                  chartConfig[value as keyof typeof chartConfig]?.label ?? ""
                )
              }
              stroke="#ffffffb3"
            />
            <XAxis dataKey="percentage" type="number" stroke="#ffffffb3" />
            <Bar dataKey="percentage" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default ProjectChart;
