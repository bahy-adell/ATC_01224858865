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

34. Start the backend server:
    for development
   ```bash
   npm run dev
   ```
    for production
   ```bash
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
   ng serve
   ```

The frontend application will be available at `http://localhost:4200`

## Features

- User authentication and authorization
- Event creation and management
- Event booking and registration
- User profile management
- Admin dashboard
- Responsive design

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

