"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { LayoutDashboard, ShoppingBag, Users, BarChart3, ChefHat } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export function MobileNav() {
  const pathname = usePathname()
  const { user } = useAuth()

  // Different nav items based on user role
  const adminNavItems = [
    {
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
    },
    {
      href: "/dashboard/orders",
      icon: <ShoppingBag className="h-5 w-5" />,
      label: "Orders",
    },
    {
      href: "/dashboard/menu",
      icon: <ChefHat className="h-5 w-5" />,
      label: "Menu",
    },
    {
      href: "/dashboard/customers",
      icon: <Users className="h-5 w-5" />,
      label: "Customers",
    },
    {
      href: "/dashboard/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
      label: "Analytics",
    },
  ]

  const staffNavItems = [
    {
      href: "/user-dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
    },
    {
      href: "/user-dashboard/orders",
      icon: <ShoppingBag className="h-5 w-5" />,
      label: "Orders",
    },
    {
      href: "/user-dashboard/customers",
      icon: <Users className="h-5 w-5" />,
      label: "Customers",
    },
  ]

  const navItems = user?.role === "admin" ? adminNavItems : staffNavItems

  return (
    <div className="fixed bottom-0 left-0 z-20 flex w-full justify-around border-t bg-background p-2 lg:hidden">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex flex-col items-center justify-center rounded-md p-2 text-xs",
            pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {item.icon}
          <span className="mt-1">{item.label}</span>
        </Link>
      ))}
    </div>
  )
}
