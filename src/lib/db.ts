import Database from 'better-sqlite3'
import path from 'path'

let db: Database.Database

function getDB() {
  if (!db) {
    const dbPath = path.join(process.cwd(), 'students.db')
    db = new Database(dbPath)
    db.pragma('journal_mode = WAL')
  }
  return db
}

export function initializeDatabase() {
  const db = getDB()

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      date_of_birth TEXT,
      address TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE INDEX IF NOT EXISTS idx_students_user_id ON students(user_id);
  `)
}

export function getDatabase() {
  return getDB()
}
