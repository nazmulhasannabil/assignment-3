# Full-Stack Job Portal

A comprehensive job portal application built with Next.js (Frontend) + Node/Express (Backend) + MongoDB.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router) + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT + bcrypt
- **Authorization**: Role-Based Access Control

## 📋 Features

### Authentication
- User registration (Job Seeker, Employer)
- User login with JWT tokens
- Password hashing with bcrypt
- Role-based access control (Job Seeker, Employer, Admin)

### Job Seeker Features
- Update profile (bio, skills, resume URL)
- Browse all jobs with filtering (location, job type)
- Apply to jobs (once per job)
- View applied jobs

### Employer Features
- Account approval workflow
- Create, edit, and delete job postings
- View applicants for posted jobs

### Admin Features
- Approve or reject employer accounts
- View all jobs (read-only)
- View all applications (read-only)
- Block/unblock any user

## 📁 Project Structure

```
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── seedAdmin.js
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── ...
│   └── ...
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/jobportal
   JWT_SECRET=your_jwt_secret_here
   ```

4. Seed the admin user:
   ```bash
   npm run seed
   ```

5. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:3000` (or the port shown in the terminal)

## 🔐 Default Admin Credentials

- **Email**: admin@example.com
- **Password**: admin123

## 📱 Pages

### Public Pages
- `/` - Home page (job listings)
- `/login` - User login
- `/register` - User registration

### Job Seeker Pages
- `/seeker/dashboard` - Dashboard
- `/seeker/applied` - Applied jobs
- `/seeker/profile` - Profile management

### Employer Pages
- `/employer/dashboard` - Dashboard
- `/employer/jobs` - Job listings
- `/employer/jobs/create` - Create job
- `/employer/jobs/[id]/edit` - Edit job
- `/employer/jobs/[id]/applicants` - View applicants

### Admin Pages
- `/admin/dashboard` - Dashboard
- `/admin/pending-employers` - Approve employers
- `/admin/jobs` - View all jobs
- `/admin/applications` - View all applications
- `/admin/users` - Manage users

## 🎨 UI Components

- Clean, minimal Tailwind CSS design
- Responsive navigation
- Dashboard layouts for all roles
- Forms with validation
- Data tables for listings
- Role-based access control

## 🔄 API Endpoints

### Auth Routes
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Job Seeker Routes
- `PUT /api/seeker/profile` - Update profile
- `GET /api/seeker/jobs` - Get all jobs
- `GET /api/seeker/jobs/:id` - Get job by ID
- `POST /api/seeker/apply` - Apply to job
- `GET /api/seeker/applied-jobs` - Get applied jobs

### Employer Routes
- `POST /api/employer/jobs` - Create job
- `GET /api/employer/jobs` - Get employer jobs
- `GET /api/employer/jobs/:id` - Get job by ID
- `PUT /api/employer/jobs/:id` - Update job
- `DELETE /api/employer/jobs/:id` - Delete job
- `GET /api/employer/jobs/:id/applicants` - Get applicants

### Admin Routes
- `GET /api/admin/pending-employers` - Get pending employers
- `PUT /api/admin/approve-employer/:id` - Approve employer
- `DELETE /api/admin/reject-employer/:id` - Reject employer
- `GET /api/admin/jobs` - Get all jobs
- `GET /api/admin/applications` - Get all applications
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/toggle-block/:id` - Block/unblock user

## 📄 License

This project is licensed under the MIT License.