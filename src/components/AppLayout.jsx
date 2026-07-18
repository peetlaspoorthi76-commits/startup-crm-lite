import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './common/Sidebar';
import { Menu } from 'lucide-react';

export default function AppLayout() {
const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

return (
// 'min-h-screen' ensures it fills the monitor, but lets it grow infinitely downwards.
<div className="flex flex-col md:flex-row min-h-screen bg-slate-50 dark:bg-[#0B1120]">

    {/* Mobile Top Header */}
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-[#0F172A] border-b border-slate-200 dark:border-slate-800 md:hidden z-30">
    <h1 className="text-xl font-bold text-slate-900 dark:text-white">Startup CRM</h1>
    <button onClick={toggleSidebar} className="p-2 rounded-md text-slate-600 dark:text-slate-400">
        <Menu size={24} />
    </button>
    </header>

    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

    {/* Main Content Area */}
    <main className="flex-1 p-4 md:p-8 w-full">
    <Outlet />
    </main>

</div>
);
}