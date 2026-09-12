import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Dashboard from './components/Dashboard';
import Landing from './components/Land';
import Signup from './components/signup';
import MissedDoseCalendar from './components/MissedDoseCalendar';
import SidebarMenu from './components/SidebarMenu';
import ProtectedRoute from "./components/ProtectedRoute";
import MedicalHistory from "./components/MedicalHistory";
import OCR from "./components/OCR";

// A wrapper to hide SidebarMenu on login/signup/landing if desired, 
// but the prompt just says "Create a hamburger icon in the top-left/top navigation area"
// We'll show it everywhere, except maybe we can conditionally render it if not on login/signup.
function AppContent() {
  const location = useLocation();
  const hideSidebarRoutes = ['/login', '/signup', '/'];
  const showSidebar = !hideSidebarRoutes.includes(location.pathname);

  return (
    <>
      {showSidebar && <SidebarMenu />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
            path="/dashboard"
            element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            }
        />
        <Route
            path="/medical-history"
            element={
                <ProtectedRoute>
                    <MedicalHistory />
                </ProtectedRoute>
            }
        />
        <Route path="/ocr-reader" element={<OCR />} />
        <Route path="/calendar" element={<MissedDoseCalendar />} />
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  );
}

function App() {
  return (
    <AppContent />
  )
}

export default App
