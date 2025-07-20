import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import MemberDashboard from './components/Members/MemberDashboard';
import AdminLogin from './components/Auth/AdminLogin';
import MemberLogin from './components/Auth/MemberLogin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/member" element={<MemberDashboard />} />
        <Route path="/member-login" element={<MemberLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
