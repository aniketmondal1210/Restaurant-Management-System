"use client"

import type React from "react"
import { UserSidebar } from "@/components/layout/user-sidebar"
import { Header } from "@/components/layout/header"
import { MobileNav } from "@/components/layout/mobile-nav"
import { SidebarProvider } from "@/context/sidebar-context"
import { useAuth } from "@/context/auth-context"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { UserManager } from "@/lib/user-management"

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Initialize demo users
    UserManager.initializeDemoUsers()

    if (!user) {
      router.push("/")
    } else if (user.role !== "staff") {
      // Redirect to appropriate dashboard based on role
      if (user.role === "admin") {
        router.push("/dashboard")
      } else if (user.role === "customer") {
        router.push("/customer-dashboard")
      }
    }
  }, [user, router])

  if (!user || user.role !== "staff") {
    return null
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <UserSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <MobileNav />
          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
