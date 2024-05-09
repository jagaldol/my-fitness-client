"use client"

import React from "react"
import useAxiosInterceptor from "@/hooks/useAxiosInterceptor"

export default function AxiosInterceptorWrapper({ children }: { children: React.ReactNode }) {
  useAxiosInterceptor()
  return children
}
