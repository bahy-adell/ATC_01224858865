# Event Booking System

A full-stack web application for managing and booking events, built with Angular (frontend) and Node.js/Express (backend).

## Project Structure

```
EventBookingSystem/
├── frontend/           # Angular frontend application
└── Back-end/          # Node.js/Express backend application
```

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (Node Package Manager)
- TypeScript (install globally):
  ```bash
  npm install -g typescript
  ```
- Angular CLI (`npm install -g @angular/cli`)
- MongoDB (for database)

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd Back-end
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   # For development
   npm run dev

   # For production
   npm run build
   npm run prod
   ```

The backend server will start running on `http://localhost:3000`

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
   npm start
   ```

The frontend application will be available at `http://localhost:4200`

## Login as Admin
- Email : Areeb@gmail.com
- Password : 111111

## Features

- User authentication and authorization
- Event creation and management
- Event booking and registration
- Admin dashboard 
- Light and Dark mode
 

## Tech Stack

### Frontend
- Angular
- TypeScript
- HTML/CSS
- Angular Material

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- JWT Authentication

## Development

- Frontend development server: `ng serve`
- Backend development server: `npm run dev`
- Build frontend: `ng build`
- Build backend: `npm run build`

## Deployment

The application is configured for deployment on Vercel. Both frontend and backend have their own `vercel.json` configuration files.

## Troubleshooting

If you encounter any issues:

1. Make sure MongoDB is running and accessible
2. Ensure all dependencies are installed correctly
3. Check the console for any error messages
4. Verify that ports 3000 (backend) and 4200 (frontend) are not in use


