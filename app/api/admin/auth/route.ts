import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username e password sono richiesti' },
        { status: 400 }
      )
    }

    // Simple hardcoded authentication for demo
    // In production, this should use a proper authentication system
    if (username === 'admin' && password === 'admin123') {
      // Create response with session cookie
      const response = NextResponse.json({ success: true })
      response.cookies.set('admin-session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 24 hours
      })
      
      return response
    } else {
      return NextResponse.json(
        { error: 'Credenziali non valide' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    )
  }
}

// Logout endpoint
export async function DELETE() {
  try {
    const response = NextResponse.json({ success: true })
    response.cookies.delete('admin-session')
    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Errore durante il logout' },
      { status: 500 }
    )
  }
}

// Check authentication status
export async function GET(request: NextRequest) {
  try {
    const session = request.cookies.get('admin-session')
    
    if (session && session.value === 'authenticated') {
      return NextResponse.json({ authenticated: true })
    } else {
      return NextResponse.json({ authenticated: false })
    }
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json({ authenticated: false })
  }
} 