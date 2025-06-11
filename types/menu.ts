export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image?: string
  available: boolean
  prepTime: number
  ingredients: string[]
  allergens: string[]
  calories: number
  createdAt: string
  updatedAt?: string
}
