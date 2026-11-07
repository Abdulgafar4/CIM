# CIM

CIM is a modern inventory and business management dashboard built with React and Vite. It helps businesses manage sales, purchases, expenses, stock items, customer and supplier records, and team operations from a single workspace.

The project is designed for operations teams that need a simple but complete ERP-style overview for day-to-day business activity.

## Overview

CIM brings together the core workflows of an inventory-driven business:

- Product catalog management
- Sales tracking and POS operations
- Purchase management
- Expense tracking
- Customer and supplier management
- HR and attendance monitoring
- Dashboard analytics and financial summaries

The app uses a responsive dashboard interface and a clean admin-panel layout, making it suitable for lightweight business management systems.

## Features

### Dashboard and analytics
- Summary cards for key business metrics
- Sales, purchase, and expense visualizations
- Quick overview of business health
- Clean reporting layout for managers

### Inventory and product management
- Product list
- Product categories
- Product variants
- Centralized information for stock-related records

### Sales and retail
- Sales records
- Point-of-sale (POS) flow
- Sales return handling

### Purchasing and procurement
- Purchase tracking
- New purchase creation
- Purchase return records

### Finance and operations
- Expense management
- Cash flow overview
- Business transactions in one place

### People and HR
- Customer records
- Supplier records
- Employee management
- Attendance and leave tracking

### Security and app access
- Firebase-based authentication
- Protected routes for logged-in users
- Local persistence of the current user session

## Tech Stack

- React 18
- Vite
- React Router DOM
- Redux Toolkit
- Ant Design
- Tailwind CSS
- Firebase Authentication, Firestore, and Storage
- Chart.js and react-chartjs-2

## Project Structure

```text
CIM/
├── public/
├── src/
│   ├── Components/
│   ├── Pages/
│   ├── config/
│   ├── context/
│   ├── redux/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .eslintrc.cjs
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── vercel.json
├── bun.lockb
└── README.md
```

## Main Application Modules

### Dashboard
The home dashboard gives a quick overview of important operational numbers and charts. It is the first place a manager sees the overall state of the business.

### Products
The products section handles product records, category groupings, and product variants, making it easier to organize the inventory.

### Sales
Sales management includes order records and retail POS workflows, enabling quick sales operations and return tracking.

### Purchases
The purchase module tracks incoming stock, records new purchases, and supports return flows for suppliers.

### Expenses
The expenses module helps document and monitor costs across the business.

### People
This area covers customers and suppliers, which is essential for sales, procurements, and relationship tracking.

### HRM
HRM features include employee records, attendance, and leave requests, keeping internal staff management in the same system.

## Getting Started

### Prerequisites

Before running the app, make sure you have the following installed:

- Node.js (v18 or newer recommended)
- npm or another package manager

### Installation

1. Clone the project repository:

```bash
git clone https://github.com/Abdulgafar4/CIM.git
cd CIM
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the app in your browser:

```text
http://localhost:5173
```

## Available Scripts

In the project directory, you can run:

```bash
npm run dev
```
Starts the Vite development server for local development.

```bash
npm run build
```
Builds the production bundle for deployment.

```bash
npm run preview
```
Serves the production build locally for preview.

```bash
npm run lint
```
Runs ESLint checks across the React source files.

## Firebase Configuration

This project uses Firebase for authentication and data services. The app configuration is defined in:

```text
src/config/firebase.jsx
```

If you want to connect the app to your own Firebase project, update that file with your project credentials.

## Deployment

This project is configured for Vercel deployment through `vercel.json` and the Vite build process. You can deploy it with Vercel or any static hosting provider that supports Vite applications.

## Notes

- The app is designed as a business management frontend with Firebase-backed user authentication.
- It is best suited for small to medium operations that need a centralized dashboard for inventory and commercial activity.
- The project is highly customizable and can be extended with invoice generation, reporting, role-based access, and deeper inventory analytics.

## License

This project does not currently include a dedicated license file. Please check the repository for any usage restrictions before using it in production.
