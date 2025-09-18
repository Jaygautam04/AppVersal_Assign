"use client"

import { useTeam } from "../contexts/TeamContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { MemberCard } from "./MemberCard"
import { TaskForm } from "./TaskForm"
import { StatusSummary } from "./StatusSummary"
import StatusPieChart from "./StatusPieChart"
import { Users, Plus, Filter, TrendingUp, FileText } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export function TeamLeadDashboard() {
  const { state, dispatch } = useTeam()
  const { members, statusFilter } = state


  const filteredMembers = statusFilter === "all" ? members : members.filter((member) => member.status === statusFilter)

 
  const sortedMembers = [...filteredMembers].sort((a, b) => {
    const aActiveTasks = a.tasks.filter((task) => task.progress < 100).length
    const bActiveTasks = b.tasks.filter((task) => task.progress < 100).length
    return bActiveTasks - aActiveTasks
  })

  const handleFilterChange = (value: string) => {
    dispatch({ type: "SET_STATUS_FILTER", payload: value })
  }

  const statusData = [
    { status: "Working", count: members.filter((m) => m.status === "working").length },
    { status: "Meeting", count: members.filter((m) => m.status === "meeting").length },
    { status: "Break", count: members.filter((m) => m.status === "break").length },
    { status: "Offline", count: members.filter((m) => m.status === "offline").length },
  ]

  return (
    <div className="space-y-8">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Team Lead Dashboard</h1>
          <p className="text-muted-foreground mt-1">Monitor team status and assign tasks</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {members.length} Team Members
          </Badge>
        </div>
      </div>

      
      <StatusSummary />

    
      
      <StatusPieChart data={statusData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Team Reports Summary
            </CardTitle>
            <CardDescription>Recent activity and report submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {members.map((member) => {
                const recentReports = member.reports?.length || 0
                const lastReportDate = member.reports?.[member.reports.length - 1]?.timestamp
                return (
                  <div key={member.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{recentReports} reports submitted</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={recentReports > 0 ? "default" : "secondary"}>
                        {lastReportDate ? new Date(lastReportDate).toLocaleDateString() : "No reports"}
                      </Badge>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

     
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
       
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Team Members
                  </CardTitle>
                  <CardDescription>Monitor member status and task progress</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={statusFilter} onValueChange={handleFilterChange}>
                    <SelectTrigger className="w-32">
                      <Filter className="h-4 w-4 mr-1" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="working">Working</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="break">Break</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {sortedMembers.length > 0 ? (
                sortedMembers.map((member) => <MemberCard key={member.id} member={member} isLeadView={true} />)
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No team members match the current filter</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

       
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Assign New Task
              </CardTitle>
              <CardDescription>Create and assign tasks to team members</CardDescription>
            </CardHeader>
            <CardContent>
              <TaskForm />
            </CardContent>
          </Card>

     
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Tasks</span>
                <span className="font-semibold">{members.reduce((acc, member) => acc + member.tasks.length, 0)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Completed</span>
                <span className="font-semibold text-green-400">
                  {members.reduce(
                    (acc, member) => acc + member.tasks.filter((task) => task.progress === 100).length,
                    0,
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">In Progress</span>
                <span className="font-semibold text-blue-400">
                  {members.reduce(
                    (acc, member) =>
                      acc + member.tasks.filter((task) => task.progress > 0 && task.progress < 100).length,
                    0,
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Not Started</span>
                <span className="font-semibold text-gray-400">
                  {members.reduce((acc, member) => acc + member.tasks.filter((task) => task.progress === 0).length, 0)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
