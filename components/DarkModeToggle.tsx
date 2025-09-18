"use client"

import { useTeam } from "../contexts/TeamContext"
import { Button } from "./ui/button"
import { Moon, Sun } from "lucide-react"

export function DarkModeToggle() {
  const { state, dispatch } = useTeam()
  const isDark = state.isDarkMode

  const handleToggle = () => {
    dispatch({ type: "TOGGLE_DARK_MODE" })
  }

  return (
    <Button variant="outline" size="sm" onClick={handleToggle} className="h-8 w-8 p-0 bg-transparent">
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  )
}
