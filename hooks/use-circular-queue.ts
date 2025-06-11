"use client"

import { useState } from "react"

interface CircularQueueHook<T> {
  items: T[]
  enqueue: (item: T) => boolean
  dequeue: () => T | undefined
  peek: () => T | undefined
  isEmpty: () => boolean
  isFull: () => boolean
  size: () => number
  capacity: () => number
}

export function useCircularQueue<T>(maxSize: number): CircularQueueHook<T> {
  const [items, setItems] = useState<T[]>([])
  const [front, setFront] = useState(0)
  const [rear, setRear] = useState(-1)
  const [count, setCount] = useState(0)

  // Add an item to the circular queue
  const enqueue = (item: T): boolean => {
    if (count === maxSize) {
      return false // Queue is full
    }

    const newRear = (rear + 1) % maxSize
    setRear(newRear)
    setCount((prevCount) => prevCount + 1)

    setItems((prevItems) => {
      const newItems = [...prevItems]
      // Ensure the array is large enough
      while (newItems.length <= newRear) {
        newItems.push(undefined as any)
      }
      newItems[newRear] = item
      return newItems
    })

    return true
  }

  // Remove and return the first item in the queue
  const dequeue = (): T | undefined => {
    if (count === 0) {
      return undefined
    }

    const item = items[front]
    setFront((prevFront) => (prevFront + 1) % maxSize)
    setCount((prevCount) => prevCount - 1)

    return item
  }

  // Return the first item without removing it
  const peek = (): T | undefined => {
    if (count === 0) {
      return undefined
    }
    return items[front]
  }

  // Check if the queue is empty
  const isEmpty = (): boolean => {
    return count === 0
  }

  // Check if the queue is full
  const isFull = (): boolean => {
    return count === maxSize
  }

  // Get the number of items in the queue
  const size = (): number => {
    return count
  }

  // Get the maximum capacity of the queue
  const capacity = (): number => {
    return maxSize
  }

  // Convert from circular structure to a regular array for display
  const getVisibleItems = (): T[] => {
    if (count === 0) {
      return []
    }

    const result: T[] = []
    for (let i = 0; i < count; i++) {
      const index = (front + i) % maxSize
      if (items[index] !== undefined) {
        result.push(items[index])
      }
    }
    return result
  }

  return {
    items: getVisibleItems(),
    enqueue,
    dequeue,
    peek,
    isEmpty,
    isFull,
    size,
    capacity,
  }
}
