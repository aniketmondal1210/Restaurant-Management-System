"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

export function SalesOverview() {
  const [period, setPeriod] = useState("week")

  // Mock data - in a real app, this would come from an API
  const salesData = {
    week: {
      total: 4256.78,
      change: 12.5,
      orders: 142,
      avgOrder: 29.98,
    },
    month: {
      total: 18459.32,
      change: 8.2,
      orders: 623,
      avgOrder: 29.63,
    },
    year: {
      total: 215678.45,
      change: 15.7,
      orders: 7245,
      avgOrder: 29.77,
    },
  }

  const currentData = period === "week" ? salesData.week : period === "month" ? salesData.month : salesData.year

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Sales Overview</CardTitle>
          <CardDescription>Summary of your restaurant's sales</CardDescription>
        </div>
        <Tabs defaultValue="week" value={period} onValueChange={setPeriod}>
          <TabsList>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-bold">${currentData.total.toFixed(2)}</h2>
              <p className={`text-sm ${currentData.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                {currentData.change >= 0 ? "+" : ""}
                {currentData.change}%
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Orders</p>
              <p className="text-2xl font-bold">{currentData.orders}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Avg. Order Value</p>
              <p className="text-2xl font-bold">${currentData.avgOrder.toFixed(2)}</p>
            </div>
          </div>

          <div className="h-[200px] flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p>Sales chart would appear here</p>
              <p className="text-sm mt-2">Showing data for this {period}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
