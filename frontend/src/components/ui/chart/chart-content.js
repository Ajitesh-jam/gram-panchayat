"use client"
import { useChartConfig } from "./chart-container"
import { cn } from "@/lib/utils"

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

