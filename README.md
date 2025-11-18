# 📊 CRM Dashboard Application

A comprehensive **Customer Relationship Management (CRM) Dashboard** built with **React.js**.  
Provides business intelligence, customer management, and analytics with a **modern, responsive design**, **dark mode support**, and **interactive data visualizations**.

---

## 🎯 Project Overview
The CRM Dashboard delivers a unified platform for managing customers, analyzing data, and monitoring business performance. It is designed for **sales, marketing, and management teams**, as well as individual users who need actionable insights from customer data.

---

## 📁 Application Structure

### 🏠 Core Layout Components

#### 1. **App.jsx** – Main Application Root
- **Purpose**: Entry point & routing configuration  
- **Features**:
  - React Router setup with 4 main routes  
  - Sidebar + Topbar layout  
  - Dark mode foundation  
  - Toast notifications  

#### 2. **Sidebar.jsx** – Navigation Panel
- **Purpose**: Main menu  
- **Features**:
  - Collapsible design  
  - Active route highlighting  
  - Dark mode compatible  
  - Smooth animations  

#### 3. **Topbar.jsx** – Header Navigation
- **Purpose**: Header with search & controls  
- **Features**:
  - Global search  
  - Mobile menu toggle  
  - Theme toggle integration  
  - Sticky header  

#### 4. **ThemeToggle.jsx** – Theme Switcher
- **Purpose**: Dark/Light mode toggle  
- **Features**:
  - Local storage persistence  
  - System preference detection  
  - Accessible with ARIA labels  

---

### 📊 Main Page Components

#### 5. **Dashboard.jsx** – Main Dashboard
- **Purpose**: Business overview & key metrics hub  
- **Features**:
  - Revenue trend charts  
  - Sales funnel visualization  
  - Top performers leaderboard  
  - Recent activity feed  
  - Quick action buttons  
  - Expandable charts  
  - Multiple time filters  

#### 6. **Analytics.jsx** – Advanced Analytics
- **Purpose**: Business intelligence dashboard  
- **Features**:
  - Tab-based navigation (Overview, Sales, Marketing, Customers)  
  - Multiple chart types: Pie, Bar, Line (Chart.js)  
  - KPI cards with trends  
  - Date range filtering  
  - CSV export functionality  
  - Detailed performance tables  

#### 7. **Customers.jsx** – Customer Management
- **Purpose**: Complete CRM for customer data  
- **Features**:
  - CRUD operations (Create, Read, Update, Delete)  
  - Advanced filtering & search  
  - Bulk actions  
  - Import/Export (Excel/CSV)  
  - Local storage persistence  
  - Form validation & notifications  

#### 8. **SettingPage.jsx** – User Settings
- **Purpose**: Account & preferences  
- **Features**:
  - Profile management (image upload)  
  - Security settings (2FA, password change)  
  - Notification toggles  
  - Session management  
  - Team settings access  

---

### 🧩 Reusable UI Components

#### 9. **UserTable.jsx** – User Management Table
- **Features**:
  - Add/Delete users  
  - Search filtering  
  - Status badges  
  - Inline form for new users  

#### 10. **ChartComponent.jsx** – Data Visualization
- **Features**:
  - Line & Bar charts  
  - Responsive containers  
  - Interactive tooltips  

#### 11. **StatCard.jsx** – Metric Display
- **Features**:
  - Icon + value layout  
  - Hover animations  
  - Responsive sizing  

---

## 🛠 Technical Architecture

### 📚 Technologies Used
- **Frontend**: React.js (Hooks)  
- **Routing**: React Router DOM  
- **Charts**: Chart.js + Recharts  
- **Styling**: Tailwind CSS (dark mode support)  
- **Icons**: React Icons  
- **Data Export**: XLSX  
- **Notifications**: React Toastify  

### 🎨 Design System
- Professional color palette (blues, greens, grays)  
- Clean, readable typography  
- Consistent spacing & card-based layout  
- Mobile-first responsive design  

### ⚡ Key Features
1. Dark/Light mode with system detection  
2. Fully responsive layout  
3. Local data persistence  
4. Real-time search & filtering  
5. Interactive visualizations  
6. Bulk operations  
7. Import/Export capability  
8. Form validation & user feedback  

### 🔧 State Management
- Component-level state with `useState`  
- Theme persistence with localStorage  
- Form handling via controlled components  
- Customer data stored locally  

---

## 🚀 Business Value

### For Sales Teams
- Track revenue & sales performance  
- Monitor sales funnels & conversions  
- Efficient customer management  

### For Marketing Teams
- Analyze campaigns & leads  
- Measure ROI & performance metrics  

### For Management
- Monitor KPIs & team performance  
- Data-driven decision making  

### For End Users
- Intuitive, modern UI  
- Powerful search & filters  
- Mobile-friendly access  
- Personalized theme options  

---

## 📈 Application Flow
1. Landing → Dashboard (overview)  
2. Navigation → Sidebar for sections  
3. Analysis → Analytics for insights  
4. Management → Customers for CRM operations  
5. Personalization → Settings for preferences  

---

## [Get Complete Project From Google Drive](https://drive.google.com/drive/folders/1dNWmw162D3-Cpoc_6K0BjYfAgFQoMQE0?usp=drive_link) 

**This CRM Dashboard is production-ready and demonstrates modern React best practices, clean architecture, and enterprise-level user experience.**
