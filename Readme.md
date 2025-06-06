# TaskOps – Role-Based Task Management Dashboard

TaskOps is a sleek and minimal task management dashboard built using **React** and **Tailwind CSS**, designed to manage and assign tasks based on user roles. It's completely frontend-based and uses **LocalStorage** for persistent data – making it fast, secure, and backend-free.

---

## 🚀 Live Demo

🌐 [View TaskOps Live](https://employee-management-system-maheshpatil369s-projects.vercel.app/)

---

## 🔐 Login Credentials

### 👨‍💼 Admin
- **Email:** `admin@example.com`
- **Password:** `123`

### 👨‍🔧 Employees
- **Email:** `employee2@example.com`, `employee3@example.com`
- **Password:** `123`

---

## ✨ Features

- ✅ Role-based login: Admin vs Employee
- 📋 Admin can assign new tasks with title & description
- 👷 Employees can view tasks and update status: Accept, Complete, Fail
- 🌑 Fully Responsive Dark Mode UI
- 💾 Data persistence using LocalStorage
- 🧠 Uses core React patterns like Context API and hooks

---

---

## ⚙️ Functions, Hooks & APIs Used

### ✅ React Hooks
- `useState` – Manage component state
- `useEffect` – Handle side effects (e.g., syncing with LocalStorage)

### 🌐 React Context API
- Global user management using `AuthContext` and `AuthProvider`

### 💾 LocalStorage Helpers
Located in `utils/localStorage.jsx`:
- `getLocalStorage()` – Fetches and parses LocalStorage data
- `setLocalStorage()` – Updates LocalStorage with modified data

### 📊 Task Management Logic
- Task filtering based on status (`new`, `accepted`, `completed`, `failed`)
- Dashboard view changes dynamically based on user role
- Components render conditionally based on logged-in user

---

## 🧑‍💻 Getting Started

### 1. Clone the repository:
```bash
git clone https://github.com/maheshpatil369/Employee-Management-System.git
cd Employee-Management-System

