# Habit Tracker

A full-stack Habit Tracker web application that helps users build consistent habits, visualize progress, and manage their daily routines.

## Live Demo

https://jericho-habit-tracker.vercel.app/

## Features

- 🔐 User registration and login
- 🔑 JWT authentication and protected routes
- ✅ Create, complete, rename, archive, restore, and delete habits
- 🔥 Track current and longest habit streaks
- 📅 Daily habit tracking
- 📊 Progress dashboard with calendar heatmap
- 📈 Habit details and completion statistics
- 📱 Fully responsive (mobile, tablet, desktop)
- ⏰ Automatic session expiration handling
- 🎨 Modern Material UI interface

## Tech Stack

### Frontend

- React
- Vite
- Material UI
- React Router
- Axios

### Backend

- Node.js
- Express
- PostgreSQL
- JSON Web Token (JWT)
- bcrypt

## Project Structure

```
Frontend/
Backend/
```

## Installation

### Clone the repository

```bash
git clone https://github.com/razonjericho/Habit-Tracker
cd Habit-Tracker
```

### Backend

```bash
cd Backend
npm install
```

Create a `.env` file:

```env
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=
JWT_SECRET=
PORT=3000
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
nodemon server.js
```

### Frontend

```bash
cd Frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

## Screenshots

>

## Future Improvements

- Google OAuth authentication
- Change Password feature
- Delete Account feature
- Add loading state to some pages

## License

This project is for educational and portfolio purposes.
