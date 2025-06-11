"use client"

import { useState } from "react"
import { useMenuStore } from "@/stores/menu-store"
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
import { Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { MenuCategory } from "@/types/menu"

interface MenuCategoryCardProps {
  category: MenuCategory
}

export function MenuCategoryCard({ category }: MenuCategoryCardProps) {
  const { menuItems, removeCategory } = useMenuStore()
  const { toast } = useToast()

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const itemsInCategory = menuItems.filter((item) => item.categoryId === category.id).length

  const handleDelete = () => {
    if (itemsInCategory > 0) {
      toast({
        title: "Cannot Delete Category",
        description: `This category contains ${itemsInCategory} items. Remove or reassign them first.`,
        variant: "destructive",
      })
      setIsDeleteDialogOpen(false)
      return
    }

    removeCategory(category.id)
    setIsDeleteDialogOpen(false)
    toast({
      title: "Category Deleted",
      description: `${category.name} has been removed from the menu categories`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{category.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {category.description && <p className="text-sm text-muted-foreground">{category.description}</p>}
        <p className="text-sm mt-2">
          <span className="font-medium">{itemsInCategory}</span> items in this category
        </p>
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
                {itemsInCategory > 0
                  ? `This category contains ${itemsInCategory} items. You must remove or reassign these items before deleting the category.`
                  : `This will permanently delete the ${category.name} category. This action cannot be undone.`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className={
                  itemsInCategory > 0 ? "bg-muted text-muted-foreground" : "bg-destructive text-destructive-foreground"
                }
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}
