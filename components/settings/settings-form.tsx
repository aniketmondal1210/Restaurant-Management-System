"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export function SettingsForm() {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)

  // Restaurant settings
  const [restaurantName, setRestaurantName] = useState("QuickBites Restaurant")
  const [restaurantPhone, setRestaurantPhone] = useState("(555) 123-4567")
  const [restaurantAddress, setRestaurantAddress] = useState("123 Main St, Anytown, USA")
  const [restaurantEmail, setRestaurantEmail] = useState("info@quickbites.com")

  // System settings
  const [kitchenCapacity, setKitchenCapacity] = useState("5")
  const [priorityEnabled, setPriorityEnabled] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [soundAlertsEnabled, setSoundAlertsEnabled] = useState(true)

  const handleSave = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Settings Saved",
        description: "Your settings have been updated successfully",
      })
    }, 1000)
  }

  return (
    <Tabs defaultValue="restaurant">
      <TabsList className="w-full grid grid-cols-3">
        <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
        <TabsTrigger value="system">System</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
      </TabsList>

      <TabsContent value="restaurant" className="pt-4">
        <Card>
          <CardHeader>
            <CardTitle>Restaurant Information</CardTitle>
            <CardDescription>Manage your restaurant's basic information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="restaurant-name">Restaurant Name</Label>
              <Input id="restaurant-name" value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="restaurant-phone">Phone Number</Label>
              <Input
                id="restaurant-phone"
                value={restaurantPhone}
                onChange={(e) => setRestaurantPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="restaurant-email">Email Address</Label>
              <Input
                id="restaurant-email"
                type="email"
                value={restaurantEmail}
                onChange={(e) => setRestaurantEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="restaurant-address">Address</Label>
              <Textarea
                id="restaurant-address"
                value={restaurantAddress}
                onChange={(e) => setRestaurantAddress(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="system" className="pt-4">
        <Card>
          <CardHeader>
            <CardTitle>System Settings</CardTitle>
            <CardDescription>Configure how the order management system works</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="kitchen-capacity">Kitchen Capacity</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="kitchen-capacity"
                  type="number"
                  min="1"
                  max="20"
                  value={kitchenCapacity}
                  onChange={(e) => setKitchenCapacity(e.target.value)}
                  className="w-24"
                />
                <span className="text-sm text-muted-foreground">orders at once</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Maximum number of orders that can be prepared simultaneously
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Features</h3>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="priority-orders">Priority Orders</Label>
                  <p className="text-sm text-muted-foreground">Enable VIP/priority order processing</p>
                </div>
                <Switch id="priority-orders" checked={priorityEnabled} onCheckedChange={setPriorityEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Notifications</Label>
                  <p className="text-sm text-muted-foreground">Show notifications for new orders and status changes</p>
                </div>
                <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sound-alerts">Sound Alerts</Label>
                  <p className="text-sm text-muted-foreground">Play sound when new orders arrive</p>
                </div>
                <Switch id="sound-alerts" checked={soundAlertsEnabled} onCheckedChange={setSoundAlertsEnabled} />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="account" className="pt-4">
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account preferences and security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" value="admin" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" value="admin@quickbites.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Update Account"
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
