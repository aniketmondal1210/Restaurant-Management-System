"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { UserManager, type User } from "@/lib/user-management"
import { useToast } from "@/hooks/use-toast"
import { Search, Users, Shield, UserCheck, UserX, Trash2, Calendar, ShoppingCart } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    customers: 0,
    admins: 0,
    staff: 0,
    recentSignups: 0,
  })
  const { toast } = useToast()

  useEffect(() => {
    loadUsers()
    loadStats()
  }, [])

  const loadUsers = () => {
    const allUsers = UserManager.getAllUsers()
    setUsers(allUsers)
  }

  const loadStats = () => {
    const userStats = UserManager.getUserStats()
    setStats(userStats)
  }

  const handleToggleUserStatus = (userId: string, currentStatus: boolean) => {
    const success = currentStatus ? UserManager.deactivateUser(userId) : UserManager.activateUser(userId)

    if (success) {
      loadUsers()
      loadStats()
      toast({
        title: currentStatus ? "User deactivated" : "User activated",
        description: `User has been ${currentStatus ? "deactivated" : "activated"} successfully.`,
      })
    }
  }

  const handleDeleteUser = (userId: string) => {
    const success = UserManager.deleteUser(userId)

    if (success) {
      loadUsers()
      loadStats()
      toast({
        title: "User deleted",
        description: "User has been permanently deleted.",
        variant: "destructive",
      })
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.restaurantName && user.restaurantName.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
      case "staff":
        return <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      case "customer":
        return <ShoppingCart className="h-5 w-5 text-green-600 dark:text-green-400" />
      default:
        return <Users className="h-5 w-5 text-gray-600 dark:text-gray-400" />
    }
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "default"
      case "staff":
        return "secondary"
      case "customer":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Total Users</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserCheck className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm font-medium">Active</p>
                <p className="text-2xl font-bold">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm font-medium">Customers</p>
                <p className="text-2xl font-bold">{stats.customers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Staff</p>
                <p className="text-2xl font-bold">{stats.staff}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Admins</p>
                <p className="text-2xl font-bold">{stats.admins}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-indigo-500" />
              <div>
                <p className="text-sm font-medium">New (7d)</p>
                <p className="text-2xl font-bold">{stats.recentSignups}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User List */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage user accounts and permissions across all user types</CardDescription>

          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      user.role === "admin"
                        ? "bg-purple-100 dark:bg-purple-900"
                        : user.role === "staff"
                          ? "bg-blue-100 dark:bg-blue-900"
                          : "bg-green-100 dark:bg-green-900"
                    }`}
                  >
                    {getRoleIcon(user.role)}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{user.fullName}</h3>
                      <Badge variant={getRoleBadgeVariant(user.role)}>{user.role}</Badge>
                      <Badge variant={user.isActive ? "default" : "destructive"}>
                        {user.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      @{user.username} • {user.email}
                    </p>
                    {user.phone && <p className="text-sm text-muted-foreground">📞 {user.phone}</p>}
                    {user.restaurantName && <p className="text-sm text-muted-foreground">🏪 {user.restaurantName}</p>}
                    <p className="text-xs text-muted-foreground">
                      Joined: {formatDate(user.createdAt)}
                      {user.lastLogin && ` • Last login: ${formatDate(user.lastLogin)}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleToggleUserStatus(user.id, user.isActive)}>
                    {user.isActive ? (
                      <>
                        <UserX className="h-4 w-4 mr-1" />
                        Deactivate
                      </>
                    ) : (
                      <>
                        <UserCheck className="h-4 w-4 mr-1" />
                        Activate
                      </>
                    )}
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete User</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to permanently delete {user.fullName} (@{user.username})? This action
                          cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteUser(user.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}

            {filteredUsers.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                {searchQuery ? "No users found matching your search." : "No users found."}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
