"use client"

import { X } from "lucide-react"
import type { Order } from "@/types/order"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface QueueVisualizationProps {
  orders: Order[]
  onCancelOrder: (orderId: string) => void
  queueType: "Regular" | "Priority"
}

export function QueueVisualization({ orders, onCancelOrder, queueType }: QueueVisualizationProps) {
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (orders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{queueType} Queue</CardTitle>
          <CardDescription>No orders in the {queueType.toLowerCase()} queue</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{queueType} Queue</CardTitle>
        <CardDescription>Orders will be processed in a First-In-First-Out manner</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {orders.map((order, index) => (
              <Card key={order.id} className="relative">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {order.customerName}
                        {index === 0 && (
                          <Badge variant="default" className="ml-2">
                            Next Up
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>
                        Order #{order.id.substring(0, 8)} • {formatTime(order.timestamp)}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onCancelOrder(order.id)}
                      className="h-8 w-8 absolute top-2 right-2"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Cancel</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="border-t pt-1 mt-1 flex justify-between font-medium">
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
