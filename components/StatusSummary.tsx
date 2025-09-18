"use client"

import { useTeam } from "../contexts/TeamContext"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Users, Coffee, Video, WifiOff } from "lucide-react"

export function StatusSummary() {
  const { state } = useTeam()
  const { members } = state

  const statusCounts = members.reduce(
    (acc, member) => {
      acc[member.status] = (acc[member.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const statusCards = [
    {
      status: "working",
      label: "Working",
      count: statusCounts.working || 0,
      icon: Users,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
    },
    {
      status: "meeting",
      label: "In Meeting",
      count: statusCounts.meeting || 0,
      icon: Video,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      status: "break",
      label: "On Break",
      count: statusCounts.break || 0,
      icon: Coffee,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20",
    },
    {
      status: "offline",
      label: "Offline",
      count: statusCounts.offline || 0,
      icon: WifiOff,
      color: "text-gray-400",
      bgColor: "bg-gray-500/10",
      borderColor: "border-gray-500/20",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statusCards.map(({ status, label, count, icon: Icon, color, bgColor, borderColor }) => (
        <Card key={status} className={`${bgColor} ${borderColor} border`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
            <Icon className={`h-4 w-4 ${color}`} />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className={`text-2xl font-bold ${color}`}>{count}</div>
              <Badge variant="outline" className={`${color} border-current`}>
                {count === 1 ? "member" : "members"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
