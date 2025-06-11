"use client"

import { useState } from "react"
import { useMenuStore } from "@/stores/menu-store"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { MenuItem } from "@/types/menu"

interface MenuItemCardProps {
  item: MenuItem
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { menuCategories, updateMenuItem, removeMenuItem } = useMenuStore()
  const { toast } = useToast()

  const category = menuCategories.find((c) => c.id === item.categoryId)

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleDelete = () => {
    removeMenuItem(item.id)
    setIsDeleteDialogOpen(false)
    toast({
      title: "Menu Item Deleted",
      description: `${item.name} has been removed from the menu`,
    })
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{item.name}</CardTitle>
          {category && <Badge variant="outline">{category.name}</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        {item.description && <p className="text-sm text-muted-foreground mb-2">{item.description}</p>}
        <p className="font-bold">${item.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
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
                This will permanently delete {item.name} from your menu. This action cannot be undone.
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
