import { Badge } from "./ui/badge"
import { cn } from "../lib/utils"

interface StatusBadgeProps {
  status: "working" | "break" | "meeting" | "offline"
  className?: string
}

const statusConfig = {
  working: {
    label: "Working",
    className: "bg-green-500/20 text-green-400 border-green-500/30",
  },
  break: {
    label: "Break",
    className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  },
  meeting: {
    label: "Meeting",
    className: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  offline: {
    label: "Offline",
    className: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <Badge variant="outline" className={cn(config.className, className)}>
      <div
        className={cn("w-2 h-2 rounded-full mr-1", {
          "bg-green-400": status === "working",
          "bg-yellow-400": status === "break",
          "bg-blue-400": status === "meeting",
          "bg-gray-400": status === "offline",
        })}
      />
      {config.label}
    </Badge>
  )
}
