import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import AuthProvider, { AuthContext } from './context/AuthContext';
import AdminDashboard from './components/AdminDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import EngineerDashboard from './components/EngineerDashboard';
import Login from './components/Login';
import Register from './components/Register';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);
  if (!user || user.role !== role) {
    return <div>Access Denied</div>;
  }
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect root to login */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={
            <ProtectedRoute role="Admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/manager" element={
            <ProtectedRoute role="Manager">
              <ManagerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/engineer" element={
            <ProtectedRoute role="Engineer">
              <EngineerDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
