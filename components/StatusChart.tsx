"use client"

import { useTeam } from "../contexts/TeamContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { BarChart3 } from "lucide-react"

const COLORS = {
  working: "#4ade80", // green-400
  meeting: "#60a5fa", // blue-400
  break: "#facc15", // yellow-400
  offline: "#9ca3af", // gray-400
}

export function StatusChart() {
  const { state } = useTeam()
  const { members } = state

  const statusCounts = members.reduce(
    (acc, member) => {
      acc[member.status] = (acc[member.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const chartData = [
    { name: "Working", value: statusCounts.working || 0, color: COLORS.working },
    { name: "Meeting", value: statusCounts.meeting || 0, color: COLORS.meeting },
    { name: "Break", value: statusCounts.break || 0, color: COLORS.break },
    { name: "Offline", value: statusCounts.offline || 0, color: COLORS.offline },
  ].filter((item) => item.value > 0)

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0]
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">
            {data.name}: {data.value} {data.value === 1 ? "member" : "members"}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Status Distribution
        </CardTitle>
        <CardDescription>Visual breakdown of team member status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{
                  fontSize: "12px",
                  color: "hsl(var(--muted-foreground))",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
