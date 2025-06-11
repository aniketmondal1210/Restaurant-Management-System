"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, ShoppingBag, Users, Clock, TrendingUp, TrendingDown } from "lucide-react"

export function StatsCards() {
  // In a real app, this would come from an API
  const stats = {
    totalOrders: 128,
    totalRevenue: 2567.89,
    averageTime: 18,
    activeCustomers: 42,
  }

  const changes = {
    orders: 12.5,
    revenue: 8.2,
    time: -2,
    customers: 5,
  }

  const StatCard = ({
    title,
    value,
    icon: Icon,
    change,
    format = "number",
    gradient,
  }: {
    title: string
    value: number
    icon: any
    change: number
    format?: "number" | "currency" | "time"
    gradient: string
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
      <Card className="restaurant-card hover:scale-105 transition-transform duration-200 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</CardTitle>
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
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Orders"
        value={stats.totalOrders}
        icon={ShoppingBag}
        change={changes.orders}
        gradient="bg-gradient-to-br from-blue-500 to-blue-600"
      />
      <StatCard
        title="Total Revenue"
        value={stats.totalRevenue}
        icon={DollarSign}
        change={changes.revenue}
        format="currency"
        gradient="bg-gradient-to-br from-green-500 to-green-600"
      />
      <StatCard
        title="Avg. Prep Time"
        value={stats.averageTime}
        icon={Clock}
        change={changes.time}
        format="time"
        gradient="bg-gradient-to-br from-orange-500 to-red-500"
      />
      <StatCard
        title="Active Customers"
        value={stats.activeCustomers}
        icon={Users}
        change={changes.customers}
        gradient="bg-gradient-to-br from-purple-500 to-purple-600"
      />
    </div>
  )
}
