"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSidebar } from "@/context/sidebar-context"
import { useAuth } from "@/context/auth-context"
import { LayoutDashboard, ShoppingBag, Users, LogOut, ChefHat } from "lucide-react"

interface SidebarLinkProps {
  href: string
  icon: React.ReactNode
  title: string
  isActive: boolean
}

function SidebarLink({ href, icon, title, isActive }: SidebarLinkProps) {
  return (
    <Link href={href} passHref>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 h-12 px-4 font-medium transition-all duration-200",
          isActive
            ? "bg-gradient-to-r from-blue-500 to-green-600 text-white shadow-lg hover:opacity-90"
            : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white",
        )}
      >
        {icon}
        <span>{title}</span>
      </Button>
    </Link>
  )
}

export function UserSidebar() {
  const pathname = usePathname()
  const { isOpen } = useSidebar()
  const { user, logout } = useAuth()

  if (!user) return null

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex h-full w-64 flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-xl transition-transform lg:static lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-6 bg-gradient-to-r from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
            <ChefHat className="h-6 w-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              QuickBites
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-medium">Staff Portal</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 px-4 py-6">
        <div className="space-y-2">
          <SidebarLink
            href="/user-dashboard"
            icon={<LayoutDashboard className="h-5 w-5" />}
            title="Dashboard"
            isActive={pathname === "/user-dashboard"}
          />
          <SidebarLink
            href="/user-dashboard/orders"
            icon={<ShoppingBag className="h-5 w-5" />}
            title="Orders"
            isActive={pathname === "/user-dashboard/orders"}
          />
          <SidebarLink
            href="/user-dashboard/customers"
            icon={<Users className="h-5 w-5" />}
            title="Customers"
            isActive={pathname === "/user-dashboard/customers"}
          />
        </div>
      </ScrollArea>

      <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="mb-3 px-2">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.username}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 capitalize font-medium">Staff Member</p>
        </div>
        <Button
          variant="outline"
          className="w-full justify-start gap-3 h-10 border-gray-300 dark:border-gray-600 hover:bg-red-50 hover:border-red-300 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:border-red-600 dark:hover:text-red-400 transition-colors"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </Button>
      </div>
    </aside>
  )
}
