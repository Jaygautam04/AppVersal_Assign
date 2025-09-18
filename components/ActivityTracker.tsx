"use client"

import { useEffect } from "react"
import { useTeam } from "../contexts/TeamContext"

const INACTIVITY_TIMEOUT = 10 * 60 * 1000 // 10 minutes

export function ActivityTracker() {
  const { state, dispatch } = useTeam()
  const { currentUser, members } = state

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const resetInactivityTimer = () => {
      dispatch({ type: "UPDATE_ACTIVITY" })

      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        dispatch({ type: "SET_INACTIVE" })

        // Find current user and set to offline if not already
        const currentMember = members.find((member) => member.name === currentUser)
        if (currentMember && currentMember.status !== "offline") {
          dispatch({
            type: "UPDATE_MEMBER_STATUS",
            payload: {
              memberId: currentMember.id,
              status: "offline",
            },
          })
        }
      }, INACTIVITY_TIMEOUT)
    }

    // Track user activity
    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "click"]

    events.forEach((event) => {
      document.addEventListener(event, resetInactivityTimer, true)
    })

    // Initialize timer
    resetInactivityTimer()

    return () => {
      clearTimeout(timeoutId)
      events.forEach((event) => {
        document.removeEventListener(event, resetInactivityTimer, true)
      })
    }
  }, [dispatch, currentUser, members])

  return null // This component doesn't render anything
}
