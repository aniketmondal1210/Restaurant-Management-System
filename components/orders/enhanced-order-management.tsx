"use client"

import { useState, useEffect } from "react"
import { OrderForm } from "@/components/orders/order-form"
import { QueueVisualization } from "@/components/orders/queue-visualization"
import { OrderProcessing } from "@/components/orders/order-processing"
import { OrderStatus } from "@/components/orders/order-status"
import { useQueue } from "@/hooks/use-queue"
import { usePriorityQueue } from "@/hooks/use-priority-queue"
import { useCircularQueue } from "@/hooks/use-circular-queue"
import { type Order, OrderPriority } from "@/types/order"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Card } from "@/components/ui/card"
import { AnalyticsStorage } from "@/lib/storage"
import { useLiveOrderUpdates } from "@/hooks/use-real-time"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Bell } from "lucide-react"

export function EnhancedOrderManagement() {
  const [completedOrders, setCompletedOrders] = useState<Order[]>([])
  const [activeTab, setActiveTab] = useState<string>("regular")
  const { toast } = useToast()
  const { newOrderAlert } = useLiveOrderUpdates()

  // Regular queue for standard orders
  const {
    items: regularOrders,
    enqueue: addRegularOrder,
    dequeue: processRegularOrder,
    remove: cancelRegularOrder,
    isEmpty: isRegularQueueEmpty,
  } = useQueue<Order>()

  // Priority queue for VIP customers
  const {
    items: priorityOrders,
    enqueue: addPriorityOrder,
    dequeue: processPriorityOrder,
    remove: cancelPriorityOrder,
    isEmpty: isPriorityQueueEmpty,
  } = usePriorityQueue<Order>()

  // Circular queue for order preparation (limited capacity)
  const {
    items: preparingOrders,
    enqueue: addToPreparation,
    dequeue: completePreparation,
    isFull: isKitchenFull,
    isEmpty: isKitchenEmpty,
  } = useCircularQueue<Order>(5) // Kitchen can prepare 5 orders simultaneously

  // Load completed orders from storage on mount
  useEffect(() => {
    const savedOrders = AnalyticsStorage.getOrders()
    setCompletedOrders(savedOrders.slice(-10)) // Show last 10 completed orders
  }, [])

  const handleOrderSubmit = (order: Order) => {
    if (order.priority === OrderPriority.HIGH) {
      addPriorityOrder(order)
      toast({
        title: "VIP Order Added",
        description: `Order #${order.id.substring(0, 8)} for ${order.customerName} added to priority queue`,
      })
    } else {
      addRegularOrder(order)
      toast({
        title: "Order Added",
        description: `Order #${order.id.substring(0, 8)} for ${order.customerName} added to regular queue`,
      })
    }
  }

  const processNextOrder = () => {
    if (!isPriorityQueueEmpty()) {
      const order = processPriorityOrder()
      if (order && !isKitchenFull()) {
        addToPreparation(order)
        toast({
          title: "Processing VIP Order",
          description: `Now preparing order #${order.id.substring(0, 8)} for ${order.customerName}`,
        })
      }
    } else if (!isRegularQueueEmpty()) {
      const order = processRegularOrder()
      if (order && !isKitchenFull()) {
        addToPreparation(order)
        toast({
          title: "Processing Order",
          description: `Now preparing order #${order.id.substring(0, 8)} for ${order.customerName}`,
        })
      }
    }
  }

  const completeOrder = () => {
    if (!isKitchenEmpty()) {
      const completedOrder = completePreparation()
      if (completedOrder) {
        // Save to analytics storage
        AnalyticsStorage.saveOrder(completedOrder)

        setCompletedOrders((prev) => [completedOrder, ...prev.slice(0, 9)]) // Keep last 10
        toast({
          title: "Order Completed",
          description: `Order #${completedOrder.id.substring(0, 8)} for ${completedOrder.customerName} is ready`,
          variant: "success",
        })
      }
    }
  }

  const cancelOrder = (orderId: string, isPriority: boolean) => {
    if (isPriority) {
      cancelPriorityOrder((order) => order.id === orderId)
    } else {
      cancelRegularOrder((order) => order.id === orderId)
    }
    toast({
      title: "Order Cancelled",
      description: `Order #${orderId.substring(0, 8)} has been cancelled`,
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-6">
      {/* Live Order Alert */}
      {newOrderAlert && (
        <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700">
          <Bell className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-700 dark:text-blue-300">🔔 {newOrderAlert}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-6">
          <OrderForm onSubmit={handleOrderSubmit} />
          <OrderStatus preparingOrders={preparingOrders} completedOrders={completedOrders} />
        </div>

        <div className="lg:col-span-8 space-y-6">
          <Card>
            <Tabs defaultValue="regular" onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="regular">
                  Regular Queue {regularOrders.length > 0 && `(${regularOrders.length})`}
                </TabsTrigger>
                <TabsTrigger value="priority">
                  Priority Queue {priorityOrders.length > 0 && `(${priorityOrders.length})`}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="regular">
                <QueueVisualization
                  orders={regularOrders}
                  onCancelOrder={(orderId) => cancelOrder(orderId, false)}
                  queueType="Regular"
                />
              </TabsContent>

              <TabsContent value="priority">
                <QueueVisualization
                  orders={priorityOrders}
                  onCancelOrder={(orderId) => cancelOrder(orderId, true)}
                  queueType="Priority"
                />
              </TabsContent>
            </Tabs>
          </Card>

          <OrderProcessing
            onProcessNext={processNextOrder}
            onCompleteOrder={completeOrder}
            isRegularQueueEmpty={isRegularQueueEmpty()}
            isPriorityQueueEmpty={isPriorityQueueEmpty()}
            isKitchenEmpty={isKitchenEmpty()}
            isKitchenFull={isKitchenFull()}
          />
        </div>
      </div>
    </div>
  )
}
