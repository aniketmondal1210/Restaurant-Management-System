"use client"

import { X, Clock, DollarSign, FileText, Star } from "lucide-react"
import type { Order } from "@/types/order"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
          {queueType === "Priority" ? (
            <Star className="h-10 w-10 text-gray-400" />
          ) : (
            <Clock className="h-10 w-10 text-gray-400" />
          )}
        </div>
        <div className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
          No orders in the {queueType.toLowerCase()} queue
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {queueType === "Priority"
            ? "VIP orders will appear here and be processed first"
            : "Regular orders will appear here"}
        </div>
      </div>
    )
  }

  return (
    <ScrollArea className="h-[500px]">
      <div className="space-y-4 p-4">
        {orders.map((order, index) => (
          <Card
            key={order.id}
            className={`order-card animate-slide-in ${
              index === 0 ? "priority-glow" : ""
            } ${order.priority === "high" ? "border-yellow-300 dark:border-yellow-600" : ""}`}
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                      {order.customerName}
                    </CardTitle>
                    {order.priority === "high" && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                    {index === 0 && (
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                        Next Up
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      #{order.id.substring(0, 8)}
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatTime(order.timestamp)}
                    </span>
                  </CardDescription>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onCancelOrder(order.id)}
                        className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Cancel</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Cancel Order</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <span className="text-gray-700 dark:text-gray-300">
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium mr-2">
                          {item.quantity}
                        </span>
                        {item.name}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {order.notes && (
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                    <div className="flex items-start">
                      <FileText className="h-4 w-4 text-amber-600 dark:text-amber-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-amber-800 dark:text-amber-200">{order.notes}</span>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Est: {order.estimatedTime} min</span>
                  </div>
                  <div className="flex items-center font-bold text-lg text-gray-900 dark:text-white">
                    <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                    {order.total.toFixed(2)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}
