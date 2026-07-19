import React, { useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Dashboard from '../pages/Dashboard';
import Leads from '../pages/Leads';
import Analytics from '../pages/Analytics';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Sidebar from '../components/common/Sidebar';

const ProtectedRoute = () => {
  const token = localStorage.getItem('crm-token');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors">
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-surface border-b border-border z-40 flex items-center px-4">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-muted hover:bg-surface-hover rounded-lg"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold text-foreground ml-4">Startup CRM</h1>
      </div>

      <Sidebar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />

      <main className="flex-1 w-full md:ml-64 p-4 md:p-8 pt-20 md:pt-8 transition-all">
        <Outlet />
      </main>
    </div>
  );
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/analytics" element={<Analytics />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
