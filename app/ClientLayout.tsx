"use client"

import type React from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { TeamProvider, useTeam } from "../contexts/TeamContext"

function ClientLayoutInner({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { state } = useTeam()

  return (
    <html lang="en" className={state.isDarkMode ? "dark" : ""}>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TeamProvider>
        <ClientLayoutInner>{children}</ClientLayoutInner>
      </TeamProvider>
    </Suspense>
  )
}
