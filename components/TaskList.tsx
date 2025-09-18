"use client"

import { useState } from "react"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import { Badge } from "./ui/badge"
import { CheckCircle2, Circle, Clock, Plus, Minus } from "lucide-react"
import { format, isAfter, isToday, isTomorrow } from "date-fns"
import { cn } from "../lib/utils"

interface Task {
  id: number
  title: string
  dueDate: string
  progress: number
}

interface TaskListProps {
  tasks: Task[]
  onProgressUpdate: (taskId: number, progress: number) => void
}

export function TaskList({ tasks, onProgressUpdate }: TaskListProps) {
  const [expandedTask, setExpandedTask] = useState<number | null>(null)

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString)
    if (isToday(date)) return "Today"
    if (isTomorrow(date)) return "Tomorrow"
    return format(date, "MMM d, yyyy")
  }

  const getDueDateColor = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()

    if (isToday(date)) return "text-red-400"
    if (isTomorrow(date)) return "text-yellow-400"
    if (isAfter(now, date)) return "text-red-500"
    return "text-muted-foreground"
  }

  const handleProgressChange = (taskId: number, delta: number) => {
    const task = tasks.find((t) => t.id === taskId)
    if (task) {
      const newProgress = Math.max(0, Math.min(100, task.progress + delta))
      onProgressUpdate(taskId, newProgress)
    }
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <CheckCircle2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No tasks assigned yet</p>
        <p className="text-sm">Tasks assigned by your team lead will appear here</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => {
        const isCompleted = task.progress === 100
        const isExpanded = expandedTask === task.id

        return (
          <Card
            key={task.id}
            className={cn(
              "transition-all duration-200",
              isCompleted && "bg-green-500/5 border-green-500/20",
              isExpanded && "ring-1 ring-primary/20",
            )}
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Task header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-1">
                      {isCompleted ? (
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4
                        className={cn("font-medium", isCompleted ? "text-green-400 line-through" : "text-foreground")}
                      >
                        {task.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className={cn("text-xs", getDueDateColor(task.dueDate))}>
                          Due {formatDueDate(task.dueDate)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Badge
                    variant="outline"
                    className={cn(
                      isCompleted ? "text-green-400 border-green-400/30" : "text-blue-400 border-blue-400/30",
                    )}
                  >
                    {task.progress}%
                  </Badge>
                </div>

                {/* Progress bar */}
                <div className="space-y-2">
                  <Progress value={task.progress} className={cn("h-2", isCompleted && "[&>div]:bg-green-400")} />

                  {/* Progress controls */}
                  {!isCompleted && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 w-6 p-0 bg-transparent"
                          onClick={() => handleProgressChange(task.id, -10)}
                          disabled={task.progress <= 0}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 w-6 p-0 bg-transparent"
                          onClick={() => handleProgressChange(task.id, 10)}
                          disabled={task.progress >= 100}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 px-2 text-xs bg-transparent"
                          onClick={() => handleProgressChange(task.id, -task.progress)}
                          disabled={task.progress <= 0}
                        >
                          Reset
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 px-2 text-xs bg-transparent"
                          onClick={() => handleProgressChange(task.id, 100 - task.progress)}
                          disabled={task.progress >= 100}
                        >
                          Complete
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
