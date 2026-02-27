'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Student {
  id: number
  first_name: string
  last_name: string
  email: string
  phone?: string
  date_of_birth?: string
  address?: string
  created_at: string
}

interface User {
  id: number
  name: string
  email: string
}

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    address: '',
  })

  // Check authentication and load data
  useEffect(() => {
    const loadData = async () => {
      try {
        // Check session
        const sessionRes = await fetch('/api/auth/session')
        if (!sessionRes.ok) {
          router.push('/auth/login')
          return
        }

        const sessionData = await sessionRes.json()
        setUser(sessionData.user)

        // Load students
        const studentsRes = await fetch('/api/students')
        if (studentsRes.ok) {
          const studentsData = await studentsRes.json()
          setStudents(studentsData.students || [])
        }
      } catch (error) {
        console.error('Load data error:', error)
        router.push('/auth/login')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [router])

  const handleLogout = async () => {
    const res = await fetch('/api/auth/logout', { method: 'POST' })
    if (res.ok) {
      router.push('/')
    }
  }

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        const data = await res.json()
        setStudents([data.student, ...students])
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          date_of_birth: '',
          address: '',
        })
        setShowForm(false)
      }
    } catch (error) {
      console.error('Add student error:', error)
    }
  }

  const handleDeleteStudent = async (id: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      try {
        const res = await fetch(`/api/students/${id}`, { method: 'DELETE' })
        if (res.ok) {
          setStudents(students.filter((s) => s.id !== id))
        }
      } catch (error) {
        console.error('Delete student error:', error)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-blue-600">Student Manager</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-semibold">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">My Students</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            {showForm ? 'Cancel' : 'Add Student'}
          </button>
        </div>

        {/* Add Student Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Add New Student</h3>
            <form onSubmit={handleAddStudent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <input
                type="date"
                placeholder="Date of Birth"
                value={formData.date_of_birth}
                onChange={(e) =>
                  setFormData({ ...formData, date_of_birth: e.target.value })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="md:col-span-2 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Add Student
              </button>
            </form>
          </div>
        )}

        {/* Students List */}
        {students.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-xl text-gray-600">No students yet. Add one to get started!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {students.map((student) => (
              <div
                key={student.id}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {student.first_name} {student.last_name}
                    </h3>
                    <p className="text-gray-600">{student.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/students/${student.id}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteStudent(student.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  {student.phone && (
                    <div>
                      <p className="font-semibold text-gray-700">Phone</p>
                      <p className="text-gray-600">{student.phone}</p>
                    </div>
                  )}
                  {student.date_of_birth && (
                    <div>
                      <p className="font-semibold text-gray-700">DOB</p>
                      <p className="text-gray-600">{student.date_of_birth}</p>
                    </div>
                  )}
                  {student.address && (
                    <div className="col-span-2">
                      <p className="font-semibold text-gray-700">Address</p>
                      <p className="text-gray-600">{student.address}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
