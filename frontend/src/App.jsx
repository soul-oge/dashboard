// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import Pages from './components/Pages';
import Login from './components/Login';
import Register from './components/Register';
import LandingPages from './components/LandingPages';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

// import Service from './components/Service';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';

import RequireAuth from './components/RequireAuth';
import { RequireAdmin } from './components/RequireAdmin';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pages />} />

        <Route path="/landing" element={<LandingPages />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/service" element={<Service />} /> */}
        <Route path="/dashboard"
         element={
          <RequireAuth>
          <Dashboard/>
          </RequireAuth>
          } />
        <Route path="/profile" 
        element={
          <RequireAuth>
            <ProfilePage />
          </RequireAuth>
        } />


        <Route path="/admin" 
        element={
          <RequireAdmin>
            <AdminPage />
          </RequireAdmin>
        } />

        <Route path="/layout" element={<Layout />} />
        <Route path='/home' element={<HomePage />} />

        {/* <Route path="*" element={<Pages />} /> */}
      </Routes>
    </BrowserRouter>
  );
}