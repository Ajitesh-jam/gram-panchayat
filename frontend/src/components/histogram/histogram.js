"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data
const data = [
  { name: "Q1", value: 4000 },
  { name: "Q2", value: 3000 },
  { name: "Q3", value: 2000 },
  { name: "Q4", value: 2780 },
  { name: "Q5", value: 1890 },
  { name: "Q6", value: 2390 },
  { name: "Q7", value: 3490 },
]

export default function AnimatedHistogram() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <div className="w-full p-4 bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-4 text-center dark:text-white">Quarterly Performance Histogram</h2>
      <ChartContainer
        config={{
          value: {
            label: "Revenue",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="h-[300px] w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            onMouseMove={(state) => {
              if (state.activeTooltipIndex !== undefined) {
                setActiveIndex(state.activeTooltipIndex)
              }
            }}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="name" tick={{ fill: "var(--color-text-primary)" }} />
            <YAxis tick={{ fill: "var(--color-text-primary)" }} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} className="transition-all duration-300">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === activeIndex ? "var(--color-value-active)" : "var(--color-value)"}
                  className="transition-all duration-300"
                  style={{
                    filter: index === activeIndex ? "brightness(1.2) drop-shadow(0 0 6px rgba(0, 0, 0, 0.2))" : "none",
                    transform: index === activeIndex ? "scaleY(1.05)" : "scaleY(1)",
                    transformOrigin: "bottom",
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}

