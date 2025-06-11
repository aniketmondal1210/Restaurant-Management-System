"use client"

import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Clock, Plus, Coffee } from "lucide-react"
import { useRouter } from "next/navigation"

export function UserDashboardHeader() {
  const { user } = useAuth()
  const router = useRouter()

  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  const greeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Coffee className="h-6 w-6 text-blue-500" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            {greeting()}, {user?.username}!
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2 font-medium">
          <Clock className="h-4 w-4" />
          <span>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            • {currentTime}
          </span>
        </p>
      </div>
      <Button
        onClick={() => router.push("/user-dashboard/orders")}
        className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        size="lg"
      >
        <Plus className="mr-2 h-5 w-5" />
        Take Order
      </Button>
    </div>
  )
}
