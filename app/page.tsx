"use client"

import { useTeam } from "../contexts/TeamContext"
import { Header } from "../components/Header"
import { TeamLeadDashboard } from "../components/TeamLeadDashboard"
import { TeamMemberDashboard } from "../components/TeamMemberDashboard"
import { ActivityTracker } from "../components/ActivityTracker"

export default function Dashboard() {
  const { state } = useTeam()
  const { currentRole } = state

  return (
    <div className="min-h-screen bg-background">
      <ActivityTracker />
      <Header />
      <main className="container mx-auto px-6 py-8">
        {currentRole === "lead" ? <TeamLeadDashboard /> : <TeamMemberDashboard />}
      </main>
    </div>
  )
}
