"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, ShoppingCart, Search, Clock, Plus, Minus, MapPin, Phone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Restaurant's complete menu
const menuCategories = [
  { id: "all", name: "All Items", count: 32 },
  { id: "burgers", name: "Burgers", count: 8 },
  { id: "pizza", name: "Pizza", count: 6 },
  { id: "appetizers", name: "Appetizers", count: 5 },
  { id: "salads", name: "Salads", count: 4 },
  { id: "desserts", name: "Desserts", count: 5 },
  { id: "drinks", name: "Drinks", count: 4 },
]

const menuItems = [
  // Burgers
  {
    id: 1,
    name: "Classic Cheeseburger",
    description: "Beef patty, cheddar cheese, lettuce, tomato, onion, pickles",
    price: 12.99,
    category: "burgers",
    image: "/placeholder.svg?height=200&width=200",
    prepTime: "15-20 min",
    isPopular: true,
    calories: 650,
  },
  {
    id: 2,
    name: "BBQ Bacon Burger",
    description: "Beef patty, bacon, BBQ sauce, onion rings, cheddar cheese",
    price: 14.99,
    category: "burgers",
    image: "/placeholder.svg?height=200&width=200",
    prepTime: "18-22 min",
    isPopular: true,
    calories: 780,
  },
  {
    id: 3,
    name: "Veggie Burger",
    description: "Plant-based patty, avocado, sprouts, tomato, vegan mayo",
    price: 13.99,
    category: "burgers",
    image: "/placeholder.svg?height=200&width=200",
    prepTime: "15-20 min",
    isVegetarian: true,
    calories: 520,
  },
  // Pizza
  {
    id: 4,
    name: "Margherita Pizza",
    description: "Fresh mozzarella, tomato sauce, basil, olive oil",
    price: 16.99,
    category: "pizza",
    image: "/placeholder.svg?height=200&width=200",
    prepTime: "20-25 min",
    isVegetarian: true,
    isPopular: true,
    calories: 850,
  },
  {
    id: 5,
    name: "Pepperoni Pizza",
    description: "Pepperoni, mozzarella cheese, tomato sauce",
    price: 18.99,
    category: "pizza",
    image: "/placeholder.svg?height=200&width=200",
    prepTime: "22-28 min",
    isPopular: true,
    calories: 920,
  },
  // Appetizers
  {
    id: 6,
    name: "Chicken Wings (8pc)",
    description: "Buffalo wings with ranch or blue cheese dipping sauce",
    price: 11.99,
    category: "appetizers",
    image: "/placeholder.svg?height=200&width=200",
    prepTime: "18-22 min",
    isPopular: true,
    calories: 640,
  },
  {
    id: 7,
    name: "Mozzarella Sticks",
    description: "Breaded mozzarella with marinara dipping sauce",
    price: 8.99,
    category: "appetizers",
    image: "/placeholder.svg?height=200&width=200",
    prepTime: "12-15 min",
    isVegetarian: true,
    calories: 480,
  },
  // Salads
  {
    id: 8,
    name: "Caesar Salad",
    description: "Romaine lettuce, parmesan, croutons, caesar dressing",
    price: 9.99,
    category: "salads",
    image: "/placeholder.svg?height=200&width=200",
    prepTime: "10-15 min",
    isVegetarian: true,
    calories: 320,
  },
  {
    id: 9,
    name: "Grilled Chicken Salad",
    description: "Mixed greens, grilled chicken, tomatoes, cucumbers, balsamic",
    price: 12.99,
    category: "salads",
    image: "/placeholder.svg?height=200&width=200",
    prepTime: "12-18 min",
    isHealthy: true,
    calories: 380,
  },
  // Desserts
  {
    id: 10,
    name: "Chocolate Brownie",
    description: "Warm brownie with vanilla ice cream and chocolate sauce",
    price: 6.99,
    category: "desserts",
    image: "/placeholder.svg?height=200&width=200",
    prepTime: "8-12 min",
    isPopular: true,
    calories: 520,
  },
  {
    id: 11,
    name: "Cheesecake Slice",
    description: "New York style cheesecake with berry compote",
    price: 7.99,
    category: "desserts",
    image: "/placeholder.svg?height=200&width=200",
    prepTime: "5 min",
    calories: 450,
  },
  // Drinks
  {
    id: 12,
    name: "Coca Cola",
    description: "Classic Coca Cola (12oz)",
    price: 2.99,
    category: "drinks",
    image: "/placeholder.svg?height=200&width=200",
    prepTime: "1 min",
    calories: 140,
  },
  {
    id: 13,
    name: "Fresh Lemonade",
    description: "House-made lemonade with fresh lemons",
    price: 3.99,
    category: "drinks",
    image: "/placeholder.svg?height=200&width=200",
    prepTime: "2 min",
    calories: 120,
  },
]

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [cart, setCart] = useState<{ [key: number]: number }>({})
  const [favorites, setFavorites] = useState<number[]>([1, 4, 6, 10]) // Pre-populated favorites
  const { toast } = useToast()

  const restaurantInfo = {
    name: "QuickBites Downtown",
    address: "123 Main Street, Downtown District",
    phone: "(555) 123-4567",
    deliveryTime: "25-35 min",
    deliveryFee: 2.99,
    minimumOrder: 15.0,
  }

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const addToCart = (itemId: number) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }))

    const item = menuItems.find((i) => i.id === itemId)
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

  const toggleFavorite = (itemId: number) => {
    setFavorites((prev) => {
      const isFavorite = prev.includes(itemId)
      const item = menuItems.find((i) => i.id === itemId)

      if (isFavorite) {
        toast({
          title: "Removed from favorites",
          description: `${item?.name} has been removed from your favorites.`,
        })
        return prev.filter((id) => id !== itemId)
      } else {
        toast({
          title: "Added to favorites!",
          description: `${item?.name} has been added to your favorites.`,
        })
        return [...prev, itemId]
      }
    })
  }

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0)
  }

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((sum, [itemId, count]) => {
      const item = menuItems.find((i) => i.id === Number.parseInt(itemId))
      return sum + (item ? item.price * count : 0)
    }, 0)
  }

  return (
    <div className="space-y-6">
      {/* Restaurant Header */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{restaurantInfo.name} Menu</h1>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{restaurantInfo.address}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Phone className="h-4 w-4" />
                  <span>{restaurantInfo.phone}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4 mt-2 text-sm">
                <Badge variant="outline">🚚 {restaurantInfo.deliveryTime}</Badge>
                <Badge variant="outline">💰 ${restaurantInfo.deliveryFee} delivery</Badge>
                <Badge variant="outline">📦 ${restaurantInfo.minimumOrder} minimum</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search our menu..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Categories */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
          {menuCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="text-xs">
              {category.name}
              <Badge variant="secondary" className="ml-1 text-xs">
                {category.count}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {menuCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`absolute top-2 right-2 ${
                        favorites.includes(item.id)
                          ? "text-red-500 hover:text-red-600"
                          : "text-gray-400 hover:text-red-500"
                      }`}
                      onClick={() => toggleFavorite(item.id)}
                    >
                      <Heart className={`h-5 w-5 ${favorites.includes(item.id) ? "fill-current" : ""}`} />
                    </Button>

                    <div className="absolute top-2 left-2 flex flex-col space-y-1">
                      {item.isPopular && <Badge className="bg-orange-500">Popular</Badge>}
                      {item.isVegetarian && <Badge className="bg-green-500">Vegetarian</Badge>}
                      {item.isHealthy && <Badge className="bg-blue-500">Healthy</Badge>}
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <span className="text-lg font-bold text-green-600">${item.price}</span>
                    </div>
                    <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {item.prepTime}
                        </span>
                        <span>{item.calories} cal</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
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
                        <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => addToCart(item.id)}>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Cart Summary */}
      {getTotalItems() > 0 && (
        <Card className="fixed bottom-4 right-4 w-80 shadow-lg z-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Cart ({getTotalItems()} items)</span>
              <span className="text-xl font-bold text-green-600">${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="text-xs text-muted-foreground mb-3">
              {getTotalPrice() < restaurantInfo.minimumOrder && (
                <p className="text-orange-600">
                  Add ${(restaurantInfo.minimumOrder - getTotalPrice()).toFixed(2)} more for delivery
                </p>
              )}
            </div>
            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={getTotalPrice() < restaurantInfo.minimumOrder}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {getTotalPrice() >= restaurantInfo.minimumOrder ? "Proceed to Checkout" : "Add More Items"}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
