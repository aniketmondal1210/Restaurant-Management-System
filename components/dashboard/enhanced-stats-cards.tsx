"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, ShoppingBag, Users, Clock, TrendingUp, TrendingDown, WifiOff } from "lucide-react"
import { AnalyticsStorage } from "@/lib/storage"
import { useRealTimeUpdates } from "@/hooks/use-real-time"

export function EnhancedStatsCards() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    averageTime: 18,
    activeCustomers: 0,
  })

  const [changes, setChanges] = useState({
    orders: 0,
    revenue: 0,
    time: -2,
    customers: 0,
  })

  const { lastUpdate, isOnline } = useRealTimeUpdates()

  useEffect(() => {
    // Load real data from storage
    const todayStats = AnalyticsStorage.getTodayStats()
    const weekStats = AnalyticsStorage.getWeekStats()
    const orders = AnalyticsStorage.getOrders()

    // Calculate average preparation time from recent orders
    const recentOrders = orders.slice(-20) // Last 20 orders
    const avgTime =
      recentOrders.length > 0
        ? recentOrders.reduce((sum, order) => sum + (order.estimatedTime || 18), 0) / recentOrders.length
        : 18

    // Calculate changes (mock calculation for demo)
    const previousWeekRevenue = weekStats.revenue * 0.9 // Simulate 10% growth
    const revenueChange =
      previousWeekRevenue > 0 ? ((weekStats.revenue - previousWeekRevenue) / previousWeekRevenue) * 100 : 0

    setStats({
      totalOrders: todayStats.orders,
      totalRevenue: todayStats.revenue,
      averageTime: Math.round(avgTime),
      activeCustomers: Math.floor(todayStats.orders * 0.8), // Estimate active customers
    })

    setChanges({
      orders: Math.round(revenueChange * 0.8),
      revenue: Math.round(revenueChange),
      time: Math.round(((18 - avgTime) / 18) * 100),
      customers: Math.round(revenueChange * 0.6),
    })
  }, [lastUpdate])

  const StatCard = ({
    title,
    value,
    icon: Icon,
    change,
    format = "number",
    gradient,
    isOnline: cardOnline = true,
  }: {
    title: string
    value: number
    icon: any
    change: number
    format?: "number" | "currency" | "time"
    gradient: string
    isOnline?: boolean
  }) => {
    const isPositive = change > 0
    const isNegative = change < 0

    const formatValue = (val: number) => {
      switch (format) {
        case "currency":
          return `$${val.toFixed(2)}`
        case "time":
          return `${val} min`
        default:
          return val.toString()
      }
    }

    return (
      <Card
        className={`restaurant-card hover:scale-105 transition-transform duration-200 overflow-hidden ${!cardOnline ? "opacity-75" : ""}`}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-2">
            {title}
            {!cardOnline && <WifiOff className="h-3 w-3 text-red-500" />}
          </CardTitle>
          <div className={`w-10 h-10 ${gradient} rounded-lg flex items-center justify-center shadow-md`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{formatValue(value)}</div>
          <div className="flex items-center text-xs">
            {isPositive && <TrendingUp className="h-3 w-3 text-green-500 mr-1" />}
            {isNegative && <TrendingDown className="h-3 w-3 text-red-500 mr-1" />}
            <span
              className={`font-medium ${
                isPositive
                  ? "text-green-600 dark:text-green-400"
                  : isNegative
                    ? "text-red-600 dark:text-red-400"
                    : "text-gray-500"
              }`}
            >
              {change > 0 ? "+" : ""}
              {change}%
            </span>
            <span className="text-gray-500 dark:text-gray-400 ml-1">from last week</span>
          </div>
          {!cardOnline && <div className="text-xs text-red-500 mt-1">Offline data</div>}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {!isOnline && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3 flex items-center gap-2">
          <WifiOff className="h-4 w-4 text-yellow-600" />
          <span className="text-sm text-yellow-700 dark:text-yellow-300">
            You're offline. Data may not be up to date.
          </span>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={ShoppingBag}
          change={changes.orders}
          gradient="bg-gradient-to-br from-blue-500 to-blue-600"
          isOnline={isOnline}
        />
        <StatCard
          title="Total Revenue"
          value={stats.totalRevenue}
          icon={DollarSign}
          change={changes.revenue}
          format="currency"
          gradient="bg-gradient-to-br from-green-500 to-green-600"
          isOnline={isOnline}
        />
        <StatCard
          title="Avg. Prep Time"
          value={stats.averageTime}
          icon={Clock}
          change={changes.time}
          format="time"
          gradient="bg-gradient-to-br from-orange-500 to-red-500"
          isOnline={isOnline}
        />
        <StatCard
          title="Active Customers"
          value={stats.activeCustomers}
          icon={Users}
          change={changes.customers}
          gradient="bg-gradient-to-br from-purple-500 to-purple-600"
          isOnline={isOnline}
        />
      </div>
    </div>
  )
}
