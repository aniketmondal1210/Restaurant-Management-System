"use client"

import { useState } from "react"
import type { Order } from "@/types/order"

interface PriorityQueueHook<T> {
  items: T[]
  enqueue: (item: T) => void
  dequeue: () => T | undefined
  remove: (predicate: (item: T) => boolean) => void
  isEmpty: () => boolean
}

// Priority queue specifically designed for Order type
export function usePriorityQueue<T extends Order>(): PriorityQueueHook<T> {
  const [items, setItems] = useState<T[]>([])

  // Add an item to the queue based on priority and timestamp
  const enqueue = (item: T) => {
    setItems((prevItems) => {
      // Create a new array to avoid mutating the state directly
      const newItems = [...prevItems]

      // Insert the new item
      newItems.push(item)

      // Sort by priority (high first) and then by timestamp (oldest first)
      return newItems.sort((a, b) => {
        if (a.priority === b.priority) {
          // If same priority, sort by timestamp (oldest first)
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        }

        // Sort by priority (high first)
        return a.priority === "high" ? -1 : 1
      })
    })
  }

  // Remove and return the highest priority item
  const dequeue = () => {
    if (items.length === 0) {
      return undefined
    }

    const item = items[0]
    setItems((prevItems) => prevItems.slice(1))
    return item
  }

  // Remove items that match the predicate
  const remove = (predicate: (item: T) => boolean) => {
    setItems((prevItems) => prevItems.filter((item) => !predicate(item)))
  }

  // Check if the queue is empty
  const isEmpty = () => {
    return items.length === 0
  }

  return {
    items,
    enqueue,
    dequeue,
    remove,
    isEmpty,
  }
}
