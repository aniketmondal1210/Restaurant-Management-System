"use client"

import type React from "react"

import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { PlusCircle } from "lucide-react"
import { type Order, OrderPriority, type MenuItem } from "@/types/order"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

interface OrderFormProps {
  onSubmit: (order: Order) => void
}

const MENU_ITEMS: MenuItem[] = [
  { id: "burger", name: "Burger", price: 5.99 },
  { id: "fries", name: "Fries", price: 2.99 },
  { id: "pizza", name: "Pizza", price: 8.99 },
  { id: "drink", name: "Drink", price: 1.99 },
  { id: "salad", name: "Salad", price: 4.99 },
]

export function OrderForm({ onSubmit }: OrderFormProps) {
  const [customerName, setCustomerName] = useState("")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [priority, setPriority] = useState<OrderPriority>(OrderPriority.NORMAL)
  const [quantity, setQuantity] = useState<{ [key: string]: number }>({})

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (customerName.trim() === "" || selectedItems.length === 0) {
      return
    }

    const items = selectedItems.map((itemId) => {
      const menuItem = MENU_ITEMS.find((item) => item.id === itemId)!
      return {
        ...menuItem,
        quantity: quantity[itemId] || 1,
      }
    })

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const newOrder: Order = {
      id: uuidv4(),
      customerName,
      items,
      total,
      priority,
      status: "pending",
      timestamp: new Date().toISOString(),
    }

    onSubmit(newOrder)

    // Reset form
    setCustomerName("")
    setSelectedItems([])
    setPriority(OrderPriority.NORMAL)
    setQuantity({})
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Place New Order</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Menu Items</Label>
            <div className="grid grid-cols-1 gap-3">
              {MENU_ITEMS.map((item) => (
                <div key={item.id} className="flex items-center justify-between space-x-2 p-2 border rounded-md">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={item.id}
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={(checked) => handleItemChange(item.id, checked === true)}
                    />
                    <Label htmlFor={item.id} className="cursor-pointer">
                      {item.name} - ${item.price.toFixed(2)}
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

          <Button type="submit" className="w-full" disabled={customerName.trim() === "" || selectedItems.length === 0}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Order to Queue
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
