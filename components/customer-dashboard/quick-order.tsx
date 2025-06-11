"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Minus, ShoppingCart, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Restaurant's most popular items for quick ordering
const popularItems = [
  {
    id: 1,
    name: "Classic Cheeseburger",
    description: "Beef patty, cheddar cheese, lettuce, tomato, onion",
    price: 12.99,
    image: "/placeholder.svg?height=60&width=60",
    prepTime: "15-20 min",
    isPopular: true,
    category: "Burgers",
  },
  {
    id: 2,
    name: "Margherita Pizza",
    description: "Fresh mozzarella, tomato sauce, basil",
    price: 16.99,
    image: "/placeholder.svg?height=60&width=60",
    prepTime: "20-25 min",
    isPopular: true,
    category: "Pizza",
  },
  {
    id: 3,
    name: "Caesar Salad",
    description: "Romaine lettuce, parmesan, croutons, caesar dressing",
    price: 9.99,
    image: "/placeholder.svg?height=60&width=60",
    prepTime: "10-15 min",
    category: "Salads",
  },
  {
    id: 4,
    name: "Chicken Wings (8pc)",
    description: "Buffalo wings with ranch dipping sauce",
    price: 11.99,
    image: "/placeholder.svg?height=60&width=60",
    prepTime: "18-22 min",
    isPopular: true,
    category: "Appetizers",
  },
]

export function QuickOrder() {
  const [cart, setCart] = useState<{ [key: number]: number }>({})
  const { toast } = useToast()

  const addToCart = (itemId: number) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }))

    const item = popularItems.find((i) => i.id === itemId)
    toast({
      title: "Added to cart!",
      description: `${item?.name} has been added to your cart.`,
    })
  }

  const removeFromCart = (itemId: number) => {
    setCart((prev) => {
      const newCart = { ...prev }
      if (newCart[itemId] > 1) {
        newCart[itemId]--
      } else {
        delete newCart[itemId]
      }
      return newCart
    })
  }

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0)
  }

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((sum, [itemId, count]) => {
      const item = popularItems.find((i) => i.id === Number.parseInt(itemId))
      return sum + (item ? item.price * count : 0)
    }, 0)
  }

  const handleCheckout = () => {
    if (getTotalItems() === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add some items to your cart first.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Proceeding to checkout",
      description: `${getTotalItems()} items • $${getTotalPrice().toFixed(2)}`,
    })

    // Reset cart after checkout
    setCart({})
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Order</CardTitle>
        <CardDescription>Our most popular items - order with one click</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {popularItems.map((item) => (
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
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium">{item.name}</h3>
                    {item.isPopular && (
                      <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="font-bold text-green-600">${item.price}</span>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {item.prepTime}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {cart[item.id] ? (
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => removeFromCart(item.id)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{cart[item.id]}</span>
                    <Button variant="outline" size="sm" onClick={() => addToCart(item.id)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => addToCart(item.id)}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                )}
              </div>
            </div>
          ))}

          {getTotalItems() > 0 && (
            <div className="border-t pt-4 mt-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">Cart Total: {getTotalItems()} items</span>
                <span className="text-xl font-bold text-green-600">${getTotalPrice().toFixed(2)}</span>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleCheckout}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
