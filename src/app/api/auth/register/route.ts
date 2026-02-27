import { NextRequest, NextResponse } from 'next/server'
import { getDatabase, initializeDatabase } from '@/lib/db'
import { hashPassword } from '@/lib/auth'

initializeDatabase()

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    const db = getDatabase()
    
    const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already exists' },
        { status: 400 }
      )
    }

    const hashedPassword = await hashPassword(password)

    const result = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)').run(
      name,
      email,
      hashedPassword
    )

    return NextResponse.json(
      { message: 'Registration successful', userId: result.lastInsertRowid },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
