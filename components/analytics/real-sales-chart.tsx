"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnalyticsStorage } from "@/lib/storage"

interface ChartData {
  labels: string[]
  revenue: number[]
  orders: number[]
}

export function RealSalesChart() {
  const [period, setPeriod] = useState("daily")
  const [chartData, setChartData] = useState<ChartData>({ labels: [], revenue: [], orders: [] })

  useEffect(() => {
    const salesData = AnalyticsStorage.getSalesData()
    const data: ChartData = { labels: [], revenue: [], orders: [] }

    switch (period) {
      case "daily":
        // Last 7 days
        for (let i = 6; i >= 0; i--) {
          const date = new Date()
          date.setDate(date.getDate() - i)
          const dayKey = date.toISOString().split("T")[0]
          const dayData = salesData.daily[dayKey] || { revenue: 0, orders: 0 }

          data.labels.push(date.toLocaleDateString("en-US", { weekday: "short" }))
          data.revenue.push(dayData.revenue)
          data.orders.push(dayData.orders)
        }
        break

      case "weekly":
        // Last 4 weeks
        for (let i = 3; i >= 0; i--) {
          const date = new Date()
          date.setDate(date.getDate() - i * 7)
          const weekKey = getWeekKey(date)
          const weekData = salesData.weekly[weekKey] || { revenue: 0, orders: 0 }

          data.labels.push(`Week ${4 - i}`)
          data.revenue.push(weekData.revenue)
          data.orders.push(weekData.orders)
        }
        break

      case "monthly":
        // Last 6 months
        for (let i = 5; i >= 0; i--) {
          const date = new Date()
          date.setMonth(date.getMonth() - i)
          const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
          const monthData = salesData.monthly[monthKey] || { revenue: 0, orders: 0 }

          data.labels.push(date.toLocaleDateString("en-US", { month: "short" }))
          data.revenue.push(monthData.revenue)
          data.orders.push(monthData.orders)
        }
        break
    }

    setChartData(data)
  }, [period])

  const getWeekKey = (date: Date): string => {
    const year = date.getFullYear()
    const week = getWeekNumber(date)
    return `${year}-W${String(week).padStart(2, "0")}`
  }

  const getWeekNumber = (date: Date): number => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    const dayNum = d.getUTCDay() || 7
    d.setUTCDate(d.getUTCDate() + 4 - dayNum)
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
  }

  const maxRevenue = Math.max(...chartData.revenue, 1)
  const maxOrders = Math.max(...chartData.orders, 1)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Sales Analytics</CardTitle>
          <CardDescription>Revenue and order trends over time</CardDescription>
        </div>
        <Tabs defaultValue="daily" value={period} onValueChange={setPeriod}>
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Revenue Chart */}
          <div>
            <h4 className="text-sm font-medium mb-2">Revenue</h4>
            <div className="h-32 flex items-end space-x-2">
              {chartData.labels.map((label, index) => (
                <div key={label} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm transition-all duration-300 hover:from-blue-600 hover:to-blue-500"
                    style={{
                      height: `${(chartData.revenue[index] / maxRevenue) * 100}%`,
                      minHeight: chartData.revenue[index] > 0 ? "4px" : "0px",
                    }}
                    title={`$${chartData.revenue[index].toFixed(2)}`}
                  />
                  <span className="text-xs text-muted-foreground mt-1">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Orders Chart */}
          <div>
            <h4 className="text-sm font-medium mb-2">Orders</h4>
            <div className="h-24 flex items-end space-x-2">
              {chartData.labels.map((label, index) => (
                <div key={label} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-sm transition-all duration-300 hover:from-green-600 hover:to-green-500"
                    style={{
                      height: `${(chartData.orders[index] / maxOrders) * 100}%`,
                      minHeight: chartData.orders[index] > 0 ? "4px" : "0px",
                    }}
                    title={`${chartData.orders[index]} orders`}
                  />
                  <span className="text-xs text-muted-foreground mt-1">{chartData.orders[index]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
