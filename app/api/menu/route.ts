import { NextResponse } from 'next/server'
import { menuQueries } from '@/lib/db'

export async function GET() {
  try {
    // Get all categories with items
    const rawData = menuQueries.getAllCategoriesWithItems.all()
    
    // Group data by categories
    const categoriesMap = new Map()
    
    rawData.forEach((row: any) => {
      const categoryId = row.category_id
      const categoryName = row.category_name
      const categoryOrder = row.category_order
      
      if (!categoriesMap.has(categoryId)) {
        categoriesMap.set(categoryId, {
          id: categoryId,
          name: categoryName,
          display_order: categoryOrder,
          items: []
        })
      }
      
      // Add item if it exists
      if (row.item_id) {
        // Get images for this item
        const images = menuQueries.getItemImages.all(row.item_id) as any[]
        
        const item = {
          id: row.item_id,
          title: row.item_title,
          description: row.item_description,
          price: row.item_price,
          display_order: row.item_order,
          is_available: row.item_available,
          category_name: categoryName,
          images: images
        }
        
        categoriesMap.get(categoryId).items.push(item)
      }
    })
    
    // Convert map to array and sort
    const categories = Array.from(categoriesMap.values())
      .sort((a, b) => a.display_order - b.display_order)
    
    // Sort items within each category
    categories.forEach(category => {
      category.items.sort((a: any, b: any) => a.display_order - b.display_order)
    })
    
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching menu:', error)
    return NextResponse.json(
      { error: 'Failed to fetch menu' },
      { status: 500 }
    )
  }
} 