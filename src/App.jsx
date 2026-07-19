import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes'; // Ensure this points to your index.jsx correctly
import { LeadProvider } from './context/LeadContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LeadProvider>
          <ThemeProvider>
            <Toaster position="top-right" />
            <AppRoutes />
          </ThemeProvider>
        </LeadProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;