"use client"

import { useState, useEffect } from "react"

export function useLiveOrderUpdates() {
  const [newOrderAlert, setNewOrderAlert] = useState<string | null>(null)

  useEffect(() => {
    // Simulate real-time order updates
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        // 5% chance every second
        const orderTypes = ["New order received!", "Order ready for pickup!", "Order delivered!"]
        const randomAlert = orderTypes[Math.floor(Math.random() * orderTypes.length)]
        setNewOrderAlert(randomAlert)

        // Clear alert after 5 seconds
        setTimeout(() => setNewOrderAlert(null), 5000)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return { newOrderAlert }
}
