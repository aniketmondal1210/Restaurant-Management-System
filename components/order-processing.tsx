"use client"

import { ChevronsRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface OrderProcessingProps {
  onProcessNext: () => void
  onCompleteOrder: () => void
  isRegularQueueEmpty: boolean
  isPriorityQueueEmpty: boolean
  isKitchenEmpty: boolean
  isKitchenFull: boolean
}

export function OrderProcessing({
  onProcessNext,
  onCompleteOrder,
  isRegularQueueEmpty,
  isPriorityQueueEmpty,
  isKitchenEmpty,
  isKitchenFull,
}: OrderProcessingProps) {
  const allQueuesEmpty = isRegularQueueEmpty && isPriorityQueueEmpty

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Order Processing</CardTitle>
        <CardDescription>Move orders from queue to preparation, then to completion</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Kitchen Capacity</span>
              <span className="text-sm text-muted-foreground">{isKitchenFull ? "Full" : "Available"}</span>
            </div>
            <Progress value={isKitchenFull ? 100 : isKitchenEmpty ? 0 : 50} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button onClick={onProcessNext} disabled={allQueuesEmpty || isKitchenFull} className="w-full">
              <ChevronsRight className="mr-2 h-4 w-4" />
              Process Next Order
            </Button>

            <Button onClick={onCompleteOrder} disabled={isKitchenEmpty} variant="outline" className="w-full">
              <CheckCircle className="mr-2 h-4 w-4" />
              Complete Order
            </Button>
          </div>

          <div className="bg-muted p-3 rounded-md text-xs space-y-1">
            <p>
              <strong>Process Logic:</strong> Priority orders are processed first (VIP customers)
            </p>
            <p>
              <strong>Kitchen:</strong> Can prepare up to 5 orders simultaneously (Circular Queue)
            </p>
            <p>
              <strong>FIFO:</strong> First order in queue is the first to be processed
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
