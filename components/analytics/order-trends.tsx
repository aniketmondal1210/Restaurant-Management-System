"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

export function OrderTrends() {
  const [period, setPeriod] = useState("daily")

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Order Trends</CardTitle>
          <CardDescription>Order volume and patterns over time</CardDescription>
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
        <div className="h-[300px] flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p>Order trends chart would appear here</p>
            <p className="text-sm mt-2">Showing {period} trends</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
