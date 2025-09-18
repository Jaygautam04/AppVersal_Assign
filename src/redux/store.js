import { configureStore } from "@reduxjs/toolkit"
import membersReducer from "./slices/membersSlice"
import roleReducer from "./slices/roleSlice"
import activityReducer from "./slices/activitySlice"
import { ReturnType } from "react"

export const store = configureStore({
  reducer: {
    members: membersReducer,
    role: roleReducer,
    activity: activityReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
