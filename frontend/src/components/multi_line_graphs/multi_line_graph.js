"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import styles from "./multiline.module.css"

export default function MultiLineGraph({ data = [], lines = [], xAxisKey = "name", title = "Multi-Line Graph" }) {
  const [animationIndex, setAnimationIndex] = useState(0)
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    // Reset animation when data changes
    setChartData([])
    setAnimationIndex(0)

    // Animate data points appearing gradually
    const interval = setInterval(() => {
      setAnimationIndex((prevIndex) => {
        const newIndex = prevIndex + 1
        if (newIndex <= data.length) {
          setChartData(data.slice(0, newIndex))
          return newIndex
        } else {
          clearInterval(interval)
          return prevIndex
        }
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  // Generate a unique key for each line
  const getLineKey = (line, index) => {
    return line.dataKey || `line-${index}`
  }

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.tooltip}>
          <p className={styles.tooltipLabel}>{`${label}`}</p>
          <div className={styles.tooltipContent}>
            {payload.map((entry, index) => (
              <div key={index} className={styles.tooltipItem}>
                <div className={styles.tooltipColor} style={{ backgroundColor: entry.color }} />
                <span className={styles.tooltipName}>{entry.name}: </span>
                <span className={styles.tooltipValue}>{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <ResponsiveContainer width="100%" height={400} className={styles.chartContainer}>
        <LineChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 10,
          }}
          className={styles.chart}
        >
          <CartesianGrid strokeDasharray="3 3" className={styles.grid} />
          <XAxis dataKey={xAxisKey} tick={{ fontSize: 12 }} tickMargin={10} className={styles.axis} />
          <YAxis tick={{ fontSize: 12 }} tickMargin={10} className={styles.axis} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: "10px" }} className={styles.legend} />
          {lines.map((line, index) => (
            <Line
              key={getLineKey(line, index)}
              type="monotone"
              dataKey={line.dataKey}
              name={line.name || line.dataKey}
              stroke={line.color || `#${Math.floor(Math.random() * 16777215).toString(16)}`}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
              isAnimationActive={true}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

