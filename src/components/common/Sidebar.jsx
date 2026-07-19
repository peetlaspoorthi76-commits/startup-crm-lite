import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, PieChart, X } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

export default function Sidebar({ isOpen, setIsOpen }) {
  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
      isActive
        ? 'bg-primary text-white'
        : 'text-muted hover:bg-surface-hover'
    }`;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`w-64 h-screen bg-surface border-r border-border flex flex-col fixed left-0 top-0 transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground hidden md:block">Startup CRM</h1>
          <h1 className="text-xl font-bold text-foreground md:hidden">Menu</h1>

          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-2 text-muted hover:bg-surface-hover rounded-lg"
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

        <div className="mt-auto p-4 border-t border-border flex items-center justify-between bg-surface">
          <span className="text-sm font-medium text-muted">Theme</span>
          <DarkModeToggle />
        </div>
      </aside>
    </>
  );
}
