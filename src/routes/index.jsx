import React, { useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Dashboard from '../pages/Dashboard';
import Leads from '../pages/Leads';
import Analytics from '../pages/Analytics';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Sidebar from '../components/common/Sidebar';

// Wrapper that forces authentication layout checks and provides the UI layout
const ProtectedRoute = () => {
  const token = localStorage.getItem('crm-token');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // If there is no token, redirect to login immediately without rendering the layout
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the layout with the Sidebar and the nested page (Outlet)
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 transition-colors">

      {/* Mobile Header - Only visible on screens smaller than 'md' */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-[#0F172A] border-b border-slate-200 dark:border-slate-800 z-40 flex items-center px-4">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white ml-4">Startup CRM</h1>
      </div>

      {/* Sidebar now accepts mobile state props */}
      <Sidebar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />

      {/* Main content area adjusts its margin for mobile vs desktop */}
      <main className="flex-1 w-full md:ml-64 p-4 md:p-8 pt-20 md:pt-8 transition-all">
        <Outlet />
      </main>

    </div>
  );
};

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes - No sidebar will render here */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected App Routes - Sidebar renders here via ProtectedRoute */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/analytics" element={<Analytics />} />
      </Route>

      {/* Fallback 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}