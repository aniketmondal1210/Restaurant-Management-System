"use client"

import { useState } from "react"
import { useMenuStore } from "@/stores/menu-store"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MenuItemCard } from "@/components/menu/menu-item-card"
import { MenuCategoryCard } from "@/components/menu/menu-category-card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { v4 as uuidv4 } from "uuid"
import { Loader2, Plus } from "lucide-react"

export function MenuManagement() {
  const { menuItems, menuCategories, addMenuItem, addCategory } = useMenuStore()
  const { toast } = useToast()

  const [newItemName, setNewItemName] = useState("")
  const [newItemPrice, setNewItemPrice] = useState("")
  const [newItemCategory, setNewItemCategory] = useState("")
  const [newItemDescription, setNewItemDescription] = useState("")

  const [newCategoryName, setNewCategoryName] = useState("")
  const [newCategoryDescription, setNewCategoryDescription] = useState("")

  const [isAddingItem, setIsAddingItem] = useState(false)
  const [isAddingCategory, setIsAddingCategory] = useState(false)

  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false)
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)

  const handleAddMenuItem = () => {
    if (!newItemName || !newItemPrice || !newItemCategory) return

    setIsAddingItem(true)

    try {
      const price = Number.parseFloat(newItemPrice)
      if (isNaN(price) || price <= 0) {
        throw new Error("Price must be a positive number")
      }

      const newItem = {
        id: uuidv4(),
        name: newItemName,
        price,
        categoryId: newItemCategory,
        description: newItemDescription || undefined,
      }

      addMenuItem(newItem)

      toast({
        title: "Menu Item Added",
        description: `${newItemName} has been added to the menu`,
      })

      // Reset form
      setNewItemName("")
      setNewItemPrice("")
      setNewItemDescription("")
      setIsItemDialogOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add menu item",
        variant: "destructive",
      })
    } finally {
      setIsAddingItem(false)
    }
  }

  const handleAddCategory = () => {
    if (!newCategoryName) return

    setIsAddingCategory(true)

    try {
      const newCategory = {
        id: uuidv4(),
        name: newCategoryName,
        description: newCategoryDescription || undefined,
      }

      addCategory(newCategory)

      toast({
        title: "Category Added",
        description: `${newCategoryName} has been added to the menu categories`,
      })

      // Reset form
      setNewCategoryName("")
      setNewCategoryDescription("")
      setIsCategoryDialogOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add category",
        variant: "destructive",
      })
    } finally {
      setIsAddingCategory(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Menu Management</h2>
          <p className="text-muted-foreground">Manage your restaurant's menu items and categories</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isItemDialogOpen} onOpenChange={setIsItemDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Menu Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Menu Item</DialogTitle>
                <DialogDescription>Create a new item to add to your restaurant menu.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Item Name</Label>
                  <Input
                    id="name"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="e.g. Cheeseburger"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(e.target.value)}
                    placeholder="e.g. 9.99"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={newItemCategory} onValueChange={setNewItemCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {menuCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Input
                    id="description"
                    value={newItemDescription}
                    onChange={(e) => setNewItemDescription(e.target.value)}
                    placeholder="e.g. Juicy beef patty with cheese"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsItemDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddMenuItem} disabled={isAddingItem}>
                  {isAddingItem ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    "Add Item"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>Create a new category to organize your menu items.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="categoryName">Category Name</Label>
                  <Input
                    id="categoryName"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="e.g. Appetizers"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categoryDescription">Description (Optional)</Label>
                  <Input
                    id="categoryDescription"
                    value={newCategoryDescription}
                    onChange={(e) => setNewCategoryDescription(e.target.value)}
                    placeholder="e.g. Small dishes to start your meal"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCategory} disabled={isAddingCategory}>
                  {isAddingCategory ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    "Add Category"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="items">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="items">Menu Items</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        <TabsContent value="items" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
            {menuItems.length === 0 && (
              <Card className="col-span-full">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <p className="text-muted-foreground mb-4">No menu items found</p>
                  <Button onClick={() => setIsItemDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Menu Item
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        <TabsContent value="categories" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuCategories.map((category) => (
              <MenuCategoryCard key={category.id} category={category} />
            ))}
            {menuCategories.length === 0 && (
              <Card className="col-span-full">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <p className="text-muted-foreground mb-4">No categories found</p>
                  <Button onClick={() => setIsCategoryDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Category
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
