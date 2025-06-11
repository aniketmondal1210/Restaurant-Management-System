"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ChevronRight } from "lucide-react"

export function RecentOrders() {
  const router = useRouter()

  // In a real app, this would come from an API
  const recentOrders = [
    {
      id: "ORD-001",
      customer: "John Smith",
      total: 24.99,
      status: "completed",
      time: "10:30 AM",
    },
    {
      id: "ORD-002",
      customer: "Sarah Johnson",
      total: 32.5,
      status: "preparing",
      time: "10:45 AM",
    },
    {
      id: "ORD-003",
      customer: "Michael Brown",
      total: 18.75,
      status: "pending",
      time: "11:00 AM",
    },
    {
      id: "ORD-004",
      customer: "Emily Davis",
      total: 42.25,
      status: "completed",
      time: "11:15 AM",
    },
    {
      id: "ORD-005",
      customer: "David Wilson",
      total: 15.5,
      status: "preparing",
      time: "11:30 AM",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "preparing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "pending":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest customer orders</CardDescription>
        </div>
        <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/orders")}>
          View all
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[350px]">
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div>
                  <div className="font-medium">{order.customer}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    {order.id} • {order.time}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium">${order.total.toFixed(2)}</div>
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
