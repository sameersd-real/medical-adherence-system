import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Dashboard from './components/Dashboard';
import Landing from './components/Land';
import Signup from './components/signup';
import MissedDoseCalendar from './components/MissedDoseCalendar';
function App() {
  return (
    <Routes>
      {/* nothing in routes is created yet properly. */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/calendar" element={<MissedDoseCalendar />} />
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}

export default App
