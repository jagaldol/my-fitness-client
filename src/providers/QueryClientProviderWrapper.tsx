"use client"

import React from "react"
import "@/styles/globals.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export default function QueryClientProviderWrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient()
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
