"use client"

import { useState } from "react"
import { useTeam } from "../contexts/TeamContext"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Plus } from "lucide-react"
import { format } from "date-fns"

export function TaskForm() {
  const { state, dispatch } = useTeam()
  const { members } = state

  const [selectedMember, setSelectedMember] = useState<string>("")
  const [taskTitle, setTaskTitle] = useState("")
  const [dueDate, setDueDate] = useState<string>("") // store date as yyyy-MM-dd
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedMember || !taskTitle || !dueDate) return

    setIsSubmitting(true)
    try {
      dispatch({
        type: "ADD_TASK",
        payload: {
          memberId: Number.parseInt(selectedMember),
          task: {
            title: taskTitle,
            dueDate, // already in yyyy-MM-dd
            progress: 0,
          },
        },
      })

      // Reset form
      setSelectedMember("")
      setTaskTitle("")
      setDueDate("")
    } finally {
      setIsSubmitting(false)
    }
  }

  // minimum selectable date = today
  const today = format(new Date(), "yyyy-MM-dd")

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
                {member.name}
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
        <Label htmlFor="due-date">Due Date</Label>
        <Input
          id="due-date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          min={today}
          required
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full"
        disabled={!selectedMember || !taskTitle || !dueDate || isSubmitting}
      >
        <Plus className="mr-2 h-4 w-4" />
        {isSubmitting ? "Assigning..." : "Assign Task"}
      </Button>
    </form>
  )
}
