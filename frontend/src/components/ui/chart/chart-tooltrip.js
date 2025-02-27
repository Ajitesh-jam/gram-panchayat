"use client"

import { forwardRef } from "react"
import { Tooltip as RechartsTooltip } from "recharts"

/**
 * Custom tooltip component for Recharts
 */
export const ChartTooltip = forwardRef(({ content, cursor = true, offset = 10, ...props }, ref) => {
  return <RechartsTooltip ref={ref} content={content} cursor={cursor} offset={offset} {...props} />
})

ChartTooltip.displayName = "ChartTooltip"

