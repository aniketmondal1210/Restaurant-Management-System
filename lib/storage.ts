// Local storage utilities for data persistence
export class StorageManager {
  private static prefix = "quickbites_"

  static set<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value)
      localStorage.setItem(this.prefix + key, serializedValue)
    } catch (error) {
      console.error("Failed to save to localStorage:", error)
    }
  }

  static get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(this.prefix + key)
      if (item === null) return defaultValue
      return JSON.parse(item)
    } catch (error) {
      console.error("Failed to read from localStorage:", error)
      return defaultValue
    }
  }

  static remove(key: string): void {
    try {
      localStorage.removeItem(this.prefix + key)
    } catch (error) {
      console.error("Failed to remove from localStorage:", error)
    }
  }

  static clear(): void {
    try {
      const keys = Object.keys(localStorage).filter((key) => key.startsWith(this.prefix))
      keys.forEach((key) => localStorage.removeItem(key))
    } catch (error) {
      console.error("Failed to clear localStorage:", error)
    }
  }

  static isAvailable(): boolean {
    try {
      const test = "__storage_test__"
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch {
      return false
    }
  }
}

// Analytics data storage
export class AnalyticsStorage {
  private static readonly ORDERS_KEY = "orders_history"
  private static readonly SALES_KEY = "sales_data"
  private static readonly CUSTOMER_STATS_KEY = "customer_stats"

  static saveOrder(order: any): void {
    const orders = this.getOrders()
    orders.push({
      ...order,
      completedAt: new Date().toISOString(),
    })
    StorageManager.set(this.ORDERS_KEY, orders)
    this.updateSalesData(order)
  }

  static getOrders(): any[] {
    return StorageManager.get(this.ORDERS_KEY, [])
  }

  private static updateSalesData(order: any): void {
    const salesData = StorageManager.get(this.SALES_KEY, {
      daily: {},
      weekly: {},
      monthly: {},
    })

    const date = new Date()
    const dayKey = date.toISOString().split("T")[0]
    const weekKey = this.getWeekKey(date)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`

    // Update daily sales
    if (!salesData.daily[dayKey]) {
      salesData.daily[dayKey] = { revenue: 0, orders: 0 }
    }
    salesData.daily[dayKey].revenue += order.total
    salesData.daily[dayKey].orders += 1

    // Update weekly sales
    if (!salesData.weekly[weekKey]) {
      salesData.weekly[weekKey] = { revenue: 0, orders: 0 }
    }
    salesData.weekly[weekKey].revenue += order.total
    salesData.weekly[weekKey].orders += 1

    // Update monthly sales
    if (!salesData.monthly[monthKey]) {
      salesData.monthly[monthKey] = { revenue: 0, orders: 0 }
    }
    salesData.monthly[monthKey].revenue += order.total
    salesData.monthly[monthKey].orders += 1

    StorageManager.set(this.SALES_KEY, salesData)
  }

  private static getWeekKey(date: Date): string {
    const year = date.getFullYear()
    const week = this.getWeekNumber(date)
    return `${year}-W${String(week).padStart(2, "0")}`
  }

  private static getWeekNumber(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    const dayNum = d.getUTCDay() || 7
    d.setUTCDate(d.getUTCDate() + 4 - dayNum)
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
  }

  static getSalesData(): any {
    return StorageManager.get(this.SALES_KEY, {
      daily: {},
      weekly: {},
      monthly: {},
    })
  }

  static getTodayStats(): { revenue: number; orders: number } {
    const salesData = this.getSalesData()
    const today = new Date().toISOString().split("T")[0]
    return salesData.daily[today] || { revenue: 0, orders: 0 }
  }

  static getWeekStats(): { revenue: number; orders: number } {
    const salesData = this.getSalesData()
    const thisWeek = this.getWeekKey(new Date())
    return salesData.weekly[thisWeek] || { revenue: 0, orders: 0 }
  }

  static getMonthStats(): { revenue: number; orders: number } {
    const salesData = this.getSalesData()
    const date = new Date()
    const thisMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
    return salesData.monthly[thisMonth] || { revenue: 0, orders: 0 }
  }
}
