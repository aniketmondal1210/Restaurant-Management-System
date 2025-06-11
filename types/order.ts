export enum OrderPriority {
  NORMAL = "normal",
  HIGH = "high",
}

export interface MenuItem {
  id: string
  name: string
  price: number
  quantity?: number
  categoryId?: string
  description?: string
}

export interface Order {
  id: string
  customerId?: string
  customerName: string
  items: (MenuItem & { quantity: number })[]
  total: number
  priority: OrderPriority
  status: "pending" | "preparing" | "completed"
  timestamp: string
  notes?: string
  estimatedTime?: number
}
