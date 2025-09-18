import { createSlice } from "@reduxjs/toolkit"

const activitySlice = createSlice({
  name: "activity",
  initialState: {
    lastActivity: Date.now(),
    isActive: true,
    inactivityTimer: null,
    isDark: false,
  },
  reducers: {
    updateActivity: (state) => {
      state.lastActivity = Date.now()
      state.isActive = true
    },
    setInactive: (state) => {
      state.isActive = false
    },
    setInactivityTimer: (state, action) => {
      state.inactivityTimer = action.payload
    },
    toggleDarkMode: (state) => {
      state.isDark = !state.isDark
    },
  },
})

export const { updateActivity, setInactive, setInactivityTimer, toggleDarkMode } = activitySlice.actions
export default activitySlice.reducer
