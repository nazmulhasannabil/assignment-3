# Job Portal Application

A full-stack job portal application built with Next.js, Node.js, Express, and MongoDB. This platform connects job seekers with employers through a comprehensive job listing and application system.

## 🚀 Features

## Admin login and management
- Email: admin@gmail.com
- Password: 123456
## Job seekers and employers can register

### User Roles
- **Job Seekers**: Browse jobs, apply to positions, and manage applications
- **Employers**: Post jobs, manage listings, and review applicants
- **Admins**: Platform management including user moderation and employer approvals

### Key Functionality
- User authentication and role-based authorization
- Job listing with search and filtering capabilities
- Application management system
- Profile management for all user types
- Admin dashboard for platform oversight

## 🛠️ Tech Stack

### Frontend
- [Next.js 14](https://nextjs.org/) with App Router
- TypeScript
- Tailwind CSS for styling
- React Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- Bcrypt for password hashing

## 📁 Project Structure

```
├── backend/
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Authentication & validation
│   ├── models/          # Database models
│   ├── routes/          # API route definitions
│   └── server.js        # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── app/         # Next.js app router pages
│   │   ├── components/  # Reusable UI components
│   │   └── lib/         # Utility functions and API clients
│   └── public/          # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB instance (local or cloud)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd assignment-3
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Setup

#### Backend (.env file in backend directory):
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

#### Frontend (Update API URL in src/lib/api.ts):
```typescript
const API_BASE_URL = 'http://localhost:5000/api';
```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Seeding Admin User

To create an initial admin user:
```bash
cd backend
npm run seed
```

Default admin credentials:
- Email: admin@example.com
- Password: admin123

## 🔐 Authentication

The application uses JWT-based authentication with role-based access control:
- All users must authenticate to access protected routes
- Role-specific permissions enforced on both frontend and backend
- Passwords securely hashed with bcrypt

## 🔄 API Endpoints

### Auth Routes
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Public Routes
- `GET /api/public/jobs` - Browse job listings
- `GET /api/public/jobs/:id` - View job details

### Job Seeker Routes
- `GET /api/seeker/jobs` - Get all jobs (authenticated)
- `GET /api/seeker/jobs/:id` - Get job by ID
- `POST /api/seeker/apply` - Apply to job
- `GET /api/seeker/applied-jobs` - Get user's applications
- `PUT /api/seeker/profile` - Update profile

### Employer Routes
- `POST /api/employer/jobs` - Create job
- `GET /api/employer/jobs` - Get employer's jobs
- `PUT /api/employer/jobs/:id` - Update job
- `DELETE /api/employer/jobs/:id` - Delete job
- `GET /api/employer/jobs/:id/applicants` - Get job applicants

### Admin Routes
- `GET /api/admin/pending-employers` - Get pending employers
- `PUT /api/admin/approve-employer/:id` - Approve employer
- `DELETE /api/admin/reject-employer/:id` - Reject employer
- `GET /api/admin/jobs` - Get all jobs
- `GET /api/admin/applications` - Get all applications
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/toggle-block/:id` - Block/unblock user

## 🎨 UI Components

- Responsive design using Tailwind CSS
- Protected routes with role-based access
- Loading states and error handling
- Form validation
- Interactive job application process

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop browsers
- Tablet devices
- Mobile phones

## 🔧 Deployment

### Backend Deployment
1. Set environment variables on your hosting platform
2. Deploy to platforms like Vercel, Heroku, or Render

### Frontend Deployment
1. Update API base URL in `src/lib/api.ts` to point to your deployed backend
2. Build the application:
   ```bash
   npm run build
   ```
3. Deploy to Vercel, Netlify, or similar platforms

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Support

For support, contact the development team or open an issue in the repository.
