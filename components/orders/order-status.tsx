"use client"

import type { Order } from "@/types/order"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { CircleCheck, Timer, Clock, ChefHat } from "lucide-react"
import { Progress } from "@/components/ui/progress"

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

  // Simulate preparation progress
  const getPreparationProgress = (order: Order) => {
    const orderTime = new Date(order.timestamp).getTime()
    const now = new Date().getTime()
    const elapsed = now - orderTime
    const estimatedTimeMs = (order.estimatedTime || 15) * 60 * 1000

    // Calculate progress as a percentage
    const progress = Math.min(100, (elapsed / estimatedTimeMs) * 100)
    return Math.floor(progress)
  }

  return (
    <Card className="restaurant-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChefHat className="h-5 w-5 text-blue-600" />
          Order Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="preparing">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="preparing" className="flex items-center gap-2">
              <Timer className="h-4 w-4" />
              Preparing {preparingOrders.length > 0 && `(${preparingOrders.length})`}
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <CircleCheck className="h-4 w-4" />
              Completed {completedOrders.length > 0 && `(${completedOrders.length})`}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preparing">
            <ScrollArea className="h-[300px]">
              {preparingOrders.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <Timer className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No orders in preparation</p>
                </div>
              ) : (
                <div className="space-y-4 pt-4">
                  {preparingOrders.map((order) => {
                    const progress = getPreparationProgress(order)

                    return (
                      <div key={order.id} className="order-card p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium flex items-center gap-2 text-gray-900 dark:text-white">
                              {order.customerName}
                              <div className="animate-pulse-soft">
                                <Timer className="h-4 w-4 text-orange-500" />
                              </div>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-1">
                              <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-xs">
                                #{order.id.substring(0, 8)}
                              </span>
                              <span>•</span>
                              <span>{formatTime(order.timestamp)}</span>
                            </div>
                          </div>
                          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300 border-orange-200 dark:border-orange-800">
                            Preparing
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>Est: {order.estimatedTime} min</span>
                            </div>
                            <span className="font-medium">{progress}% complete</span>
                          </div>
                          <Progress value={progress} className="h-2 bg-gray-200 dark:bg-gray-700" />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="completed">
            <ScrollArea className="h-[300px]">
              {completedOrders.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <CircleCheck className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No completed orders</p>
                </div>
              ) : (
                <div className="space-y-4 pt-4">
                  {completedOrders.map((order) => (
                    <div key={order.id} className="order-card completed-glow p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium flex items-center gap-2 text-gray-900 dark:text-white">
                            {order.customerName}
                            <CircleCheck className="h-4 w-4 text-green-500" />
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-1">
                            <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-xs">
                              #{order.id.substring(0, 8)}
                            </span>
                            <span>•</span>
                            <span>{formatTime(order.timestamp)}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-800 mb-2">
                            Ready
                          </Badge>
                          <div className="text-sm font-bold text-gray-900 dark:text-white">
                            ${order.total.toFixed(2)}
                          </div>
                        </div>
                      </div>
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
