"use client"

import { useTeam } from "../contexts/TeamContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { FileText, Send, Clock } from "lucide-react"
import { useState } from "react"

export function UserReportCard() {
  const { state, dispatch } = useTeam()
  const { members } = state
  const [reportText, setReportText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // For demo purposes, using first member as current user
  const currentMember = members[0]

  const handleSubmitReport = async () => {
    if (!reportText.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Add report to member's data (in real app, this would go to backend)
    const newReport = {
      id: Date.now(),
      text: reportText,
      timestamp: new Date().toISOString(),
      status: "submitted",
    }

    dispatch({
      type: "ADD_USER_REPORT",
      payload: { memberId: currentMember.id, report: newReport },
    })

    setReportText("")
    setIsSubmitting(false)
  }

  const recentReports = currentMember?.reports?.slice(-3) || []

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Daily Report
        </CardTitle>
        <CardDescription>Submit your daily progress and updates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Textarea
            placeholder="What did you accomplish today? Any blockers or updates to share?"
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
            className="min-h-[100px]"
          />
          <Button onClick={handleSubmitReport} disabled={!reportText.trim() || isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit Report
              </>
            )}
          </Button>
        </div>

        {recentReports.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Recent Reports</h4>
            {recentReports.map((report) => (
              <div key={report.id} className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <Badge variant="outline" className="text-xs">
                    {new Date(report.timestamp).toLocaleDateString()}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{report.text}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
