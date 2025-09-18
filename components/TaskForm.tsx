"use client"

import type React from "react"
import { useState } from "react"
import { useTeam } from "../contexts/TeamContext"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Calendar } from "./ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { CalendarIcon, Plus } from "lucide-react"
import { format } from "date-fns"
import { cn } from "../lib/utils"

export function TaskForm() {
  const { state, dispatch } = useTeam()
  const { members } = state

  const [selectedMember, setSelectedMember] = useState<string>("")
  const [taskTitle, setTaskTitle] = useState("")
  const [dueDate, setDueDate] = useState<Date>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedMember || !taskTitle || !dueDate) {
      return
    }

    setIsSubmitting(true)

    try {
      dispatch({
        type: "ADD_TASK",
        payload: {
          memberId: Number.parseInt(selectedMember),
          task: {
            title: taskTitle,
            dueDate: format(dueDate, "yyyy-MM-dd"),
            progress: 0,
          },
        },
      })

      // Reset form
      setSelectedMember("")
      setTaskTitle("")
      setDueDate(undefined)
    } catch (error) {
      console.error("Error adding task:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Member Selection */}
      <div className="space-y-2">
        <Label htmlFor="member-select">Assign to Member</Label>
        <Select value={selectedMember} onValueChange={setSelectedMember}>
          <SelectTrigger>
            <SelectValue placeholder="Select team member" />
          </SelectTrigger>
          <SelectContent>
            {members.map((member) => (
              <SelectItem key={member.id} value={member.id.toString()}>
                <div className="flex items-center gap-2">
                  <div
                    className={cn("w-2 h-2 rounded-full", {
                      "bg-green-400": member.status === "working",
                      "bg-yellow-400": member.status === "break",
                      "bg-blue-400": member.status === "meeting",
                      "bg-gray-400": member.status === "offline",
                    })}
                  />
                  {member.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Task Title */}
      <div className="space-y-2">
        <Label htmlFor="task-title">Task Title</Label>
        <Input
          id="task-title"
          placeholder="Enter task description"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          required
        />
      </div>

      {/* Due Date */}
      <div className="space-y-2">
        <Label>Due Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-full justify-start text-left font-normal", !dueDate && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dueDate ? format(dueDate, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dueDate}
              onSelect={setDueDate}
              disabled={(date) => date < new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={!selectedMember || !taskTitle || !dueDate || isSubmitting}>
        <Plus className="mr-2 h-4 w-4" />
        {isSubmitting ? "Assigning..." : "Assign Task"}
      </Button>
    </form>
  )
}
