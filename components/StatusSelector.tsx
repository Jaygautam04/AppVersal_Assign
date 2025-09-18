"use client"

import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Users, Coffee, Video, WifiOff } from "lucide-react"
import { cn } from "../lib/utils"

interface StatusSelectorProps {
  currentStatus: "working" | "break" | "meeting" | "offline"
  onStatusChange: (status: "working" | "break" | "meeting" | "offline") => void
}

const statusOptions = [
  {
    value: "working" as const,
    label: "Working",
    icon: Users,
    color: "text-green-400",
    bgColor: "bg-green-500/20",
    hoverColor: "hover:bg-green-500/30",
    borderColor: "border-green-500/30",
  },
  {
    value: "meeting" as const,
    label: "Meeting",
    icon: Video,
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
    hoverColor: "hover:bg-blue-500/30",
    borderColor: "border-blue-500/30",
  },
  {
    value: "break" as const,
    label: "Break",
    icon: Coffee,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/20",
    hoverColor: "hover:bg-yellow-500/30",
    borderColor: "border-yellow-500/30",
  },
  {
    value: "offline" as const,
    label: "Offline",
    icon: WifiOff,
    color: "text-gray-400",
    bgColor: "bg-gray-500/20",
    hoverColor: "hover:bg-gray-500/30",
    borderColor: "border-gray-500/30",
  },
]

export function StatusSelector({ currentStatus, onStatusChange }: StatusSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-muted-foreground">Current:</span>
        <Badge
          variant="outline"
          className={cn(
            statusOptions.find((opt) => opt.value === currentStatus)?.color,
            statusOptions.find((opt) => opt.value === currentStatus)?.borderColor,
            "border",
          )}
        >
          <div
            className={cn("w-2 h-2 rounded-full mr-1", {
              "bg-green-400": currentStatus === "working",
              "bg-yellow-400": currentStatus === "break",
              "bg-blue-400": currentStatus === "meeting",
              "bg-gray-400": currentStatus === "offline",
            })}
          />
          {statusOptions.find((opt) => opt.value === currentStatus)?.label}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {statusOptions.map(({ value, label, icon: Icon, color, bgColor, hoverColor, borderColor }) => (
          <Button
            key={value}
            variant="outline"
            className={cn(
              "h-auto p-3 flex flex-col items-center gap-2 transition-all",
              currentStatus === value
                ? `${bgColor} ${borderColor} ${color} border`
                : `hover:${bgColor} ${hoverColor} border-border`,
              "text-center",
            )}
            onClick={() => onStatusChange(value)}
          >
            <Icon className={cn("h-4 w-4", currentStatus === value ? color : "text-muted-foreground")} />
            <span className={cn("text-xs font-medium", currentStatus === value ? color : "text-muted-foreground")}>
              {label}
            </span>
          </Button>
        ))}
      </div>
    </div>
  )
}
