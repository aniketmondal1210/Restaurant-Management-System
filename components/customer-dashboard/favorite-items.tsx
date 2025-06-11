"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Customer's favorite items from this restaurant
const favoriteItems = [
  {
    id: 1,
    name: "BBQ Bacon Burger",
    description: "Beef patty, bacon, BBQ sauce, onion rings",
    price: 14.99,
    image: "/placeholder.svg?height=60&width=60",
    prepTime: "18-22 min",
    lastOrdered: "2024-01-10",
    orderCount: 5,
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    description: "Pepperoni, mozzarella, tomato sauce",
    price: 18.99,
    image: "/placeholder.svg?height=60&width=60",
    prepTime: "22-28 min",
    lastOrdered: "2024-01-08",
    orderCount: 3,
  },
  {
    id: 3,
    name: "Chocolate Brownie",
    description: "Warm brownie with vanilla ice cream",
    price: 6.99,
    image: "/placeholder.svg?height=60&width=60",
    prepTime: "8-12 min",
    lastOrdered: "2024-01-12",
    orderCount: 7,
  },
]

export function FavoriteItems() {
  const [favorites, setFavorites] = useState(favoriteItems)
  const { toast } = useToast()

  const removeFavorite = (itemId: number) => {
    const item = favorites.find((f) => f.id === itemId)
    setFavorites((prev) => prev.filter((item) => item.id !== itemId))
    toast({
      title: "Removed from favorites",
      description: `${item?.name} has been removed from your favorites.`,
    })
  }

  const addToCart = (item: (typeof favoriteItems)[0]) => {
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your cart.`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Favorites</CardTitle>
        <CardDescription>Your most loved items from QuickBites Downtown</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {favorites.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Heart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No favorite items yet</p>
              <p className="text-sm">Heart items while browsing to see them here</p>
            </div>
          ) : (
            favorites.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="font-bold text-green-600">${item.price}</span>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {item.prepTime}
                      </div>
                      <span className="text-xs text-muted-foreground">Ordered {item.orderCount} times</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFavorite(item.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => addToCart(item)}>
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {favorites.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <Button variant="outline" className="w-full">
              Browse Full Menu
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
