import { createContext, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
// Remembers dark mode setting across refreshes
const [isDarkMode, setIsDarkMode] = useLocalStorage('startup-crm-theme', false);

const toggleTheme = () => {
setIsDarkMode((prev) => !prev);
};

useEffect(() => {
if (isDarkMode) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}
}, [isDarkMode]);

return (
<ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
    {children}
</ThemeContext.Provider>
);
}

export function useTheme() {
const context = useContext(ThemeContext);
if (!context) {
throw new Error('useTheme must be used within a ThemeProvider');
}
return context;
}