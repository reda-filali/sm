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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserId(request)
    if (!userId) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const db = getDatabase()
    const student = db.prepare('SELECT * FROM students WHERE id = ? AND user_id = ?').get(params.id, userId)

    if (!student) {
      return NextResponse.json(
        { message: 'Student not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ student })
  } catch (error) {
    console.error('Get student error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserId(request)
    if (!userId) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const db = getDatabase()
    const student = db.prepare('SELECT * FROM students WHERE id = ? AND user_id = ?').get(params.id, userId)

    if (!student) {
      return NextResponse.json(
        { message: 'Student not found' },
        { status: 404 }
      )
    }

    const { first_name, last_name, email, phone, date_of_birth, address } = await request.json()

    db.prepare(
      'UPDATE students SET first_name = ?, last_name = ?, email = ?, phone = ?, date_of_birth = ?, address = ? WHERE id = ?'
    ).run(first_name, last_name, email, phone, date_of_birth, address, params.id)

    const updatedStudent = db.prepare('SELECT * FROM students WHERE id = ?').get(params.id)

    return NextResponse.json({ message: 'Student updated successfully', student: updatedStudent })
  } catch (error) {
    console.error('Update student error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserId(request)
    if (!userId) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const db = getDatabase()
    const student = db.prepare('SELECT * FROM students WHERE id = ? AND user_id = ?').get(params.id, userId)

    if (!student) {
      return NextResponse.json(
        { message: 'Student not found' },
        { status: 404 }
      )
    }

    db.prepare('DELETE FROM students WHERE id = ?').run(params.id)

    return NextResponse.json({ message: 'Student deleted successfully' })
  } catch (error) {
    console.error('Delete student error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
