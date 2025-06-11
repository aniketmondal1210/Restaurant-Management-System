import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { MenuItem } from "@/types/menu"

interface MenuState {
  menuItems: MenuItem[]
  addMenuItem: (item: MenuItem) => void
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void
  removeMenuItem: (id: string) => void
  getMenuItem: (id: string) => MenuItem | undefined
  getMenuItemsByCategory: (category: string) => MenuItem[]
}

export const useMenuStore = create<MenuState>()(
  persist(
    (set, get) => ({
      menuItems: [
        {
          id: "1",
          name: "Classic Cheeseburger",
          description: "Beef patty, cheddar cheese, lettuce, tomato, onion, pickles",
          price: 12.99,
          category: "burgers",
          image: "/placeholder.svg?height=200&width=200",
          available: true,
          prepTime: 15,
          ingredients: ["beef", "cheese", "lettuce", "tomato", "onion", "pickles"],
          allergens: ["dairy", "gluten"],
          calories: 650,
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          name: "Margherita Pizza",
          description: "Fresh mozzarella, tomato sauce, basil, olive oil",
          price: 16.99,
          category: "pizza",
          image: "/placeholder.svg?height=200&width=200",
          available: true,
          prepTime: 20,
          ingredients: ["mozzarella", "tomato sauce", "basil", "olive oil"],
          allergens: ["dairy", "gluten"],
          calories: 850,
          createdAt: new Date().toISOString(),
        },
        {
          id: "3",
          name: "Caesar Salad",
          description: "Romaine lettuce, parmesan, croutons, caesar dressing",
          price: 9.99,
          category: "salads",
          image: "/placeholder.svg?height=200&width=200",
          available: true,
          prepTime: 10,
          ingredients: ["romaine lettuce", "parmesan", "croutons", "caesar dressing"],
          allergens: ["dairy", "gluten"],
          calories: 320,
          createdAt: new Date().toISOString(),
        },
        {
          id: "4",
          name: "Chicken Wings",
          description: "Buffalo wings with ranch or blue cheese dipping sauce",
          price: 11.99,
          category: "appetizers",
          image: "/placeholder.svg?height=200&width=200",
          available: true,
          prepTime: 18,
          ingredients: ["chicken wings", "buffalo sauce", "ranch dressing"],
          allergens: ["dairy"],
          calories: 640,
          createdAt: new Date().toISOString(),
        },
        {
          id: "5",
          name: "Chocolate Brownie",
          description: "Warm brownie with vanilla ice cream and chocolate sauce",
          price: 6.99,
          category: "desserts",
          image: "/placeholder.svg?height=200&width=200",
          available: true,
          prepTime: 8,
          ingredients: ["brownie", "vanilla ice cream", "chocolate sauce"],
          allergens: ["dairy", "gluten", "eggs"],
          calories: 520,
          createdAt: new Date().toISOString(),
        },
      ],
      addMenuItem: (item) =>
        set((state) => ({
          menuItems: [...state.menuItems, item],
        })),
      updateMenuItem: (id, updates) =>
        set((state) => ({
          menuItems: state.menuItems.map((item) => (item.id === id ? { ...item, ...updates } : item)),
        })),
      removeMenuItem: (id) =>
        set((state) => ({
          menuItems: state.menuItems.filter((item) => item.id !== id),
        })),
      getMenuItem: (id) => get().menuItems.find((item) => item.id === id),
      getMenuItemsByCategory: (category) => get().menuItems.filter((item) => item.category === category),
    }),
    {
      name: "menu-storage",
    },
  ),
)
