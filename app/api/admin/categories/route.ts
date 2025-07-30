import { NextRequest, NextResponse } from 'next/server'
import { menuQueries } from '@/lib/db'

// Middleware to check admin authentication
function checkAuth(request: NextRequest) {
  const session = request.cookies.get('admin-session')
  return session && session.value === 'authenticated'
}

// GET all categories
export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
  }

  try {
    const categories = menuQueries.getAllCategories.all()
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ error: 'Errore nel caricamento delle categorie' }, { status: 500 })
  }
} 