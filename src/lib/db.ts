// In-memory database implementation for Vercel compatibility
interface Row {
  [key: string]: any
}

interface Table {
  [key: string]: Row
}

const database: { [tableName: string]: Table } = {
  users: {},
  students: {},
}

let idCounters: { [table: string]: number } = {
  users: 0,
  students: 0,
}

export function initializeDatabase() {
  // Database is pre-initialized in memory
}

export function getDatabase() {
  return {
    prepare: (sql: string) => ({
      run: (...params: any[]) => {
        const table = extractTableName(sql)
        if (sql.includes('INSERT')) {
          const id = ++idCounters[table]
          const row: Row = { id }
          const columns = extractColumns(sql, 'INSERT')
          columns.forEach((col, i) => {
            row[col] = params[i]
          })
          database[table][id] = row
          return { changes: 1, lastID: id, lastInsertRowid: id }
        } else if (sql.includes('UPDATE')) {
          let changes = 0
          const columns = extractColumns(sql, 'UPDATE')
          for (const id in database[table]) {
            if (matchesWhere(database[table][id], params[params.length - 1])) {
              columns.forEach((col, i) => {
                database[table][id][col] = params[i]
              })
              changes++
            }
          }
          return { changes }
        } else if (sql.includes('DELETE')) {
          let changes = 0
          for (const id in database[table]) {
            if (matchesWhere(database[table][id], params[0])) {
              delete database[table][id]
              changes++
            }
          }
          return { changes }
        }
        return { changes: 0 }
      },
      get: (...params: any[]) => {
        const table = extractTableName(sql)
        for (const id in database[table]) {
          if (matchesWhere(database[table][id], params[0])) {
            return database[table][id]
          }
        }
        return undefined
      },
      all: (...params: any[]) => {
        const table = extractTableName(sql)
        const results: Row[] = []
        for (const id in database[table]) {
          if (params.length === 0 || matchesWhere(database[table][id], params[0])) {
            results.push(database[table][id])
          }
        }
        return results
      },
    }),
    exec: (sql: string) => {
      // Execute CREATE TABLE statements (ignored for in-memory)
    },
  }
}

function extractTableName(sql: string): string {
  const match = sql.match(/FROM\s+(\w+)|INTO\s+(\w+)|UPDATE\s+(\w+)/i)
  return (match?.[1] || match?.[2] || match?.[3] || 'unknown').toLowerCase()
}

function extractColumns(sql: string, type: 'INSERT' | 'UPDATE'): string[] {
  if (type === 'INSERT') {
    const match = sql.match(/\(([^)]+)\)\s*VALUES/)
    return match?.[1]?.split(',').map(c => c.trim().toLowerCase()) || []
  } else {
    const match = sql.match(/SET\s+(.+?)\s+WHERE/)
    return match?.[1]?.split(',').map(c => c.split('=')[0].trim().toLowerCase()) || []
  }
}

function matchesWhere(row: Row, value: any): boolean {
  if (typeof value === 'object' && value !== null) {
    return Object.entries(value).every(([key, val]) => row[key] === val)
  }
  return row.id === value || row.email === value
}
