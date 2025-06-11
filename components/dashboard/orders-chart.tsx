"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function OrdersChart() {
  const [activeTab, setActiveTab] = useState("daily")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Orders Overview</CardTitle>
          <CardDescription>Order volume and revenue trends</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px] flex items-center justify-center">
          <div className="text-muted-foreground">Loading chart...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Orders Overview</CardTitle>
          <CardDescription>Order volume and revenue trends</CardDescription>
        </div>
        <Tabs defaultValue="daily" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="h-[350px]">
        <div className="h-full w-full flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p>Chart visualization would appear here</p>
            <p className="text-sm mt-2">Showing {activeTab} order data</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
