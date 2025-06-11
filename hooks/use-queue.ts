"use client"

import { useState } from "react"

interface QueueHook<T> {
  items: T[]
  enqueue: (item: T) => void
  dequeue: () => T | undefined
  peek: () => T | undefined
  remove: (predicate: (item: T) => boolean) => void
  clear: () => void
  isEmpty: () => boolean
  size: () => number
}

export function useQueue<T>(): QueueHook<T> {
  const [items, setItems] = useState<T[]>([])

  // Add an item to the end of the queue
  const enqueue = (item: T) => {
    setItems((prevItems) => [...prevItems, item])
  }

  // Remove and return the first item in the queue
  const dequeue = () => {
    if (items.length === 0) {
      return undefined
    }

    const item = items[0]
    setItems((prevItems) => prevItems.slice(1))
    return item
  }

  // Return the first item without removing it
  const peek = () => {
    return items.length > 0 ? items[0] : undefined
  }

  // Remove items that match the predicate
  const remove = (predicate: (item: T) => boolean) => {
    setItems((prevItems) => prevItems.filter((item) => !predicate(item)))
  }

  // Remove all items
  const clear = () => {
    setItems([])
  }

  // Check if the queue is empty
  const isEmpty = () => {
    return items.length === 0
  }

  // Get the size of the queue
  const size = () => {
    return items.length
  }

  return {
    items,
    enqueue,
    dequeue,
    peek,
    remove,
    clear,
    isEmpty,
    size,
  }
}
