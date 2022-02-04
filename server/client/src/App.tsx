import './styles/tailwind.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import ProtectedRoutes from './routes/ProtectedRoutes';
import { Error } from './components/Error';
import AppContextProvider from './providers/AppContextProvider';
import useDarkMode from './hooks/useDarkMode';
import { useState } from 'react';
import SingleProfileResponse from './types/response/SingleProfileResponse';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useDarkMode();
  const [userData, setUserData] = useState<SingleProfileResponse | null>(null);
  return (
    <div className={`${darkMode && 'dark'} h-screen w-screen`}>
      <AppContextProvider
        value={{ darkMode, setDarkMode, userData, setUserData }}
      >
        <BrowserRouter>
          <Routes>
            {/* Login Route */}
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={<Navigate to="/app/home" replace={true} />}
            />
            {/* Protected Routes */}
            <Route path="/app/*" element={<ProtectedRoutes />} />
            {/* Ummatched Routes */}
            <Route path="*" element={<Error message="Page Not Found" />} />
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </div>
  );
};
export default App;
