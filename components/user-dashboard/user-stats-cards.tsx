"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag, Clock, CheckCircle, Timer } from "lucide-react"

export function UserStatsCards() {
  // Staff-relevant stats - what they can see and control
  const stats = {
    ordersToday: 23,
    averageTime: 18,
    completedToday: 19,
    inProgress: 4,
  }

  const StatCard = ({
    title,
    value,
    icon: Icon,
    description,
    gradient,
  }: {
    title: string
    value: number | string
    icon: any
    description: string
    gradient: string
  }) => {
    return (
      <Card className="restaurant-card hover:scale-105 transition-transform duration-200 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</CardTitle>
          <div className={`w-10 h-10 ${gradient} rounded-lg flex items-center justify-center shadow-md`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Orders Today"
        value={stats.ordersToday}
        icon={ShoppingBag}
        description="Orders processed today"
        gradient="bg-gradient-to-br from-blue-500 to-blue-600"
      />
      <StatCard
        title="Avg. Prep Time"
        value={`${stats.averageTime} min`}
        icon={Clock}
        description="Average preparation time"
        gradient="bg-gradient-to-br from-orange-500 to-red-500"
      />
      <StatCard
        title="Completed Today"
        value={stats.completedToday}
        icon={CheckCircle}
        description="Orders completed today"
        gradient="bg-gradient-to-br from-green-500 to-green-600"
      />
      <StatCard
        title="In Progress"
        value={stats.inProgress}
        icon={Timer}
        description="Currently being prepared"
        gradient="bg-gradient-to-br from-purple-500 to-purple-600"
      />
    </div>
  )
}
