"use client"

import { useState } from "react"
import { useCustomerStore } from "@/stores/customer-store"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Mail, Phone, MapPin, Calendar, ShoppingBag, DollarSign, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Customer } from "@/types/customer"

interface CustomerCardProps {
  customer: Customer
}

export function CustomerCard({ customer }: CustomerCardProps) {
  const { removeCustomer } = useCustomerStore()
  const { toast } = useToast()

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const handleDelete = () => {
    removeCustomer(customer.id)
    setIsDeleteDialogOpen(false)
    toast({
      title: "Customer Deleted",
      description: `${customer.name} has been removed from your customer database`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{customer.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {customer.phone && (
          <div className="flex items-center text-sm">
            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{customer.phone}</span>
          </div>
        )}
        {customer.email && (
          <div className="flex items-center text-sm">
            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{customer.email}</span>
          </div>
        )}
        <div className="flex items-center text-sm">
          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>Joined: {formatDate(customer.joinDate)}</span>
        </div>
        <div className="flex items-center text-sm">
          <ShoppingBag className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{customer.orderCount} orders</span>
        </div>
        <div className="flex items-center text-sm">
          <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>Total spent: ${customer.totalSpent.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{customer.name}</DialogTitle>
              <DialogDescription>Customer details and order history</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <h3 className="font-medium">Contact Information</h3>
                <div className="space-y-1 text-sm">
                  {customer.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{customer.phone}</span>
                    </div>
                  )}
                  {customer.email && (
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{customer.email}</span>
                    </div>
                  )}
                  {customer.address && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{customer.address}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Customer Statistics</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-muted p-2 rounded-md">
                    <div className="text-xs text-muted-foreground">Total Orders</div>
                    <div className="text-lg font-bold">{customer.orderCount}</div>
                  </div>
                  <div className="bg-muted p-2 rounded-md">
                    <div className="text-xs text-muted-foreground">Total Spent</div>
                    <div className="text-lg font-bold">${customer.totalSpent.toFixed(2)}</div>
                  </div>
                  <div className="bg-muted p-2 rounded-md">
                    <div className="text-xs text-muted-foreground">Customer Since</div>
                    <div className="text-lg font-bold">{formatDate(customer.joinDate)}</div>
                  </div>
                  <div className="bg-muted p-2 rounded-md">
                    <div className="text-xs text-muted-foreground">Avg. Order Value</div>
                    <div className="text-lg font-bold">
                      ${customer.orderCount > 0 ? (customer.totalSpent / customer.orderCount).toFixed(2) : "0.00"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Recent Orders</h3>
                <div className="text-center py-4 text-muted-foreground text-sm">Order history would appear here</div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete {customer.name} from your customer database. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}
