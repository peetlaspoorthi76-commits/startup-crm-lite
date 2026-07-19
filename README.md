# Startup CRM Lite

A modern, lightweight CRM application for managing leads, tracking sales pipelines, and analyzing performance. Built with React, Node.js, Express, and MongoDB.

## Features

- User authentication (register/login with JWT)
- Lead management (create, edit, delete leads)
- Deal value tracking
- Pipeline status management
- Lead source tracking
- Real-time analytics dashboard
- Sales funnel visualization
- Monthly performance tracking
- Light/dark mode support
- Responsive design for mobile and desktop

## Tech Stack

### Frontend
- React 19
- React Router 7
- Tailwind CSS 4
- Recharts (for charts/analytics)
- Lucide React (icons)
- React Hot Toast (notifications)
- Vite (build tool)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (authentication)
- bcryptjs (password hashing)
- Helmet (security)
- CORS
- Express Rate Limiting

## Architecture

The app follows a standard full-stack architecture:
- Frontend: Single-page application with context-based state management
- Backend: RESTful API with Express
- Database: MongoDB with Mongoose ODM
- Authentication: Stateless JWT tokens

### Folder Structure
```
startup-crm-lite/ (frontend)
├── src/
│   ├── components/
│   │   ├── analytics/ (chart and visualization components)
│   │   ├── common/ (shared components)
│   │   ├── dashboard/ (dashboard widgets)
│   │   └── leads/ (lead management components)
│   ├── context/ (React context providers)
│   ├── data/
│   ├── hooks/
│   ├── pages/ (page components)
│   ├── routes/
│   ├── services/ (API services)
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
└── package.json

backend/
├── config/
├── controllers/
├── middleware/
├── models/ (Mongoose schemas)
├── routes/ (API routes)
├── utils/
├── server.js
└── package.json
```

## Authentication & Database

### Authentication
- User registration and login
- Passwords are hashed using bcryptjs
- JWT tokens for stateless authentication
- Tokens are stored in localStorage (frontend)
- Protected API routes with auth middleware

### Database Models
**User:**
- name (String)
- email (String, unique)
- password (String, hashed)
- role (String, default: 'user')
- timestamps (createdAt, updatedAt)

**Lead:**
- name (String, required)
- company (String, required)
- email (String, required)
- phone (String)
- status (String: New/Contacted/Meeting Scheduled/Proposal Sent/Won/Lost)
- source (String: Website/Referral/LinkedIn/Cold Call/Email Campaign/Other)
- value (Number, default: 0)
- notes (String)
- owner (ObjectId, ref: User)
- timestamps (createdAt, updatedAt)

## Environment Setup

### Prerequisites
- Node.js 18+
- MongoDB (local or cloud instance like MongoDB Atlas)
- npm or yarn

### Backend Setup
1. Navigate to the `backend` directory
2. Create a `.env` file:
   ```
   PORT=5000
   MONGODB_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret-key>
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the backend:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the `startup-crm-lite` directory
2. Create a `.env` file if needed (check `src/services/api.js` for API base URL)
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Running the Project

### Development
- Frontend: `npm run dev` (runs on http://localhost:5173)
- Backend: `npm run dev` (runs on http://localhost:5000)

### Production
- Frontend: Build with `npm run build`, then serve the `dist` folder
- Backend: `npm start`

## API Overview

### Auth Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Lead Routes
- `GET /api/leads` - Get all leads for current user
- `POST /api/leads` - Create new lead
- `GET /api/leads/:id` - Get lead by ID
- `PUT /api/leads/:id` - Update lead
- `DELETE /api/leads/:id` - Delete lead
- `GET /api/leads/stats` - Get lead statistics

### Other
- `GET /api/health` - Health check endpoint

## License
MIT
