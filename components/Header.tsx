"use client"

import { useTeam } from "../contexts/TeamContext"
import { Badge } from "./ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Switch } from "./ui/switch"
import { Label } from "./ui/label"
import { Users, UserCheck } from "lucide-react"
import { DarkModeToggle } from "./DarkModeToggle"

export function Header() {
  const { state, dispatch } = useTeam()
  const { currentRole, currentUser } = state

  const handleRoleSwitch = (checked: boolean) => {
    dispatch({ type: "SWITCH_ROLE", payload: checked ? "lead" : "member" })
  }

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left side - Logo and title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Users className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Team Pulse</h1>
              <p className="text-xs text-muted-foreground">Productivity Dashboard</p>
            </div>
          </div>
        </div>

      
        <div className="flex items-center gap-2">
          <Badge variant={currentRole === "lead" ? "default" : "secondary"} className="flex items-center gap-1">
            <UserCheck className="h-3 w-3" />
            {currentRole === "lead" ? "Team Lead" : "Team Member"}
          </Badge>
        </div>

        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/professional-headshot.png" alt={currentUser} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {currentUser
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{currentUser}</p>
              <p className="text-xs text-muted-foreground">{currentRole === "lead" ? "Team Lead" : "Team Member"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-l border-border pl-4">
            <DarkModeToggle />

            <div className="flex items-center gap-2">
              <Label htmlFor="role-switch" className="text-xs text-muted-foreground">
                Member
              </Label>
              <Switch
                id="role-switch"
                checked={currentRole === "lead"}
                onCheckedChange={handleRoleSwitch}
                className="data-[state=checked]:bg-primary"
              />
              <Label htmlFor="role-switch" className="text-xs text-muted-foreground">
                Lead
              </Label>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
