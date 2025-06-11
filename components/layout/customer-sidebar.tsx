"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/context/sidebar-context"
import { useAuth } from "@/context/auth-context"
import {
  Home,
  ShoppingCart,
  Heart,
  Clock,
  User,
  Settings,
  LogOut,
  ChefHat,
  Star,
  CreditCard,
  MapPin,
  Bell,
} from "lucide-react"

const customerNavItems = [
  {
    title: "Dashboard",
    href: "/customer-dashboard",
    icon: Home,
  },
  {
    title: "Browse Menu",
    href: "/customer-dashboard/menu",
    icon: ChefHat,
  },
  {
    title: "My Orders",
    href: "/customer-dashboard/orders",
    icon: ShoppingCart,
  },
  {
    title: "Order History",
    href: "/customer-dashboard/history",
    icon: Clock,
  },
  {
    title: "Favorites",
    href: "/customer-dashboard/favorites",
    icon: Heart,
  },
  {
    title: "Reviews",
    href: "/customer-dashboard/reviews",
    icon: Star,
  },
  {
    title: "Payment Methods",
    href: "/customer-dashboard/payments",
    icon: CreditCard,
  },
  {
    title: "Addresses",
    href: "/customer-dashboard/addresses",
    icon: MapPin,
  },
  {
    title: "Notifications",
    href: "/customer-dashboard/notifications",
    icon: Bell,
  },
  {
    title: "Profile",
    href: "/customer-dashboard/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/customer-dashboard/settings",
    icon: Settings,
  },
]

export function CustomerSidebar() {
  const { isOpen, toggle } = useSidebar()
  const { user, logout } = useAuth()
  const pathname = usePathname()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={toggle} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 bg-gradient-to-r from-green-600 to-blue-600">
            <ChefHat className="w-8 h-8 text-white mr-2" />
            <span className="text-xl font-bold text-white">QuickBites</span>
          </div>

          {/* User info */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.username}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">Customer Account</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
            {customerNavItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                  )}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.title}
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              onClick={logout}
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
