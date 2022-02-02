import "./styles/tailwind.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RequireAuth } from "./components/RequireAuth";
import { useEffect } from "react";
import Login from "./pages/login";
import Home from "./pages/home";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { Error } from "./components/Error";
import Navigation from "./components/Navigation";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login Route  */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/app/home" replace={true} />} />
        {/* Protected Routes  */}
        <Route path="/app/*" element={<ProtectedRoutes />} />
        {/* Ummatched Routes */}
        <Route path="*" element={<Error message="Page Not Found" />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
