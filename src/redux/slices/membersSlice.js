import { createSlice } from "@reduxjs/toolkit"

// Initial mock data for team members
const initialMembers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@company.com",
    status: "working",
    avatar: "/professional-headshot.png",
    tasks: [
      { id: 1, title: "Complete dashboard redesign", dueDate: "2025-01-20", progress: 60 },
      { id: 2, title: "Review API documentation", dueDate: "2025-01-18", progress: 100 },
    ],
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah@company.com",
    status: "meeting",
    avatar: "/professional-woman-headshot.png",
    tasks: [
      { id: 3, title: "Client presentation prep", dueDate: "2025-01-19", progress: 80 },
      { id: 4, title: "Database optimization", dueDate: "2025-01-22", progress: 30 },
    ],
  },
  {
    id: 3,
    name: "Mike Chen",
    email: "mike@company.com",
    status: "break",
    avatar: "/professional-asian-man-headshot.png",
    tasks: [{ id: 5, title: "Security audit", dueDate: "2025-01-21", progress: 45 }],
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    email: "emily@company.com",
    status: "offline",
    avatar: "/professional-latina-woman-headshot.png",
    tasks: [
      { id: 6, title: "Mobile app testing", dueDate: "2025-01-23", progress: 70 },
      { id: 7, title: "User feedback analysis", dueDate: "2025-01-25", progress: 20 },
    ],
  },
]

const membersSlice = createSlice({
  name: "members",
  initialState: {
    members: initialMembers,
    statusFilter: "all", // 'all', 'working', 'meeting', 'break', 'offline'
  },
  reducers: {
    updateMemberStatus: (state, action) => {
      const { memberId, status } = action.payload
      const member = state.members.find((m) => m.id === memberId)
      if (member) {
        member.status = status
      }
    },
    addTask: (state, action) => {
      const { memberId, task } = action.payload
      const member = state.members.find((m) => m.id === memberId)
      if (member) {
        const newTask = {
          id: Date.now(),
          title: task.title,
          dueDate: task.dueDate,
          progress: 0,
        }
        member.tasks.push(newTask)
      }
    },
    updateTaskProgress: (state, action) => {
      const { memberId, taskId, progress } = action.payload
      const member = state.members.find((m) => m.id === memberId)
      if (member) {
        const task = member.tasks.find((t) => t.id === taskId)
        if (task) {
          task.progress = Math.max(0, Math.min(100, progress))
        }
      }
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload
    },
  },
})

export const { updateMemberStatus, addTask, updateTaskProgress, setStatusFilter } = membersSlice.actions

export default membersSlice.reducer
