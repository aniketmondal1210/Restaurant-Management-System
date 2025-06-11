"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { PlusCircle } from "lucide-react"
import { type Order, OrderPriority } from "@/types/order"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useCustomerStore } from "@/stores/customer-store"
import { useMenuStore } from "@/stores/menu-store"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

interface OrderFormProps {
  onSubmit: (order: Order) => void
}

export function OrderForm({ onSubmit }: OrderFormProps) {
  const [customerId, setCustomerId] = useState<string>("")
  const [customerName, setCustomerName] = useState<string>("")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [priority, setPriority] = useState<OrderPriority>(OrderPriority.NORMAL)
  const [quantity, setQuantity] = useState<{ [key: string]: number }>({})
  const [notes, setNotes] = useState<string>("")
  const [estimatedTime, setEstimatedTime] = useState<number>(15)

  const { customers } = useCustomerStore()
  const { menuItems } = useMenuStore()

  useEffect(() => {
    if (customerId) {
      const customer = customers.find((c) => c.id === customerId)
      if (customer) {
        setCustomerName(customer.name)
      }
    } else {
      setCustomerName("")
    }
  }, [customerId, customers])

  const handleItemChange = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, itemId])
      setQuantity((prev) => ({ ...prev, [itemId]: 1 }))
    } else {
      setSelectedItems(selectedItems.filter((id) => id !== itemId))
      setQuantity((prev) => {
        const newQuantity = { ...prev }
        delete newQuantity[itemId]
        return newQuantity
      })
    }
  }

  const handleQuantityChange = (itemId: string, value: string) => {
    const num = Number.parseInt(value)
    if (!isNaN(num) && num > 0) {
      setQuantity((prev) => ({ ...prev, [itemId]: num }))
    }
  }

  const calculateEstimatedTime = () => {
    // Base time of 10 minutes
    let time = 10

    // Add 2 minutes per item
    time += selectedItems.length * 2

    // Add time based on total quantity
    const totalQuantity = Object.values(quantity).reduce((sum, q) => sum + q, 0)
    time += Math.floor(totalQuantity / 3) * 5

    // VIP orders are prepared faster
    if (priority === OrderPriority.HIGH) {
      time = Math.max(8, Math.floor(time * 0.8))
    }

    setEstimatedTime(time)
  }

  useEffect(() => {
    calculateEstimatedTime()
  }, [selectedItems, quantity, priority])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if ((customerId || customerName.trim()) && selectedItems.length > 0) {
      const items = selectedItems.map((itemId) => {
        const menuItem = menuItems.find((item) => item.id === itemId)!
        return {
          ...menuItem,
          quantity: quantity[itemId] || 1,
        }
      })

      const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

      const newOrder: Order = {
        id: uuidv4(),
        customerId: customerId || undefined,
        customerName: customerName,
        items,
        total,
        priority,
        status: "pending",
        timestamp: new Date().toISOString(),
        notes: notes.trim() || undefined,
        estimatedTime,
      }

      onSubmit(newOrder)

      // Reset form
      setCustomerId("")
      setCustomerName("")
      setSelectedItems([])
      setPriority(OrderPriority.NORMAL)
      setQuantity({})
      setNotes("")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Place New Order</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Customer</Label>
            <Select value={customerId} onValueChange={setCustomerId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a customer or enter name" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">Enter new customer</SelectItem>
                {customers.map((customer) => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {!customerId && (
              <div className="mt-2">
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter customer name"
                  required={!customerId}
                />
              </div>
            )}
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Menu Items</Label>
            <div className="grid grid-cols-1 gap-3 max-h-[200px] overflow-y-auto pr-2">
              {menuItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between space-x-2 p-2 border rounded-md">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={item.id}
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={(checked) => handleItemChange(item.id, checked === true)}
                    />
                    <Label htmlFor={item.id} className="cursor-pointer">
                      <div>{item.name}</div>
                      <div className="text-sm text-muted-foreground">${item.price.toFixed(2)}</div>
                    </Label>
                  </div>
                  {selectedItems.includes(item.id) && (
                    <Input
                      type="number"
                      min="1"
                      value={quantity[item.id] || 1}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      className="w-16"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Order Notes</Label>
            <Input
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Special instructions or requests"
            />
          </div>

          <div className="space-y-2">
            <Label>Order Priority</Label>
            <RadioGroup
              value={priority}
              onValueChange={(value) => setPriority(value as OrderPriority)}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={OrderPriority.NORMAL} id="normal" />
                <Label htmlFor="normal">Normal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={OrderPriority.HIGH} id="high" />
                <Label htmlFor="high">VIP (Priority)</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="bg-muted p-3 rounded-md text-sm">
            <div className="font-medium">Estimated Preparation Time:</div>
            <div className="text-lg font-bold">{estimatedTime} minutes</div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={(!customerId && customerName.trim() === "") || selectedItems.length === 0}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Order to Queue
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
