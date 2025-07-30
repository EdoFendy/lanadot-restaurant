import { NextRequest, NextResponse } from 'next/server'
import { menuQueries } from '@/lib/db'
import { writeFile } from 'fs/promises'
import { join } from 'path'

// Middleware to check admin authentication
function checkAuth(request: NextRequest) {
  const session = request.cookies.get('admin-session')
  return session && session.value === 'authenticated'
}

// GET all menu items (admin view)
export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
  }

  try {
    const items = menuQueries.getAllItems.all()
    
    // Add images for each item
    const itemsWithImages = items.map((item: any) => {
      const images = menuQueries.getItemImages.all(item.id)
      return { ...item, images }
    })

    return NextResponse.json(itemsWithImages)
  } catch (error) {
    console.error('Error fetching menu items:', error)
    return NextResponse.json({ error: 'Errore nel caricamento' }, { status: 500 })
  }
}

// POST new menu item
export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const price = formData.get('price') as string
    const categoryId = formData.get('category_id') as string
    const isAvailable = formData.get('is_available') === 'true'
    
    if (!title || !description || !categoryId) {
      return NextResponse.json(
        { error: 'Titolo, descrizione e categoria sono richiesti' },
        { status: 400 }
      )
    }

    // Validate categoryId is a valid number
    const categoryIdNum = parseInt(categoryId)
    if (isNaN(categoryIdNum)) {
      return NextResponse.json(
        { error: 'Categoria non valida' },
        { status: 400 }
      )
    }

    // Insert menu item
    const result = menuQueries.insertMenuItem.run(
      title,
      description,
      categoryIdNum,
      price && price.trim() !== '' ? parseFloat(price) : null,
      0, // display_order
      isAvailable ? 1 : 0 // Convert boolean to integer
    )

    const itemId = result.lastInsertRowid as number

    // Handle image uploads
    const images = formData.getAll('images') as File[]
    for (let i = 0; i < images.length; i++) {
      const image = images[i]
      if (image && image.size > 0) {
        const bytes = await image.arrayBuffer()
        const buffer = Buffer.from(bytes)
        
        // Generate unique filename
        const fileName = `${Date.now()}-${i}-${image.name}`
        const imagePath = `/uploads/menu/${fileName}`
        const fullPath = join(process.cwd(), 'public', imagePath)
        
        await writeFile(fullPath, buffer)
        
        // Save image reference to database
        menuQueries.insertItemImage.run(
          itemId,
          imagePath,
          `${title} - Immagine ${i + 1}`,
          i
        )
      }
    }

    return NextResponse.json({ success: true, id: itemId })
  } catch (error) {
    console.error('Error creating menu item:', error)
    return NextResponse.json({ error: 'Errore durante la creazione' }, { status: 500 })
  }
} 