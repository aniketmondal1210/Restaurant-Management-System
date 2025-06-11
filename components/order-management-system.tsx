"use client"

import { useState } from "react"
import { OrderForm } from "@/components/order-form"
import { QueueVisualization } from "@/components/queue-visualization"
import { OrderProcessing } from "@/components/order-processing"
import { OrderStatus } from "@/components/order-status"
import { useQueue } from "@/hooks/use-queue"
import { usePriorityQueue } from "@/hooks/use-priority-queue"
import { useCircularQueue } from "@/hooks/use-circular-queue"
import { type Order, OrderPriority } from "@/types/order"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function OrderManagementSystem() {
  const [completedOrders, setCompletedOrders] = useState<Order[]>([])
  const [activeTab, setActiveTab] = useState<string>("regular")

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

  const handleOrderSubmit = (order: Order) => {
    if (order.priority === OrderPriority.HIGH) {
      addPriorityOrder(order)
    } else {
      addRegularOrder(order)
    }
  }

  const processNextOrder = () => {
    if (!isPriorityQueueEmpty()) {
      const order = processPriorityOrder()
      if (order && !isKitchenFull()) {
        addToPreparation(order)
      }
    } else if (!isRegularQueueEmpty()) {
      const order = processRegularOrder()
      if (order && !isKitchenFull()) {
        addToPreparation(order)
      }
    }
  }

  const completeOrder = () => {
    if (!isKitchenEmpty()) {
      const completedOrder = completePreparation()
      if (completedOrder) {
        setCompletedOrders((prev) => [completedOrder, ...prev])
      }
    }
  }

  const cancelOrder = (orderId: string, isPriority: boolean) => {
    if (isPriority) {
      cancelPriorityOrder((order) => order.id === orderId)
    } else {
      cancelRegularOrder((order) => order.id === orderId)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-4">
        <OrderForm onSubmit={handleOrderSubmit} />
        <OrderStatus preparingOrders={preparingOrders} completedOrders={completedOrders} />
      </div>

      <div className="lg:col-span-8">
        <Tabs defaultValue="regular" onValueChange={setActiveTab}>
          <TabsList className="w-full mb-4">
            <TabsTrigger value="regular" className="flex-1">
              Regular Queue {regularOrders.length > 0 && `(${regularOrders.length})`}
            </TabsTrigger>
            <TabsTrigger value="priority" className="flex-1">
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
  )
}
