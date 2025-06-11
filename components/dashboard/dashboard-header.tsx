"use client"

import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Clock, Plus, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

export function DashboardHeader() {
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
          <Sparkles className="h-6 w-6 text-yellow-500" />
          <h1 className="text-3xl font-bold text-gradient">
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
        onClick={() => router.push("/dashboard/orders")}
        className="hero-gradient hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        size="lg"
      >
        <Plus className="mr-2 h-5 w-5" />
        New Order
      </Button>
    </div>
  )
}
