"use client"

import type { Order } from "@/types/order"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { CircleCheck, Timer } from "lucide-react"

interface OrderStatusProps {
  preparingOrders: Order[]
  completedOrders: Order[]
}

export function OrderStatus({ preparingOrders, completedOrders }: OrderStatusProps) {
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Order Status</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="preparing">
          <TabsList className="w-full">
            <TabsTrigger value="preparing" className="flex-1">
              Preparing {preparingOrders.length > 0 && `(${preparingOrders.length})`}
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex-1">
              Completed {completedOrders.length > 0 && `(${completedOrders.length})`}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preparing">
            <ScrollArea className="h-[200px]">
              {preparingOrders.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No orders in preparation</div>
              ) : (
                <div className="space-y-3 pt-2">
                  {preparingOrders.map((order) => (
                    <div key={order.id} className="flex justify-between items-start p-3 border rounded-md">
                      <div>
                        <div className="font-medium flex items-center">
                          {order.customerName}
                          <Timer className="ml-1 h-3 w-3 text-yellow-500" />
                        </div>
                        <div className="text-sm text-muted-foreground">{formatTime(order.timestamp)}</div>
                      </div>
                      <Badge variant="outline">Preparing</Badge>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="completed">
            <ScrollArea className="h-[200px]">
              {completedOrders.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No completed orders</div>
              ) : (
                <div className="space-y-3 pt-2">
                  {completedOrders.map((order) => (
                    <div key={order.id} className="flex justify-between items-start p-3 border rounded-md">
                      <div>
                        <div className="font-medium flex items-center">
                          {order.customerName}
                          <CircleCheck className="ml-1 h-3 w-3 text-green-500" />
                        </div>
                        <div className="text-sm text-muted-foreground">{formatTime(order.timestamp)}</div>
                      </div>
                      <Badge variant="outline" className="bg-green-50">
                        Completed
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
