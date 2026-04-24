# Task Management SaaS Application

A production-ready full-stack task management application built with Node.js, Express, React, and PostgreSQL.

## Features

- **User Authentication**: Secure signup/login with JWT tokens and bcrypt password hashing
- **Task Management**: Create, read, update, and delete tasks with status tracking
- **Multi-User Isolation**: Each user only sees and manages their own tasks
- **Responsive UI**: Clean, modern interface built with React and Tailwind CSS
- **Error Handling**: Comprehensive error handling on both frontend and backend
- **Input Validation**: Strict validation on all user inputs

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: Context API

## Project Structure

```
TaskIntern/
├── backend/
│   ├── src/
│   │   ├── controllers/       # Business logic
│   │   ├── routes/            # API routes
│   │   ├── models/            # Database models
│   │   ├── middleware/        # Auth & error handling
│   │   ├── config/            # Database config
│   │   ├── utils/             # Validation utilities
│   │   └── server.js          # Express app
│   ├── package.json
│   ├── .env
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── pages/             # Page components
│   │   ├── components/        # Reusable components
│   │   ├── context/           # Auth context
│   │   ├── services/          # API service layer
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   ├── .env
│   └── .gitignore
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- PostgreSQL (running locally or via Docker)
- npm or yarn

### Backend Setup

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment**
   Edit `backend/.env`:
   ```
   PORT=5000
   DB_NAME=task_management
   DB_USER=postgres
   DB_PASSWORD=postgres
   DB_HOST=localhost
   DB_PORT=5432
   JWT_SECRET=your_secret_key_change_in_production
   JWT_EXPIRE=24h
   NODE_ENV=development
   ```

3. **Start the backend server**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure environment**
   Verify `frontend/.env`:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Start the frontend dev server**
   ```bash
   npm run dev
   ```
   App runs on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user

### Tasks (requires authentication)
- `GET /api/tasks` - Get all tasks for the user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Usage

1. **Sign Up**: Create a new account with email and password
2. **Login**: Log in with your credentials
3. **Create Task**: Add a new task with a title and optional description
4. **Manage Tasks**: Mark tasks as completed, edit, or delete them
5. **Logout**: Click logout to end your session

## Testing the Application

### Manual Testing Checklist

1. **User Registration**
   - Sign up with valid email and password
   - Try signup with duplicate email (should fail)
   - Try signup with short password (should fail)

2. **User Authentication**
   - Login with correct credentials
   - Login with wrong password (should fail)
   - Try accessing dashboard without login (should redirect)

3. **Task Management**
   - Create a task with title only
   - Create a task with title and description
   - Update task status to completed
   - Update task status back to pending
   - Delete a task

4. **Multi-User Isolation**
   - Create user A and add tasks
   - Log out and create user B
   - Verify user B doesn't see user A's tasks
   - Log back in as user A and verify tasks are still there

5. **Error Handling**
   - Missing email field (should fail)
   - Missing password field (should fail)
   - Invalid email format (should fail)
   - Empty task title (should fail)

## Security Features

- **Password Hashing**: Passwords are hashed with bcryptjs (10 rounds)
- **JWT Authentication**: Tokens expire after 24 hours
- **CORS**: Configured to accept requests only from frontend
- **Input Validation**: All inputs validated on both frontend and backend
- **User Isolation**: Database queries ensure users only access their own data
- **Error Messages**: Generic error messages to prevent information leakage

## Database Schema

### Users Table
```sql
CREATE TABLE "Users" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tasks Table
```sql
CREATE TABLE "Tasks" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES "Users"(id) ON DELETE CASCADE,
  title VARCHAR NOT NULL,
  description TEXT,
  status ENUM('pending', 'completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running
- Check DATABASE_URL in `.env` file
- Verify PostgreSQL credentials

### Port Already in Use
- Backend: Change `PORT` in `backend/.env`
- Frontend: Change port in `frontend/vite.config.js`

### CORS Errors
- Ensure backend `.env` has correct frontend URL
- Check CORS middleware in backend server

### Authentication Issues
- Check JWT_SECRET matches between signup and login
- Verify token is included in Authorization header

## Development Notes

- The application uses Sequelize for database ORM
- Authentication is stateless using JWT tokens
- Frontend state management uses React Context API
- All API calls include proper error handling
- Database relationships enforce referential integrity

## Performance Considerations

- Tasks are fetched on dashboard load
- Auth context persists token in localStorage
- Task updates optimistically update UI
- API responses are minimal JSON

## Future Enhancements

- Add task categories/tags
- Implement task due dates and reminders
- Add task sharing between users
- Email notifications
- Task search and filtering
- Dark mode support
- Mobile app

## License

MIT

## Support

For issues or questions, please check the troubleshooting section or open an issue in the repository.
