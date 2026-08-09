import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import NotFound from './components/NotFound';
function App() {
  return (
    <Routes>
      {/* nothing in routes is created yet properly. */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}

export default App
