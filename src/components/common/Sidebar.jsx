import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, PieChart, X } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

export default function Sidebar({ isOpen, setIsOpen }) {
  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
    }`;

  return (
    <>
      {/* Dark overlay background for mobile when menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar container with mobile slide animation */}
      <aside className={`w-64 h-screen bg-white dark:bg-[#0F172A] border-r border-slate-200 dark:border-slate-800 flex flex-col fixed left-0 top-0 transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>

        <div className="p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white hidden md:block">Startup CRM</h1>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white md:hidden">Menu</h1>

          {/* Close button for mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-2 overflow-y-auto">
          <NavLink to="/" className={navLinkClasses} onClick={() => setIsOpen(false)}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/leads" className={navLinkClasses} onClick={() => setIsOpen(false)}>
            <Users size={20} />
            <span>Leads</span>
          </NavLink>

          <NavLink to="/analytics" className={navLinkClasses} onClick={() => setIsOpen(false)}>
            <PieChart size={20} />
            <span>Analytics</span>
          </NavLink>
        </nav>

        <div className="mt-auto p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-[#0F172A]">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Theme</span>
          <DarkModeToggle />
        </div>
      </aside>
    </>
  );
}