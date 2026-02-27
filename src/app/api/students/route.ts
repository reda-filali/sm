import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import { getDatabase, initializeDatabase } from '@/lib/db'

initializeDatabase()

async function getUserId(request: NextRequest): Promise<number | null> {
  const token = request.cookies.get('auth_token')?.value
  if (!token) return null

  const payload = await verifyToken(token)
  return payload ? (payload as any).userId : null
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId(request)
    if (!userId) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const db = getDatabase()
    const students = db.prepare('SELECT * FROM students WHERE user_id = ? ORDER BY created_at DESC').all(userId)

    return NextResponse.json({ students })
  } catch (error) {
    console.error('Get students error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserId(request)
    if (!userId) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { first_name, last_name, email, phone, date_of_birth, address } = await request.json()

    if (!first_name || !last_name || !email) {
      return NextResponse.json(
        { message: 'First name, last name, and email are required' },
        { status: 400 }
      )
    }

    const db = getDatabase()
    const result = db.prepare(
      'INSERT INTO students (user_id, first_name, last_name, email, phone, date_of_birth, address) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).run(userId, first_name, last_name, email, phone || null, date_of_birth || null, address || null)

    const newStudent = db.prepare('SELECT * FROM students WHERE id = ?').get(result.lastInsertRowid)

    return NextResponse.json(
      { message: 'Student created successfully', student: newStudent },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create student error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
