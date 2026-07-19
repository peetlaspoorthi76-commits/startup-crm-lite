import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes'; // Ensure this points to your index.jsx correctly

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;