"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

const AreaGraph= ({
  data,
  width = 800,
  height = 400,
  color = "#3b82f6",
  gradientFrom = "rgba(59, 130, 246, 0.5)",
  gradientTo = "rgba(59, 130, 246, 0)",
  animationDuration = 1.5,
  showGrid = true,
  showLabels = true,
  title,
  className = "",
}) => {
  const svgRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width, height })
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true on component mount
  useEffect(() => {
    setIsClient(true)

    const handleResize = () => {
      if (svgRef.current) {
        const { width } = svgRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [height])

  // Calculate scales and paths
  const padding = { top: 40, right: 30, bottom: 50, left: 60 }
  const graphWidth = dimensions.width - padding.left - padding.right
  const graphHeight = dimensions.height - padding.top - padding.bottom

  // Find min and max values
  const yValues = data.map((d) => d.y)
  const xValues = data.map((d, i) => (typeof d.x === "number" ? d.x : i))

  const minY = Math.min(0, ...yValues) // Ensure 0 is included
  const maxY = Math.max(...yValues) * 1.1 // Add 10% padding
  const minX = Math.min(...xValues)
  const maxX = Math.max(...xValues)

  // Scale functions
  const xScale = (x) => (((typeof x === "number" ? x : 0) - minX) / (maxX - minX)) * graphWidth

  const yScale = (y) => graphHeight - ((y - minY) / (maxY - minY)) * graphHeight

  // Generate path
  const generatePath = () => {
    let path = `M ${padding.left + xScale(typeof data[0].x? (data[0].x ) : 0)} ${padding.top + yScale(data[0].y)}`

    for (let i = 1; i < data.length; i++) {
      const x = typeof data[i].x === "number" ? (data[i].x ) : i
      path += ` L ${padding.left + xScale(x)} ${padding.top + yScale(data[i].y)}`
    }

    return path
  }

  // Generate area path (path + bottom border + back to start)
  const generateAreaPath = () => {
    let path = generatePath()

    // Add bottom line
    const lastIndex = data.length - 1
    const lastX = typeof data[lastIndex].x === "number" ? (data[lastIndex].x ) : lastIndex

    path += ` L ${padding.left + xScale(lastX)} ${padding.top + graphHeight}`
    path += ` L ${padding.left + xScale(typeof data[0].x === "number" ? (data[0].x ) : 0)} ${padding.top + graphHeight}`
    path += " Z" // Close the path

    return path
  }

  // Generate grid lines
  const generateYGridLines = () => {
    const count = 5
    const lines = []

    for (let i = 0; i <= count; i++) {
      const y = minY + (i / count) * (maxY - minY)
      const scaledY = padding.top + yScale(y)

      lines.push(
        <React.Fragment key={`grid-y-${i}`}>
          {showGrid && (
            <line
              x1={padding.left}
              y1={scaledY}
              x2={dimensions.width - padding.right}
              y2={scaledY}
              stroke="#e5e7eb"
              strokeDasharray="5,5"
            />
          )}
          {showLabels && (
            <text
              x={padding.left - 10}
              y={scaledY}
              textAnchor="end"
              dominantBaseline="middle"
              className="text-xs fill-gray-500"
            >
              {Math.round(y * 100) / 100}
            </text>
          )}
        </React.Fragment>,
      )
    }

    return lines
  }

  const generateXLabels = () => {
    const labels = []
    const step = Math.max(1, Math.floor(data.length / 6)) // Show max 6 labels

    for (let i = 0; i < data.length; i += step) {
      const x = typeof data[i].x === "number" ? (data[i].x ) : i
      const label = data[i].label || data[i].x.toString()

      labels.push(
        <text
          key={`label-x-${i}`}
          x={padding.left + xScale(x)}
          y={dimensions.height - padding.bottom / 2}
          textAnchor="middle"
          className="text-xs fill-gray-500"
        >
          {label}
        </text>,
      )
    }

    return labels
  }

  // Animation variants
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: animationDuration, ease: "easeInOut" },
        opacity: { duration: 0.3 },
      },
    },
  }

  const areaVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: animationDuration * 0.8,
        duration: animationDuration * 0.5,
      },
    },
  }

  // Don't render on server
  if (!isClient) {
    return <div className={`w-full h-[${height}px] bg-gray-50 animate-pulse ${className}`}></div>
  }

  return (
    <div className={`relative w-full ${className}`}>
      {title && <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>}
      <svg
        ref={svgRef}
        width="100%"
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        className="overflow-visible"
      >
        {/* Gradient definition */}
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={gradientFrom} />
            <stop offset="100%" stopColor={gradientTo} />
          </linearGradient>
        </defs>

        {/* Grid lines and labels */}
        {generateYGridLines()}
        {showLabels && generateXLabels()}

        {/* X and Y axis */}
        <line
          x1={padding.left}
          y1={padding.top + graphHeight}
          x2={dimensions.width - padding.right}
          y2={padding.top + graphHeight}
          stroke="#9ca3af"
        />
        <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + graphHeight} stroke="#9ca3af" />

        {/* Area fill */}
        <motion.path
          d={generateAreaPath()}
          fill="url(#areaGradient)"
          initial="hidden"
          animate="visible"
          variants={areaVariants}
        />

        {/* Line */}
        <motion.path
          d={generatePath()}
          fill="none"
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial="hidden"
          animate="visible"
          variants={pathVariants}
        />

        {/* Data points */}
        {data.map((point, i) => {
          const x = typeof point.x === "number" ? point.x : i
          return (
            <motion.circle
              key={`point-${i}`}
              cx={padding.left + xScale(x)}
              cy={padding.top + yScale(point.y)}
              r={4}
              fill="white"
              stroke={color}
              strokeWidth={2}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: animationDuration + i * 0.05, duration: 0.3 }}
            />
          )
        })}
      </svg>
    </div>
  )
}

export default AreaGraph

