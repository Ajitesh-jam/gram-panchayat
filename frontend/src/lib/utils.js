/**
 * Combines multiple class names into a single string
 * This is a simplified version of the clsx/classnames utility
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}

