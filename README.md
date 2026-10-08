# WorkFlowOS 🚀

**WorkFlowOS** is an enterprise-grade full-stack SaaS platform for employee, project, task, attendance, leave, performance, and operational workflow management.

Designed with clean architecture, enterprise UI standards, role-based security, predictive AI modules, and production-ready deployment configurations.

---

## 🏗️ System Architecture

```text
User Interface (React + Vite + Tailwind CSS + Recharts + Lucide)
                       │
                       ▼
          REST API Client (Axios + JWT)
                       │
                       ▼
           FastAPI Backend (Python 3.11+)
                       │
       ┌───────────────┼───────────────┐
       ▼               ▼               ▼
Service Layer     AI Modules     Security / JWT
       │
       ▼
SQLAlchemy 2.0 ORM
       │
       ▼
PostgreSQL / SQLite Database
```

---

## ✨ Features

- 🔑 **Authentication & RBAC**: JWT Bearer token authentication with Role-Based Access Control (`ADMIN`, `HR`, `MANAGER`, `EMPLOYEE`).
- 📊 **Executive Dashboard**: KPI stat cards, Recharts visualizations (Attendance Overview, Task Completion, Project Progress, Department Distribution, Performance Trends), recent activity feed, and live status banners.
- 👥 **Employee Directory**: Full CRUD, search, department/status filtering, pagination, detailed profiles, and AI burnout risk assessment.
- 🏢 **Department Management**: Management of organizational units, department managers, employee counts, and AI team workload prediction.
- 📁 **Project Management**: Portfolio tracking with priorities, progress bars, team assignment, timeline management, and AI project delay risk evaluation.
- 📋 **Kanban Task Board**: Interactive board across `TODO`, `IN_PROGRESS`, `REVIEW`, and `COMPLETED` statuses with priority tags, assignment dropdowns, and filtering.
- ⏰ **Time & Attendance**: Real-time check-in / check-out tracker, attendance logs, working hour calculations, and compliance stats.
- 🌴 **Leave Management**: Leave requests (`CASUAL`, `SICK`, `PAID`, `EMERGENCY`, `OTHER`), status workflows (`PENDING`, `APPROVED`, `REJECTED`), and reviewer actions.
- 📈 **Performance Evaluation**: Quarterly performance scorecards evaluating productivity, attendance, task completion, and project contributions.
- 📄 **Reports & Analytics**: On-demand report generation with CSV export and print-ready PDF preview.
- 🔔 **Notification Center**: Real-time notifications for task assignments, leave approvals, and system updates.
- 🧠 **AI-Ready Modules**: Built-in predictive analytics engines for employee burnout risk (`app/ai/performance_insights.py`), team capacity prediction (`app/ai/workload_prediction.py`), and project delay risk (`app/ai/project_risk.py`).
- 🐳 **Docker Ready**: Full multi-container Docker Compose environment for local or cloud deployment.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod validation
- **Routing**: React Router v6
- **HTTP Client**: Axios with JWT interceptors
- **State**: React Context API (`AuthContext`)
- **Testing**: Vitest + React Testing Library

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **Server**: Uvicorn
- **ORM**: SQLAlchemy 2.0
- **Validation**: Pydantic v2
- **Database**: PostgreSQL (or SQLite out-of-the-box)
- **Migrations**: Alembic
- **Auth**: JWT (PyJWT) + Bcrypt password hashing
- **Testing**: Pytest + HTTPX

---

## 📁 Directory Structure

```text
workflowos/
├── backend/
│   ├── app/
│   │   ├── ai/               # AI performance, workload, and risk modules
│   │   ├── dependencies/     # Auth & Role verification dependencies
│   │   ├── models/           # SQLAlchemy 2.0 ORM data models
│   │   ├── routers/          # FastAPI REST endpoint routes
│   │   ├── schemas/          # Pydantic v2 request/response schemas
│   │   ├── services/         # Business logic service layer
│   │   ├── utils/            # JWT & Security utilities
│   │   ├── config.py         # Application settings
│   │   ├── database.py       # Engine & session setup
│   │   └── main.py           # FastAPI app entrypoint
│   ├── tests/                # Pytest test suite
│   ├── Dockerfile
│   ├── seed.py               # Demo database seed generator
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Layout, Dashboard & Common UI components
│   │   ├── context/          # AuthContext provider
│   │   ├── data/             # Mock dataset fallbacks
│   │   ├── pages/            # 16 Full SaaS pages
│   │   ├── services/         # Axios API services
│   │   ├── App.jsx           # Routes & route protection
│   │   └── main.jsx          # App root
│   ├── Dockerfile
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── docker-compose.yml
```

---

## 🚀 Quick Start (Local Development)

### 1. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Seed the database with realistic demo data (Admin, HR, Managers, Employees, Tasks, etc.)
python seed.py

# Start FastAPI server
uvicorn app.main:app --reload --port 8000
```

FastAPI server runs at `http://localhost:8000`.  
Swagger API Documentation available at `http://localhost:8000/docs`.

### 2. Frontend Setup

```bash
cd frontend

# Install node packages
npm install

# Start Vite dev server
npm run dev
```

React frontend runs at `http://localhost:5173`.

---

## 🔑 Demo Login Credentials

Once `seed.py` is executed, log in with:

- **Admin Account**:
  - Email: `admin@workflowos.com`
  - Password: `Admin123!`
- **HR Account**:
  - Email: `hr1@workflowos.com`
  - Password: `Password123!`
- **Manager Account**:
  - Email: `manager1@workflowos.com`
  - Password: `Password123!`

---

## 🐳 Docker Setup

Run the entire application (Frontend, FastAPI Backend, PostgreSQL Database) with Docker Compose:

```bash
docker-compose up --build
```

---

## 🧪 Testing

### Backend Pytest Suite
```bash
cd backend
python -m pytest tests/test_api.py
```

### Frontend Vitest Suite
```bash
cd frontend
npm test
```

---

## 🌐 Production Deployment

### Frontend (Vercel)
1. Push `frontend/` to GitHub.
2. Import project into Vercel.
3. Set `VITE_API_URL` environment variable to your deployed FastAPI backend URL.

### Backend (Render / Railway)
1. Push `backend/` to GitHub.
2. Deploy as Web Service on Render/Railway.
3. Configure Environment Variables (`DATABASE_URL`, `SECRET_KEY`, `ALLOWED_ORIGINS`).

---

## 📜 License

MIT License © 2026 WorkFlowOS Enterprise.
