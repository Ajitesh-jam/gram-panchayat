"use client"

import { useState, useEffect } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Sector, Legend } from "recharts"
import styles from "./pie_chart.module.css"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props

  return (
    <g>
      <text x={cx} y={cy} dy={-20} textAnchor="middle" className={styles.label}>
        {payload.name}
      </text>
      <text x={cx} y={cy} dy={10} textAnchor="middle" className={styles.value}>
        {value}
      </text>
      <text x={cx} y={cy} dy={30} textAnchor="middle" className={styles.percent}>
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  )
}

export default function AnimatedPieChart({ data = [] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animatedData, setAnimatedData] = useState([])

  useEffect(() => {
    // Reset animation when data changes
    setAnimatedData([])

    // Animate data appearing one by one
    const timer = setTimeout(() => {
      data.forEach((entry, index) => {
        setTimeout(() => {
          setAnimatedData((prev) => [...prev, entry])
        }, index * 200)
      })
    }, 300)

    return () => clearTimeout(timer)
  }, [data])

  const onPieEnter = (_, index) => {
    setActiveIndex(index)
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Animated Pie Chart</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={animatedData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            dataKey="value"
            onMouseEnter={onPieEnter}
            className={styles.pie}
            animationBegin={0}
            animationDuration={800}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperClassName={styles.legend} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

