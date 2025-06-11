"use client"

import { useAuth } from "@/context/auth-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Phone, Star } from "lucide-react"

export function CustomerDashboardHeader() {
  const { user } = useAuth()

  // Restaurant information - this would come from the restaurant the customer is ordering from
  const restaurantInfo = {
    name: "QuickBites Downtown",
    address: "123 Main Street, Downtown District",
    phone: "(555) 123-4567",
    rating: 4.8,
    totalReviews: 1247,
    isOpen: true,
    openUntil: "11:00 PM",
    deliveryTime: "25-35 min",
    deliveryFee: 2.99,
    minimumOrder: 15.0,
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {user?.username}!</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Ready to order from your favorite restaurant?</p>
      </div>

      {/* Restaurant Info Card */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-700">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{restaurantInfo.name}</h2>
                <Badge className={`${restaurantInfo.isOpen ? "bg-green-500" : "bg-red-500"} text-white`}>
                  {restaurantInfo.isOpen ? "Open" : "Closed"}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{restaurantInfo.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>{restaurantInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>
                    {restaurantInfo.rating} ({restaurantInfo.totalReviews} reviews)
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Open until {restaurantInfo.openUntil}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center space-x-6 text-sm">
                <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full">
                  <span className="text-gray-600 dark:text-gray-400">Delivery: </span>
                  <span className="font-medium">{restaurantInfo.deliveryTime}</span>
                </div>
                <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full">
                  <span className="text-gray-600 dark:text-gray-400">Delivery fee: </span>
                  <span className="font-medium">${restaurantInfo.deliveryFee}</span>
                </div>
                <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full">
                  <span className="text-gray-600 dark:text-gray-400">Minimum: </span>
                  <span className="font-medium">${restaurantInfo.minimumOrder}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <Button className="bg-green-600 hover:bg-green-700">Start New Order</Button>
              <Button variant="outline">View Menu</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
