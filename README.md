# Student Management System

A full-stack student management application built with Next.js, featuring authentication, CRUD operations, and SQLite database.

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Student Management**: Complete CRUD (Create, Read, Update, Delete) operations
- **Protected Routes**: Dashboard and student management pages require authentication
- **Responsive Design**: Built with Tailwind CSS for mobile-friendly interface
- **SQLite Database**: Persistent data storage with better-sqlite3

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite with better-sqlite3
- **Authentication**: JWT tokens, bcryptjs for password hashing
- **Deployment**: Vercel-ready configuration

## Installation

1. Clone the repository:
```bash
git clone https://github.com/reda-filali/sm.git
cd sm
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/session` - Check authentication status
- `POST /api/auth/logout` - Logout (clears token)

### Students
- `GET /api/students` - List all students
- `POST /api/students` - Create a new student
- `GET /api/students/[id]` - Get student details
- `PUT /api/students/[id]` - Update student
- `DELETE /api/students/[id]` - Delete student

All student endpoints require authentication.

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/ & students/  (API routes)
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── dashboard/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── lib/
│       ├── auth.ts         (JWT & password utilities)
│       └── db.ts           (Database initialization)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── vercel.json
└── .env.local
```

## Usage

1. **Register**: Go to `/auth/register` to create a new account
2. **Login**: Go to `/auth/login` to sign in
3. **Dashboard**: After login, manage your students
4. **Add Students**: Click "Add Student" to create new records
5. **Edit/Delete**: Manage existing student records from the dashboard

## Database

The SQLite database (`students.db`) is automatically created on first run with tables for:
- `users` - User accounts with hashed passwords
- `students` - Student records linked to users

## Deployment

### Local Testing
```bash
npm run build
npm start
```

### Vercel Deployment

1. Push code to GitHub repository
2. Connect GitHub repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `JWT_SECRET` - A secure random string
4. Deploy automatically on push

Configure via `vercel.json` which includes:
- Build command
- Install command
- Dev command
- Environment variables setup

## Security Notes

- Change `JWT_SECRET` in production to a secure random value
- Passwords are hashed with bcryptjs (10 rounds)
- HTTP-only cookies store JWT tokens
- CORS and CSRF protections should be added for production
- All API routes validate authentication tokens

## Environment Variables

Create a `.env.local` file with:
```
JWT_SECRET=your-secret-key
NODE_ENV=development
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Commit with clear messages
4. Push to GitHub
5. Create a pull request

## License

This project is open source and available under the MIT License.

## Author

Reda Filali - r.filali@esisa.ac.ma
