import { NextRequest, NextResponse } from 'next/server'
import { getDatabase, initializeDatabase } from '@/lib/db'
import { hashPassword, verifyPassword, createToken } from '@/lib/auth'

initializeDatabase()

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    const db = getDatabase()
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const passwordValid = await verifyPassword(password, (user as any).password)

    if (!passwordValid) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const token = await createToken((user as any).id, (user as any).email)

    const response = NextResponse.json(
      { message: 'Login successful', user: { id: (user as any).id, email: (user as any).email, name: (user as any).name } },
      { status: 200 }
    )

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
