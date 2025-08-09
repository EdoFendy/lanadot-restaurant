import { NextRequest, NextResponse } from 'next/server'
import { menuQueries } from '@/lib/db'

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
    return NextResponse.json(items)
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
    return NextResponse.json({ success: true, id: itemId })
  } catch (error) {
    console.error('Error creating menu item:', error)
    return NextResponse.json({ error: 'Errore durante la creazione' }, { status: 500 })
  }
} 