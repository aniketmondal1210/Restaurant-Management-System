"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, RotateCcw, Star, Receipt } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Customer's recent orders from this restaurant
const recentOrders = [
  {
    id: "ORD-001",
    items: [
      { name: "Classic Cheeseburger", quantity: 1, price: 12.99 },
      { name: "French Fries", quantity: 1, price: 4.99 },
      { name: "Coca Cola", quantity: 1, price: 2.99 },
    ],
    total: 20.97,
    status: "delivered",
    orderTime: "2024-01-16 19:45",
    deliveredTime: "2024-01-16 20:15",
    rating: 5,
  },
  {
    id: "ORD-002",
    items: [
      { name: "Pepperoni Pizza", quantity: 1, price: 18.99 },
      { name: "Garlic Bread", quantity: 1, price: 5.99 },
    ],
    total: 24.98,
    status: "delivered",
    orderTime: "2024-01-14 18:30",
    deliveredTime: "2024-01-14 19:05",
    rating: 4,
  },
  {
    id: "ORD-003",
    items: [
      { name: "Caesar Salad", quantity: 1, price: 9.99 },
      { name: "Chicken Wings (8pc)", quantity: 1, price: 11.99 },
      { name: "Chocolate Brownie", quantity: 1, price: 6.99 },
    ],
    total: 28.97,
    status: "delivered",
    orderTime: "2024-01-12 20:15",
    deliveredTime: "2024-01-12 20:50",
    rating: 5,
  },
]

export function RecentOrders() {
  const [orders] = useState(recentOrders)
  const { toast } = useToast()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "preparing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "on-way":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const handleReorder = (order: (typeof recentOrders)[0]) => {
    toast({
      title: "Added to cart!",
      description: `${order.items.length} items from your previous order have been added to your cart.`,
    })
  }

  const handleViewReceipt = (orderId: string) => {
    toast({
      title: "Order receipt",
      description: `Receipt for order ${orderId} would be displayed here.`,
    })
  }

  const formatDeliveryTime = (orderTime: string, deliveredTime: string) => {
    const order = new Date(orderTime)
    const delivered = new Date(deliveredTime)
    const diffMinutes = Math.round((delivered.getTime() - order.getTime()) / (1000 * 60))
    return `${diffMinutes} min`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Your latest orders from QuickBites Downtown</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{order.id.split("-")[1]}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium">{order.items.length} items</h3>
                    <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                    {order.rating && (
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">{order.rating}/5</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {order.items.map((item) => `${item.quantity}x ${item.name}`).join(", ")}
                  </p>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(order.orderTime).toLocaleDateString()}</span>
                    </div>
                    {order.deliveredTime && (
                      <span>Delivered in {formatDeliveryTime(order.orderTime, order.deliveredTime)}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold text-lg text-green-600">${order.total.toFixed(2)}</p>
                <div className="flex space-x-2 mt-2">
                  <Button variant="outline" size="sm" onClick={() => handleReorder(order)}>
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Reorder
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleViewReceipt(order.id)}>
                    <Receipt className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t">
          <Button variant="outline" className="w-full">
            View All Order History
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
