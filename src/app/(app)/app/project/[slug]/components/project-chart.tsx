"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Role } from "@prisma/client"
import { useMemo } from "react"

function ProjectChart({ roles }: { roles: Role[] }) {
  const chartData = useMemo(() => {
    return roles.map((role) => (
      {
        rol: role.value,
        percentage: role.percentage,
        fill: "#5cedc1"
      }
    ))
  }, [roles])

  const chartConfig = useMemo(() => {
    const config: ChartConfig = {
      percentage: {
        label: "Percentage",
      }
    }
    chartData.forEach((item) => {
      const roleFromData = roles.find(role => role.value === item.rol)
      if (roleFromData) {
        config[item.rol] = {
          label: roleFromData.label
        }
      }
    })
    return config
  }, [chartData, roles])

  return (
    <Card className="w-full 930:w-1/2 border-none">
      <CardHeader>
        <CardTitle className="text-white">Responsibilities</CardTitle>
        <CardDescription>January 2023 - Present</CardDescription>
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
                String(chartConfig[value as keyof typeof chartConfig]?.label ?? '')
              }
              stroke="#ffffffb3"
            />
            <XAxis
              dataKey="percentage"
              type="number"
              stroke="#ffffffb3"
            />
            <Bar dataKey="percentage" layout="vertical" radius={5} />
          </BarChart >
        </ChartContainer >
      </CardContent >
    </Card >

  )
}

export default ProjectChart