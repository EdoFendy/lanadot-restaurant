import { NextRequest, NextResponse } from 'next/server'
import { menuQueries } from '@/lib/db'
import { writeFile, unlink } from 'fs/promises'
import { join } from 'path'

// Middleware to check admin authentication
function checkAuth(request: NextRequest) {
  const session = request.cookies.get('admin-session')
  return session && session.value === 'authenticated'
}

// PUT - Update menu item
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
  }

  try {
    const id = parseInt(params.id)
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

    // Update menu item
    menuQueries.updateMenuItem.run(
      title,
      description,
      categoryIdNum,
      price && price.trim() !== '' ? parseFloat(price) : null,
      0, // display_order
      isAvailable ? 1 : 0, // Convert boolean to integer
      id
    )

    // Handle new image uploads if provided
    const images = formData.getAll('images') as File[]
    if (images.length > 0 && images[0].size > 0) {
      // Delete old images first
      const oldImages = menuQueries.getItemImages.all(id) as any[]
      for (const oldImage of oldImages) {
        try {
          await unlink(join(process.cwd(), 'public', oldImage.image_path))
        } catch (err) {
          console.warn('Could not delete old image:', oldImage.image_path)
        }
      }
      menuQueries.deleteItemImages.run(id)

      // Add new images
      for (let i = 0; i < images.length; i++) {
        const image = images[i]
        if (image && image.size > 0) {
          const bytes = await image.arrayBuffer()
          const buffer = Buffer.from(bytes)
          
          const fileName = `${Date.now()}-${i}-${image.name}`
          const imagePath = `/uploads/menu/${fileName}`
          const fullPath = join(process.cwd(), 'public', imagePath)
          
          await writeFile(fullPath, buffer)
          
          menuQueries.insertItemImage.run(
            id,
            imagePath,
            `${title} - Immagine ${i + 1}`,
            i
          )
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating menu item:', error)
    return NextResponse.json({ error: 'Errore durante l\'aggiornamento' }, { status: 500 })
  }
}

// DELETE menu item
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
  }

  try {
    const id = parseInt(params.id)
    
    // Delete associated images from filesystem
    const images = menuQueries.getItemImages.all(id) as any[]
    for (const image of images) {
      try {
        await unlink(join(process.cwd(), 'public', image.image_path))
      } catch (err) {
        console.warn('Could not delete image:', image.image_path)
      }
    }
    
    // Delete from database (images will be deleted by foreign key constraint)
    menuQueries.deleteMenuItem.run(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting menu item:', error)
    return NextResponse.json({ error: 'Errore durante l\'eliminazione' }, { status: 500 })
  }
} 