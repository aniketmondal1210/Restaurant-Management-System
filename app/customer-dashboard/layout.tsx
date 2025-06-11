"use client"

import type React from "react"

import { useAuth } from "@/context/auth-context"
import { CustomerSidebar } from "@/components/layout/customer-sidebar"
import { Header } from "@/components/layout/header"
import { SidebarProvider } from "@/context/sidebar-context"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { UserManager } from "@/lib/user-management"

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Initialize demo users
    UserManager.initializeDemoUsers()

    if (!user) {
      router.push("/")
    } else if (user.role !== "customer") {
      // Redirect to appropriate dashboard based on role
      if (user.role === "admin") {
        router.push("/dashboard")
      } else if (user.role === "staff") {
        router.push("/user-dashboard")
      }
    }
  }, [user, router])

  if (!user || user.role !== "customer") {
    return null
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <CustomerSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
