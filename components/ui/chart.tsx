"use client"

import type * as React from "react"
import { Line, Bar, Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
  defaults,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

defaults.font.family = "var(--font-sans)"
defaults.color = "hsl(var(--muted-foreground))"

interface ChartProps {
  data: ChartData<any, any, any>
  options?: ChartOptions<any>
  className?: string
}

export function ChartTooltip({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`rounded-lg border bg-background p-2 shadow-md ${className}`} {...props} />
}

export function ChartLegend({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`flex gap-2 ${className}`} {...props} />
}

export function ChartLegendItem({
  className,
  color,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { color: string }) {
  return (
    <div className={`flex items-center gap-1 text-sm ${className}`} {...props}>
      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      {props.children}
    </div>
  )
}

export function LineChart({ data, options, className }: ChartProps) {
  return (
    <div className={className}>
      <Line
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: "index",
            intersect: false,
          },
          plugins: {
            legend: {
              display: true,
              position: "top",
              labels: {
                boxWidth: 10,
                boxHeight: 10,
                usePointStyle: true,
                pointStyle: "circle",
              },
            },
            tooltip: {
              enabled: true,
              backgroundColor: "hsl(var(--background))",
              titleColor: "hsl(var(--foreground))",
              bodyColor: "hsl(var(--foreground))",
              borderColor: "hsl(var(--border))",
              borderWidth: 1,
              padding: 8,
              boxPadding: 4,
              usePointStyle: true,
              callbacks: {
                labelPointStyle: () => ({
                  pointStyle: "circle",
                  rotation: 0,
                }),
              },
            },
          },
          scales: {
            x: {
              grid: {
                color: "hsl(var(--border))",
              },
              border: {
                color: "hsl(var(--border))",
              },
              ticks: {
                color: "hsl(var(--muted-foreground))",
              },
            },
            y: {
              grid: {
                color: "hsl(var(--border))",
              },
              border: {
                color: "hsl(var(--border))",
              },
              ticks: {
                color: "hsl(var(--muted-foreground))",
              },
            },
          },
          ...options,
        }}
      />
    </div>
  )
}

export function BarChart({ data, options, className }: ChartProps) {
  return (
    <div className={className}>
      <Bar
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: "index",
            intersect: false,
          },
          plugins: {
            legend: {
              display: true,
              position: "top",
              labels: {
                boxWidth: 10,
                boxHeight: 10,
                usePointStyle: true,
                pointStyle: "circle",
              },
            },
            tooltip: {
              enabled: true,
              backgroundColor: "hsl(var(--background))",
              titleColor: "hsl(var(--foreground))",
              bodyColor: "hsl(var(--foreground))",
              borderColor: "hsl(var(--border))",
              borderWidth: 1,
              padding: 8,
              boxPadding: 4,
              usePointStyle: true,
              callbacks: {
                labelPointStyle: () => ({
                  pointStyle: "circle",
                  rotation: 0,
                }),
              },
            },
          },
          scales: {
            x: {
              grid: {
                color: "hsl(var(--border))",
              },
              border: {
                color: "hsl(var(--border))",
              },
              ticks: {
                color: "hsl(var(--muted-foreground))",
              },
            },
            y: {
              grid: {
                color: "hsl(var(--border))",
              },
              border: {
                color: "hsl(var(--border))",
              },
              ticks: {
                color: "hsl(var(--muted-foreground))",
              },
            },
          },
          ...options,
        }}
      />
    </div>
  )
}

export function PieChart({ data, options, className }: ChartProps) {
  return (
    <div className={className}>
      <Pie
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "right",
              labels: {
                boxWidth: 10,
                boxHeight: 10,
                usePointStyle: true,
                pointStyle: "circle",
              },
            },
            tooltip: {
              enabled: true,
              backgroundColor: "hsl(var(--background))",
              titleColor: "hsl(var(--foreground))",
              bodyColor: "hsl(var(--foreground))",
              borderColor: "hsl(var(--border))",
              borderWidth: 1,
              padding: 8,
              boxPadding: 4,
              usePointStyle: true,
              callbacks: {
                labelPointStyle: () => ({
                  pointStyle: "circle",
                  rotation: 0,
                }),
              },
            },
          },
          ...options,
        }}
      />
    </div>
  )
}
