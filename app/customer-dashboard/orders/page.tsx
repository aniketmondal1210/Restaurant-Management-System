"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Star, RotateCcw, MessageCircle, Phone, Navigation } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Customer's orders from QuickBites Downtown
const orders = [
  {
    id: "QB-001",
    items: [
      { name: "BBQ Bacon Burger", quantity: 1, price: 14.99 },
      { name: "French Fries", quantity: 1, price: 4.99 },
      { name: "Coca Cola", quantity: 1, price: 2.99 },
    ],
    total: 22.97,
    subtotal: 22.97,
    deliveryFee: 2.99,
    tax: 2.07,
    grandTotal: 28.03,
    status: "in_progress",
    orderTime: "2024-01-16 19:45",
    estimatedDelivery: "2024-01-16 20:30",
    restaurant: {
      name: "QuickBites Downtown",
      phone: "(555) 123-4567",
      address: "123 Main Street, Downtown District",
    },
    driver: {
      name: "Mike Johnson",
      phone: "(555) 987-6543",
      rating: 4.9,
      vehicle: "Honda Civic - ABC 123",
    },
    trackingSteps: [
      { status: "confirmed", time: "19:45", completed: true },
      { status: "preparing", time: "19:50", completed: true },
      { status: "ready", time: "20:05", completed: true },
      { status: "picked_up", time: "20:10", completed: true },
      { status: "on_way", time: "20:15", completed: false },
      { status: "delivered", time: "20:30", completed: false },
    ],
  },
  {
    id: "QB-002",
    items: [
      { name: "Margherita Pizza", quantity: 1, price: 16.99 },
      { name: "Caesar Salad", quantity: 1, price: 9.99 },
      { name: "Chocolate Brownie", quantity: 1, price: 6.99 },
    ],
    total: 33.97,
    subtotal: 33.97,
    deliveryFee: 2.99,
    tax: 3.32,
    grandTotal: 40.28,
    status: "delivered",
    orderTime: "2024-01-14 18:30",
    deliveredAt: "2024-01-14 19:05",
    rating: 5,
    review: "Amazing food! Pizza was perfect and delivery was super fast.",
  },
  {
    id: "QB-003",
    items: [
      { name: "Grilled Chicken Salad", quantity: 1, price: 12.99 },
      { name: "Fresh Lemonade", quantity: 1, price: 3.99 },
    ],
    total: 16.98,
    subtotal: 16.98,
    deliveryFee: 2.99,
    tax: 1.78,
    grandTotal: 21.75,
    status: "delivered",
    orderTime: "2024-01-12 12:15",
    deliveredAt: "2024-01-12 12:50",
    rating: 4,
  },
]

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("active")
  const { toast } = useToast()

  const activeOrders = orders.filter((order) => order.status === "in_progress" || order.status === "preparing")
  const completedOrders = orders.filter((order) => order.status === "delivered" || order.status === "cancelled")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "preparing":
        return <Badge className="bg-yellow-500">Preparing</Badge>
      case "in_progress":
        return <Badge className="bg-blue-500">On the Way</Badge>
      case "delivered":
        return <Badge className="bg-green-500">Delivered</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleReorder = (order: (typeof orders)[0]) => {
    toast({
      title: "Added to cart!",
      description: `${order.items.length} items from QuickBites Downtown have been added to your cart.`,
    })
  }

  const handleContactRestaurant = () => {
    toast({
      title: "Calling restaurant",
      description: `Calling QuickBites Downtown at (555) 123-4567`,
    })
  }

  const handleContactDriver = (driver: any) => {
    toast({
      title: "Calling driver",
      description: `Calling ${driver.name} at ${driver.phone}`,
    })
  }

  const handleTrackOrder = (orderId: string) => {
    toast({
      title: "Live tracking",
      description: `Opening live map tracking for order ${orderId}`,
    })
  }

  const getTrackingStatus = (order: any) => {
    const currentStep = order.trackingSteps?.findIndex((step: any) => !step.completed) || 0
    const totalSteps = order.trackingSteps?.length || 0
    return { currentStep, totalSteps }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Orders</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Track your orders from QuickBites Downtown</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">Active Orders ({activeOrders.length})</TabsTrigger>
          <TabsTrigger value="history">Order History ({completedOrders.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeOrders.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">No active orders</h3>
                <p className="text-muted-foreground">When you place an order, it will appear here for tracking.</p>
                <Button className="mt-4 bg-green-600 hover:bg-green-700">Order Now</Button>
              </CardContent>
            </Card>
          ) : (
            activeOrders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>Order {order.id}</span>
                        {getStatusBadge(order.status)}
                      </CardTitle>
                      <CardDescription>
                        Ordered at {new Date(order.orderTime).toLocaleTimeString()} • QuickBites Downtown
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">${order.grandTotal.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">
                        Est. delivery: {new Date(order.estimatedDelivery!).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6 p-6">
                  {/* Order Tracking */}
                  {order.trackingSteps && (
                    <div>
                      <h4 className="font-medium mb-3">Order Progress</h4>
                      <div className="space-y-2">
                        {order.trackingSteps.map((step, index) => (
                          <div key={step.status} className="flex items-center space-x-3">
                            <div
                              className={`w-4 h-4 rounded-full ${step.completed ? "bg-green-500" : "bg-gray-300"}`}
                            />
                            <div className="flex-1">
                              <span
                                className={`text-sm ${
                                  step.completed ? "text-green-600 font-medium" : "text-muted-foreground"
                                }`}
                              >
                                {step.status.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                              </span>
                              {step.completed && (
                                <span className="text-xs text-muted-foreground ml-2">{step.time}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Order Items */}
                  <div>
                    <h4 className="font-medium mb-3">Order Items</h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>
                            {item.quantity}x {item.name}
                          </span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="border-t pt-2 mt-2 space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>${order.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Delivery Fee</span>
                          <span>${order.deliveryFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax</span>
                          <span>${order.tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span>Total</span>
                          <span>${order.grandTotal.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Driver Info */}
                  {order.driver && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">{order.driver.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-medium">{order.driver.name}</p>
                            <p className="text-sm text-muted-foreground flex items-center">
                              <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                              {order.driver.rating} • {order.driver.vehicle}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleContactDriver(order.driver)}>
                            <Phone className="h-4 w-4 mr-1" />
                            Call
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleTrackOrder(order.id)}>
                            <Navigation className="h-4 w-4 mr-1" />
                            Track
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1" onClick={() => handleTrackOrder(order.id)}>
                      <Navigation className="h-4 w-4 mr-1" />
                      Live Tracking
                    </Button>
                    <Button variant="outline" onClick={handleContactRestaurant}>
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Contact Restaurant
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {completedOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <span>Order {order.id}</span>
                      {getStatusBadge(order.status)}
                    </CardTitle>
                    <CardDescription>
                      QuickBites Downtown • {new Date(order.orderTime).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">${order.grandTotal.toFixed(2)}</p>
                    {order.rating && (
                      <div className="flex items-center justify-end mt-1">
                        <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{order.rating}/5</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Order Items */}
                <div>
                  <h4 className="font-medium mb-2">Order Items</h4>
                  <div className="space-y-1">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review */}
                {order.review && (
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm italic">"{order.review}"</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1" onClick={() => handleReorder(order)}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reorder
                  </Button>
                  <Button variant="outline" onClick={handleContactRestaurant}>
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
