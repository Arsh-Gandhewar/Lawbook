import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import FreeTrialRegister from './pages/FreeTrialRegister';
import VerifyEmail from './pages/VerifyEmail';
import PricingPage from './pages/PricingPage';
import UserDashboard from './pages/UserDashboard';
import AdvocateDashboard from './pages/AdvocateDashboard';
import AdvocateAnalytics from './pages/AdvocateAnalytics';
import ChatInterface from './pages/ChatInterface';
import LawyerChat from './pages/LawyerChat';
import LawyerDiscovery from './pages/LawyerDiscovery';
import VideoCall from './pages/VideoCall';
import AdminPanel from './pages/AdminPanel';

// Smart Dashboard component that routes based on role
const Dashboard = () => {
  const { user, loading } = React.useContext(AuthContext);

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-2xl text-slate">Loading...</div>
    </div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Route to different dashboards based on role
  if (user.role === 'advocate') {
    return <AdvocateDashboard />;
  } else if (user.role === 'admin') {
    return <Navigate to="/admin" />;
  } else {
    return <UserDashboard />;
  }
};

// Smart Home: redirect logged-in users to dashboard
const SmartHome = () => {
  const { user, loading } = React.useContext(AuthContext);
  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-2xl text-slate">Loading...</div>
    </div>;
  }
  if (user) {
    return <Navigate to="/dashboard" />;
  }
  return <Home />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SmartHome />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-free" element={<FreeTrialRegister />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<AdvocateAnalytics />} />
          <Route path="/chat" element={<ChatInterface />} />
          <Route path="/chat/:chatId" element={<ChatInterface />} />
          <Route path="/lawyer-chat/:chatId" element={<LawyerChat />} />
          <Route path="/lawyers" element={<LawyerDiscovery />} />
          <Route path="/video/:appointmentId" element={<VideoCall />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
