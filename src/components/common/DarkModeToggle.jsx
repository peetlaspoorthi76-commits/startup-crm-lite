import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function DarkModeToggle() {
const { isDarkMode, toggleTheme } = useTheme();

return (
<button
    onClick={toggleTheme}
    className="p-2 rounded-lg transition-colors bg-slate-100 dark:bg-[#1E293B] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
    aria-label="Toggle Dark Mode"
>
    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
</button>
);
}