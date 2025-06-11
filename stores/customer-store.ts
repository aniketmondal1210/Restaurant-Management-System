import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Customer } from "@/types/customer"

interface CustomerState {
  customers: Customer[]
  addCustomer: (customer: Customer) => void
  updateCustomer: (id: string, updates: Partial<Customer>) => void
  removeCustomer: (id: string) => void
  getCustomer: (id: string) => Customer | undefined
}

export const useCustomerStore = create<CustomerState>()(
  persist(
    (set, get) => ({
      customers: [
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          phone: "+1-555-0123",
          address: "123 Main St, City",
          orderHistory: [],
          preferences: [],
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          phone: "+1-555-0456",
          address: "456 Oak Ave, City",
          orderHistory: [],
          preferences: [],
          createdAt: new Date().toISOString(),
        },
        {
          id: "3",
          name: "Bob Johnson",
          email: "bob@example.com",
          phone: "+1-555-0789",
          address: "789 Pine St, City",
          orderHistory: [],
          preferences: [],
          createdAt: new Date().toISOString(),
        },
      ],
      addCustomer: (customer) =>
        set((state) => ({
          customers: [...state.customers, customer],
        })),
      updateCustomer: (id, updates) =>
        set((state) => ({
          customers: state.customers.map((customer) => (customer.id === id ? { ...customer, ...updates } : customer)),
        })),
      removeCustomer: (id) =>
        set((state) => ({
          customers: state.customers.filter((customer) => customer.id !== id),
        })),
      getCustomer: (id) => get().customers.find((customer) => customer.id === id),
    }),
    {
      name: "customer-storage",
    },
  ),
)
