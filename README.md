# Interview_Prep
A full-stack web application that generates AI-powered coding multiple-choice questions (MCQs) for technical interview preparation. Users can sign in, generate MCQs of varying difficulty, view instant explanations, and track their challenge history - all with secure authentication and daily usage quotas.

---

## Features

- **AI-Powered MCQ Generation:** Instantly generate coding MCQs with explanations using the Groq API (Llama-3.3-70b-versatile LLM model).
- **Difficulty Selection:** Choose question difficulty (easy, medium, hard) before generating a challenge.
- **User Authentication:** Secure sign-in and session management via Clerk.
- **Quota Management:** Each user has a daily quota for generating new challenges.
- **Challenge History:** View and revisit previously generated MCQs and explanations.
- **Responsive UI:** Clean, modern interface built with React and Vite.
- **Persistent Storage:** All user data and challenge history stored in a MySQL database.
- **Robust API:** FastAPI backend with RESTful endpoints, validation, and error handling.

---

## Tech Stack

- **Frontend:** React, Vite, Clerk (auth), CSS Modules
- **Backend:** FastAPI, Pydantic, SQLAlchemy, MySQL, CORS
- **AI Integration:** Groq API (LLM) for question and explanation generation
- **Authentication:** Clerk (frontend and backend integration)
- **Deployment:** Easily deployable on any platform supporting Python and Node.js.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/placement-prep-mcq.git
cd placement-prep-mcq
```

### 2. Setup the Backend

#### a. Create a Python virtual environment and install dependencies

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # On Windows
# source venv/bin/activate  # On Mac/Linux
pip install -r requirements.txt
```

#### b. Configure Environment Variables

Create a `.env` file in the `backend` directory with the following:

```
DATABASE_USERNAME = your_database_user_name
DATABASE_PASSWORD = your_database_user_password
DATABASE_NAME = your_database_name
CLERK_SECRET_KEY = your_clerk_secret_key
CLERK_JWT_KEY = your_clerk_jwt_token
GROQ_API_KEY = your_groq_api_key
```

#### c. Initialize the Database

Make sure MySQL is running and the database exists. Create the database in MySQL by running:

```bash
create database your_database_name
```

#### d. Start the Backend Server

```bash
python server.py
```

---

### 3. Setup the Frontend

```bash
cd ../frontend
npm install
```

#### a. Configure Clerk

- Setup an account at `www.clerk.com` and create a new project
- Enable the Google and Github sign in options while creating the application
- Update Clerk keys in your frontend environment by creating a `.env` file in the `frontend` directory with the following:

```
VITE_CLERK_PUBLISHABLE_KEY = your_publishable_clerk_key
```

#### b. Start the Frontend

```bash
npm run dev
```

---

### 4. Usage

- Visit `http://localhost:5173` in your browser.
- Sign in or sign up using Clerk.
- Select a difficulty and click "Generate Challenge" to get a new MCQ.
- View explanations and track your challenge history.
- Quota resets daily; if you run out, wait for the next day.

---

## API Endpoints (Backend)

- `POST /api/generate-challenge` — Generate a new MCQ (requires auth, consumes quota)
- `GET /api/quota` — Get remaining daily quota for the user
- `GET /api/history` — Retrieve user's challenge history

---

## Development Notes

- **Frontend:** Located in `/frontend`, built with React + Vite.
- **Backend:** Located in `/backend`, built with FastAPI.
- **Database:** MySQL, managed via SQLAlchemy ORM.
- **Authentication:** Clerk integration on both frontend and backend.
- **AI Integration:** Groq API for generating questions and explanations.

---
