"use client"

import { useTeam } from "../contexts/TeamContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { StatusSelector } from "./StatusSelector"
import { TaskList } from "./TaskList"
import { StatusChart } from "./StatusChart"
import { UserReportCard } from "./UserReportCard"
import { Progress } from "./ui/progress"
import { User, CheckCircle2, Clock, TrendingUp, Target } from "lucide-react"

export function TeamMemberDashboard() {
  const { state, dispatch } = useTeam()
  const { members } = state

  // For demo purposes, using first member as current user
  const currentMember = members[0] // John Doe

  if (!currentMember) {
    return (
      <div className="text-center py-12">
        <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">Member data not found</p>
      </div>
    )
  }

  const handleStatusUpdate = (status: "working" | "break" | "meeting" | "offline") => {
    dispatch({ type: "UPDATE_MEMBER_STATUS", payload: { memberId: currentMember.id, status } })
  }

  const handleTaskProgressUpdate = (taskId: number, progress: number) => {
    dispatch({
      type: "UPDATE_TASK_PROGRESS",
      payload: {
        memberId: currentMember.id,
        taskId,
        progress,
      },
    })
  }

  const activeTasks = currentMember.tasks.filter((task) => task.progress < 100)
  const completedTasks = currentMember.tasks.filter((task) => task.progress === 100)
  const totalProgress =
    currentMember.tasks.length > 0
      ? Math.round(currentMember.tasks.reduce((acc, task) => acc + task.progress, 0) / currentMember.tasks.length)
      : 0

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your status and track task progress</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="flex items-center gap-1">
            <Target className="h-3 w-3" />
            {totalProgress}% Overall Progress
          </Badge>
        </div>
      </div>

      {/* Status and Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-blue-500/10 border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Status</CardTitle>
            <User className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400 capitalize">{currentMember.status}</div>
          </CardContent>
        </Card>

        <Card className="bg-green-500/10 border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed Tasks</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{completedTasks.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-500/10 border-yellow-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Tasks</CardTitle>
            <Clock className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">{activeTasks.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-purple-500/10 border-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overall Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">{totalProgress}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <StatusChart />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Task Management */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                My Tasks
              </CardTitle>
              <CardDescription>Track progress and manage your assigned tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <TaskList tasks={currentMember.tasks} onProgressUpdate={handleTaskProgressUpdate} />
            </CardContent>
          </Card>
        </div>

        {/* Status Control, Progress, and User Report */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Update Status
              </CardTitle>
              <CardDescription>Let your team know what you're working on</CardDescription>
            </CardHeader>
            <CardContent>
              <StatusSelector currentStatus={currentMember.status} onStatusChange={handleStatusUpdate} />
            </CardContent>
          </Card>

          <UserReportCard />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Progress Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Overall Progress</span>
                  <span className="font-medium">{totalProgress}%</span>
                </div>
                <Progress value={totalProgress} className="h-2" />
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Tasks</span>
                  <span className="font-semibold">{currentMember.tasks.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Completed</span>
                  <span className="font-semibold text-green-400">{completedTasks.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">In Progress</span>
                  <span className="font-semibold text-blue-400">
                    {currentMember.tasks.filter((task) => task.progress > 0 && task.progress < 100).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Not Started</span>
                  <span className="font-semibold text-gray-400">
                    {currentMember.tasks.filter((task) => task.progress === 0).length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
