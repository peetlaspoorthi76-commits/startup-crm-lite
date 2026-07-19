import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './common/Sidebar';
import { Menu } from 'lucide-react';

export default function AppLayout() {
const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

return (
// 'min-h-screen' ensures it fills the monitor, but lets it grow infinitely downwards.
<div className="flex flex-col md:flex-row min-h-screen bg-background">

    {/* Mobile Top Header */}
    <header className="flex items-center justify-between px-6 py-4 bg-surface border-b border-border md:hidden z-30">
    <h1 className="text-xl font-bold text-foreground">Startup CRM</h1>
    <button onClick={toggleSidebar} className="p-2 rounded-md text-muted hover:bg-surface-hover">
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