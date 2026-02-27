import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import { getDatabase, initializeDatabase } from '@/lib/db'

initializeDatabase()

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth_token')?.value

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    const payload = await verifyToken(token)

    if (!payload) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    const db = getDatabase()
    const user = db.prepare('SELECT id, name, email FROM users WHERE id = ?').get((payload as any).userId)

    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    return NextResponse.json({
      authenticated: true,
      user,
    })
  } catch (error) {
    console.error('Session check error:', error)
    return NextResponse.json(
      { authenticated: false, message: 'Error checking session' },
      { status: 500 }
    )
  }
}
