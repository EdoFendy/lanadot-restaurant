import { NextRequest, NextResponse } from 'next/server'
import { menuQueries } from '@/lib/db'

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
    const body = await request.json()
    
    const title = body.title as string
    const description = body.description as string
    const price = (body.price ?? "") as string
    const categoryId = body.category_id as string
    const isAvailable = Boolean(body.is_available)
    
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
    
    // Delete from database
    menuQueries.deleteMenuItem.run(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting menu item:', error)
    return NextResponse.json({ error: 'Errore durante l\'eliminazione' }, { status: 500 })
  }
} 