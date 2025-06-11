"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function TopItems() {
  // Mock data - in a real app, this would come from an API
  const topItems = [
    { name: "Cheeseburger", count: 87, percentage: 100 },
    { name: "French Fries", count: 72, percentage: 83 },
    { name: "Chicken Sandwich", count: 65, percentage: 75 },
    { name: "Milkshake", count: 58, percentage: 67 },
    { name: "Pizza", count: 43, percentage: 49 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Selling Items</CardTitle>
        <CardDescription>Most popular items this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {topItems.map((item) => (
            <div key={item.name} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-medium">{item.name}</span>
                <span className="text-muted-foreground text-sm">{item.count} orders</span>
              </div>
              <Progress value={item.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
