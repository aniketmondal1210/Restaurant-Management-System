export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  orderHistory: string[]
  preferences: string[]
  createdAt: string
  updatedAt?: string
}
