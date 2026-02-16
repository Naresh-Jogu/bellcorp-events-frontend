# Event Management System – Frontend (Client)\*\*

This is the frontend application for the Event Management System, built using React (Vite).

The application allows users to register, log in, browse events, register for events, cancel registrations, and manage their registered events through a personal dashboard.

## Tech Stack

- React (Vite)#

- React Router DOM

- Axios

- Context API (Authentication State Management)

- JWT Authentication

- REST API Integration

## Features

### Authentication

- User Registration

- User Login

- JWT token stored in localStorage

- Persistent login after page refresh

- Protected Dashboard route

## Event Management

- View all available events

- Filter events by:
  - Search (Event Name)

  - Location

  - Category

  - Date

- View detailed event information

- Register for an event

- Cancel event registration

- Real-time seat calculation:

Available Seats = capacity - registeredCount

## User Dashboard

- View registered events

- Separate sections for:

- Upcoming Events

- Past Events

- Quick navigation to event details

## Project Structure
```
src/
│
├── api/
│ └── axios.js # Axios instance with API base URL
│
├── context/
│ └── AuthContext.jsx # Global authentication context
│
├── pages/
│ ├── Login.jsx
│ ├── Register.jsx
│ ├── Events.jsx
│ ├── EventDetails.jsx
│ └── Dashboard.jsx
│
├── components/
│ └── ProtectedRoute.jsx # Route protection (if implemented)
│
├── App.jsx # Application routes
└── main.jsx # Entry point
```

### Frontend will run at:
```
http://localhost:5173
```

## Authentication Flow

- User logs in.

- Backend returns:

- JWT Token

- User Data

- Token is stored in localStorage.

- Token is sent in Authorization header for protected API calls.

- Dashboard and event registration require valid authentication.


## API Endpoints Used
```
Method	     Endpoint	            Description

POST	    /auth/register	       Register new user
POST	    /auth/login	           Authenticate user
GET	        /events	               Get all events (with filters)
GET	        /events/:id	           Get event details
POST	    /events/:id/register   Register for event
POST	    /events/:id/cancel	   Cancel registration
GET	        /events/my/registered  Get user's registered events
```

## Future Improvements

 - Improve UI with Tailwind CSS or Material UI

 - Replace alert messages with toast notifications

- Add loading spinners

- Handle JWT expiration and auto-logout

- Improve error handling UX

- Add admin role features


## Purpose

 - This frontend was built to demonstrate:

 - Real-world authentication flow

 - Protected routing

 - REST API integration

 - State management using Context API

 - Dynamic UI updates based on backend data

 - Full-stack integration with MongoDB backend