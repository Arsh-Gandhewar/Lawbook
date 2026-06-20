import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-navy text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            ⚖️ Lawbook
          </Link>

          <div className="flex items-center space-x-6">
            {user ? (
              <>
                {user.role !== 'admin' && (
                  <Link to="/dashboard" className="hover:text-gray-300 transition">
                    Dashboard
                  </Link>
                )}
                {user.role !== 'admin' && (
                  <Link to="/chat" className="hover:text-gray-300 transition">
                    AI Chat
                  </Link>
                )}
                {user.role !== 'advocate' && user.role !== 'admin' && !user.isGuest && (
                  <Link to="/lawyers" className="hover:text-gray-300 transition">
                    Find Lawyer
                  </Link>
                )}
                {user.role === 'advocate' && (
                  <Link to="/analytics" className="hover:text-gray-300 transition">
                    Analytics
                  </Link>
                )}
                {user.isGuest && (
                  <Link to="/lawyers" className="hover:text-gray-300 transition">
                    Chat with Lawyer
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-slate hover:bg-gray-600 px-4 py-2 rounded-lg transition"
                >
                  {user.isGuest ? 'End Guest Session' : 'Logout'}
                </button>
              </>
            ) : (
              <>
                <Link to="/" className="hover:text-gray-300 transition">
                  Home
                </Link>
                <Link to="/login" className="hover:text-gray-300 transition">
                  Login
                </Link>
                <Link
                  to="/pricing"
                  className="bg-white text-navy px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
