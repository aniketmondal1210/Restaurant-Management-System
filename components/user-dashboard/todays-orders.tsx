"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Clock, CheckCircle, Timer } from "lucide-react"

export function TodaysOrders() {
  // Sample orders for today - what staff can see
  const todaysOrders = [
    {
      id: "ORD-001",
      customer: "John Smith",
      items: ["Burger", "Fries"],
      status: "completed",
      time: "10:30 AM",
      total: 24.99,
    },
    {
      id: "ORD-002",
      customer: "Sarah Johnson",
      items: ["Pizza", "Drink"],
      status: "preparing",
      time: "10:45 AM",
      total: 32.5,
    },
    {
      id: "ORD-003",
      customer: "Michael Brown",
      items: ["Salad", "Water"],
      status: "pending",
      time: "11:00 AM",
      total: 18.75,
    },
    {
      id: "ORD-004",
      customer: "Emily Davis",
      items: ["Burger", "Fries", "Milkshake"],
      status: "completed",
      time: "11:15 AM",
      total: 42.25,
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "preparing":
        return <Timer className="h-4 w-4 text-orange-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-blue-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "preparing":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "pending":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Orders</CardTitle>
        <CardDescription>Orders you've processed today</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {todaysOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className="font-medium">{order.customer}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{order.items.join(", ")}</div>
                  <div className="text-xs text-muted-foreground">
                    {order.id} • {order.time}
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="font-medium">${order.total.toFixed(2)}</div>
                  <Badge variant="outline" className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
