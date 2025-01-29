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

const chartConfig = {
  percentage: {
    label: "Percentage",
  },
  frontEnd: {
    label: "Front-end",
  },
  projectLead: {
    label: "Project Lead",
  },
  uxUi: {
    label: "UX/UI",
  },
  devops: {
    label: "DevOps",
  },
  backEnd: {
    label: "Back-end",
  },
  dataSpecialist: {
    label: "Data Specialist",
  },
} satisfies ChartConfig

const chartData = [
  { rol: "frontEnd", percentage: 100, fill: "#5cedc2" },
  { rol: "projectLead", percentage: 100, fill: "#5cedc1" },
  { rol: "uxUi", percentage: 40, fill: "#5cedc1" },
  { rol: "devops", percentage: 3, fill: "#5cedc1" },
  { rol: "backEnd", percentage: 5, fill: "#5cedc1" },
  { rol: "dataSpecialist", percentage: 1, fill: "#5cedc1" },
]

function ProjectChart() {

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
                chartConfig[value as keyof typeof chartConfig]?.label
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