"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"

// Types
interface Task {
  id: number
  title: string
  dueDate: string
  progress: number
}

interface Report {
  id: number
  text: string
  timestamp: string
  status: "submitted" | "reviewed"
}

interface Member {
  id: number
  name: string
  email: string
  status: "working" | "meeting" | "break" | "offline"
  avatar: string
  tasks: Task[]
  reports?: Report[]
}

interface TeamState {
  members: Member[]
  statusFilter: string
  isDarkMode: boolean
  currentRole: "lead" | "member"
  currentUser: string
  isActive: boolean
  lastActivity: number
}

// Initial data
const initialMembers: Member[] = [
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
    reports: [
      {
        id: 1,
        text: "Completed the initial wireframes for the dashboard redesign. Working on the color scheme and layout optimization.",
        timestamp: "2025-01-15T10:30:00Z",
        status: "submitted",
      },
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
    reports: [],
  },
  {
    id: 3,
    name: "Mike Chen",
    email: "mike@company.com",
    status: "break",
    avatar: "/professional-asian-man-headshot.png",
    tasks: [{ id: 5, title: "Security audit", dueDate: "2025-01-21", progress: 45 }],
    reports: [],
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
    reports: [],
  },
]

const initialState: TeamState = {
  members: initialMembers,
  statusFilter: "all",
  isDarkMode: false,
  currentRole: "lead",
  currentUser: "John Doe",
  isActive: true,
  lastActivity: Date.now(),
}

// Actions
type TeamAction =
  | { type: "UPDATE_MEMBER_STATUS"; payload: { memberId: number; status: string } }
  | { type: "ADD_TASK"; payload: { memberId: number; task: Omit<Task, "id"> } }
  | { type: "UPDATE_TASK_PROGRESS"; payload: { memberId: number; taskId: number; progress: number } }
  | { type: "SET_STATUS_FILTER"; payload: string }
  | { type: "TOGGLE_DARK_MODE" }
  | { type: "SWITCH_ROLE"; payload: "lead" | "member" }
  | { type: "UPDATE_ACTIVITY" }
  | { type: "SET_INACTIVE" }
  | { type: "ADD_USER_REPORT"; payload: { memberId: number; report: Report } }

// Reducer
function teamReducer(state: TeamState, action: TeamAction): TeamState {
  switch (action.type) {
    case "UPDATE_MEMBER_STATUS": {
      const { memberId, status } = action.payload
      return {
        ...state,
        members: state.members.map((member) =>
          member.id === memberId ? { ...member, status: status as any } : member,
        ),
      }
    }
    case "ADD_TASK": {
      const { memberId, task } = action.payload
      return {
        ...state,
        members: state.members.map((member) =>
          member.id === memberId ? { ...member, tasks: [...member.tasks, { ...task, id: Date.now() }] } : member,
        ),
      }
    }
    case "UPDATE_TASK_PROGRESS": {
      const { memberId, taskId, progress } = action.payload
      return {
        ...state,
        members: state.members.map((member) =>
          member.id === memberId
            ? {
                ...member,
                tasks: member.tasks.map((task) =>
                  task.id === taskId ? { ...task, progress: Math.max(0, Math.min(100, progress)) } : task,
                ),
              }
            : member,
        ),
      }
    }
    case "ADD_USER_REPORT": {
      const { memberId, report } = action.payload
      return {
        ...state,
        members: state.members.map((member) =>
          member.id === memberId ? { ...member, reports: [...(member.reports || []), report] } : member,
        ),
      }
    }
    case "SET_STATUS_FILTER":
      return { ...state, statusFilter: action.payload }
    case "TOGGLE_DARK_MODE":
      return { ...state, isDarkMode: !state.isDarkMode }
    case "SWITCH_ROLE":
      return { ...state, currentRole: action.payload }
    case "UPDATE_ACTIVITY":
      return { ...state, isActive: true, lastActivity: Date.now() }
    case "SET_INACTIVE":
      return { ...state, isActive: false }
    default:
      return state
  }
}

// Context
const TeamContext = createContext<{
  state: TeamState
  dispatch: React.Dispatch<TeamAction>
} | null>(null)

// Provider
export function TeamProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(teamReducer, initialState)

  return <TeamContext.Provider value={{ state, dispatch }}>{children}</TeamContext.Provider>
}

// Hook
export function useTeam() {
  const context = useContext(TeamContext)
  if (!context) {
    throw new Error("useTeam must be used within a TeamProvider")
  }
  return context
}
