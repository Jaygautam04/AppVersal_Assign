"use client"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Card, CardContent } from "./ui/card"
import { StatusBadge } from "./StatusBadge"
import { Progress } from "./ui/progress"
import { Clock, CheckCircle2, Circle } from "lucide-react"
import { format } from "date-fns"

interface Member {
  id: number
  name: string
  email: string
  status: "working" | "break" | "meeting" | "offline"
  avatar: string
  tasks: Array<{
    id: number
    title: string
    dueDate: string
    progress: number
  }>
}

interface MemberCardProps {
  member: Member
  isLeadView?: boolean
}

export function MemberCard({ member, isLeadView = false }: MemberCardProps) {
  const activeTasks = member.tasks.filter((task) => task.progress < 100)
  const completedTasks = member.tasks.filter((task) => task.progress === 100)

  const avatarImages = [
    "/professional-headshot.png",
    "/professional-woman-headshot.png",
    "/professional-asian-man-headshot.png",
    "/professional-latina-woman-headshot.png",
  ]

  const avatarSrc = avatarImages[member.id % avatarImages.length]

  return (
    <Card className="hover:bg-accent/50 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Avatar and basic info */}
          <Avatar className="h-12 w-12">
            <AvatarImage src={avatarSrc || "/placeholder.svg"} alt={member.name} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-3">
            {/* Header with name and status */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.email}</p>
              </div>
              <StatusBadge status={member.status} />
            </div>

            {/* Task summary */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Circle className="h-3 w-3 text-blue-400" />
                <span className="text-muted-foreground">{activeTasks.length} active</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-green-400" />
                <span className="text-muted-foreground">{completedTasks.length} completed</span>
              </div>
            </div>

            {/* Recent tasks preview */}
            {isLeadView && activeTasks.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Active Tasks</p>
                {activeTasks.slice(0, 2).map((task) => (
                  <div key={task.id} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground truncate">{task.title}</span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {format(new Date(task.dueDate), "MMM d")}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={task.progress} className="flex-1 h-1" />
                      <span className="text-xs text-muted-foreground w-8">{task.progress}%</span>
                    </div>
                  </div>
                ))}
                {activeTasks.length > 2 && (
                  <p className="text-xs text-muted-foreground">+{activeTasks.length - 2} more tasks</p>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
