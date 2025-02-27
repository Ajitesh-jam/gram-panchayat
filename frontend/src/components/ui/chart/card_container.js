"use client"

import { createContext, useContext, useMemo } from "react"
import { cn } from "@/src/lib/utils"

// Create context for chart configuration
const ChartContext = createContext({})

/**
 * Provider component for chart configuration
 */
export function ChartContainer({ children, config = {}, className, ...props }) {
  // Process the config to extract colors and other properties
  const processedConfig = useMemo(() => {
    const style = {}
    const processedConfig = {}

    // Process each key in the config
    Object.entries(config).forEach(([key, value]) => {
      processedConfig[key] = value

      // Add color CSS variables if color is provided
      if (value.color) {
        style[`--color-${key}`] = value.color
      }

      // Add active color CSS variables if activeColor is provided
      if (value.activeColor) {
        style[`--color-${key}-active`] = value.activeColor
      }
    })

    return { style, config: processedConfig }
  }, [config])

  // Create context value
  const contextValue = useMemo(
    () => ({
      config: processedConfig.config,
    }),
    [processedConfig],
  )

  return (
    <ChartContext.Provider value={contextValue}>
      <div className={cn("relative", className)} style={processedConfig.style} {...props}>
        {children}
      </div>
    </ChartContext.Provider>
  )
}

/**
 * Hook to access chart configuration
 */
export function useChartConfig() {
  const context = useContext(ChartContext)

  if (!context) {
    throw new Error("useChartConfig must be used within a ChartContainer")
  }

  return context
}



/**
 * Custom tooltip content component
 */
export function ChartTooltipContent({
  active,
  payload,
  label,
  className,
  formatter,
  labelFormatter,
  hideLabel = false,
  ...props
}) {
  const { config } = useChartConfig()

  // Return null if not active or no payload
  if (!active || !payload || !payload.length) {
    return null
  }

  return (
    <div className={cn("rounded-lg border bg-background p-2 shadow-md", className)} {...props}>
      {!hideLabel && label && (
        <div className="mb-1 text-sm font-medium">{labelFormatter ? labelFormatter(label, payload) : label}</div>
      )}
      <div className="flex flex-col gap-1">
        {payload.map((item, index) => {
          // Skip items with no value
          if (!item.value && item.value !== 0) return null

          // Get config for this data key
          const itemConfig = config[item.dataKey]

          // Format the value if formatter is provided
          const formattedValue = formatter ? formatter(item.value, item.name, item, index) : item.value

          return (
            <div key={`item-${index}`} className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor: item.color || item.fill || itemConfig?.color || `var(--color-${item.dataKey})`,
                }}
              />
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium">{itemConfig?.label || item.name}:</span>
                <span className="text-xs">{formattedValue}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}



import { forwardRef } from "react"
import { Tooltip as RechartsTooltip } from "recharts"

/**
 * Custom tooltip component for Recharts
 */
export const ChartTooltip = forwardRef(({ content, cursor = true, offset = 10, ...props }, ref) => {
  return <RechartsTooltip ref={ref} content={content} cursor={cursor} offset={offset} {...props} />
})

ChartTooltip.displayName = "ChartTooltip"
