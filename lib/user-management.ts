import { StorageManager } from "./storage"

export interface User {
  id: string
  username: string
  email: string
  password: string
  role: "customer" | "staff" | "admin"
  fullName: string
  phone?: string
  restaurantName?: string
  createdAt: string
  isActive: boolean
  lastLogin?: string
}

export class UserManager {
  private static readonly USERS_KEY = "registered_users"

  static createUser(userData: Omit<User, "id">): User {
    const users = this.getAllUsers()

    const newUser: User = {
      ...userData,
      id: this.generateUserId(),
    }

    users.push(newUser)
    StorageManager.set(this.USERS_KEY, users)

    return newUser
  }

  static getAllUsers(): User[] {
    return StorageManager.get(this.USERS_KEY, [])
  }

  static getUserByUsername(username: string): User | null {
    const users = this.getAllUsers()
    return users.find((user) => user.username === username) || null
  }

  static getUserByEmail(email: string): User | null {
    const users = this.getAllUsers()
    return users.find((user) => user.email === email) || null
  }

  static userExists(username: string): boolean {
    return this.getUserByUsername(username) !== null
  }

  static emailExists(email: string): boolean {
    return this.getUserByEmail(email) !== null
  }

  static validateCredentials(username: string, password: string): User | null {
    const user = this.getUserByUsername(username)
    if (user && user.password === password && user.isActive) {
      // Update last login
      this.updateLastLogin(user.id)
      return user
    }
    return null
  }

  static updateLastLogin(userId: string): void {
    const users = this.getAllUsers()
    const userIndex = users.findIndex((user) => user.id === userId)

    if (userIndex !== -1) {
      users[userIndex].lastLogin = new Date().toISOString()
      StorageManager.set(this.USERS_KEY, users)
    }
  }

  static updateUser(userId: string, updates: Partial<User>): boolean {
    const users = this.getAllUsers()
    const userIndex = users.findIndex((user) => user.id === userId)

    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates }
      StorageManager.set(this.USERS_KEY, users)
      return true
    }
    return false
  }

  static deactivateUser(userId: string): boolean {
    return this.updateUser(userId, { isActive: false })
  }

  static activateUser(userId: string): boolean {
    return this.updateUser(userId, { isActive: true })
  }

  static deleteUser(userId: string): boolean {
    const users = this.getAllUsers()
    const filteredUsers = users.filter((user) => user.id !== userId)

    if (filteredUsers.length !== users.length) {
      StorageManager.set(this.USERS_KEY, filteredUsers)
      return true
    }
    return false
  }

  static getUserStats(): {
    total: number
    active: number
    customers: number
    admins: number
    staff: number
    recentSignups: number
  } {
    const users = this.getAllUsers()
    const now = new Date()
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    return {
      total: users.length,
      active: users.filter((user) => user.isActive).length,
      customers: users.filter((user) => user.role === "customer").length,
      admins: users.filter((user) => user.role === "admin").length,
      staff: users.filter((user) => user.role === "staff").length,
      recentSignups: users.filter((user) => new Date(user.createdAt) > sevenDaysAgo).length,
    }
  }

  private static generateUserId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Initialize with demo users if none exist
  static initializeDemoUsers(): void {
    const existingUsers = this.getAllUsers()

    if (existingUsers.length === 0) {
      const demoUsers: Omit<User, "id">[] = [
        // Admin users
        {
          username: "admin",
          email: "admin@quickbites.com",
          password: "admin123",
          role: "admin",
          fullName: "System Administrator",
          restaurantName: "QuickBites Demo Restaurant",
          createdAt: new Date().toISOString(),
          isActive: true,
        },
        {
          username: "manager",
          email: "manager@quickbites.com",
          password: "manager456",
          role: "admin",
          fullName: "Restaurant Manager",
          restaurantName: "QuickBites Main Branch",
          createdAt: new Date().toISOString(),
          isActive: true,
        },
        // Staff users
        {
          username: "john_staff",
          email: "john@quickbites.com",
          password: "staff123",
          role: "staff",
          fullName: "John Smith",
          createdAt: new Date().toISOString(),
          isActive: true,
        },
        {
          username: "sarah_staff",
          email: "sarah@quickbites.com",
          password: "staff456",
          role: "staff",
          fullName: "Sarah Johnson",
          createdAt: new Date().toISOString(),
          isActive: true,
        },
        {
          username: "mike_staff",
          email: "mike@quickbites.com",
          password: "staff789",
          role: "staff",
          fullName: "Mike Wilson",
          createdAt: new Date().toISOString(),
          isActive: true,
        },
        // Customer users
        {
          username: "customer1",
          email: "customer1@example.com",
          password: "customer123",
          role: "customer",
          fullName: "Alice Brown",
          phone: "+1-555-0101",
          createdAt: new Date().toISOString(),
          isActive: true,
        },
        {
          username: "customer2",
          email: "customer2@example.com",
          password: "customer456",
          role: "customer",
          fullName: "Bob Davis",
          phone: "+1-555-0102",
          createdAt: new Date().toISOString(),
          isActive: true,
        },
        {
          username: "customer3",
          email: "customer3@example.com",
          password: "customer789",
          role: "customer",
          fullName: "Carol Miller",
          phone: "+1-555-0103",
          createdAt: new Date().toISOString(),
          isActive: true,
        },
      ]

      demoUsers.forEach((userData) => this.createUser(userData))
    }
  }
}
