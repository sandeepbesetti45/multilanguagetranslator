// Trigger Vercel fresh build
import { useState } from 'react';
import { useTheme } from '../context.js/ThemeContext'; 
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const { darkMode, toggleTheme } = useTheme(); 
  const [isOpen, setIsOpen] = useState(false); // For mobile menu toggle

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 dark:bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-blue-400">🌐 MultiLang Translator</h1>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="bg-gray-700 px-2 py-1 rounded hover:bg-gray-600"
            >
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>

            {isLoggedIn ? (
              <>
                <Link to="/" className="hover:text-blue-400">Translate</Link>
                <Link to="/history" className="hover:text-blue-400">History</Link>
                <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-500">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-400">Login</Link>
                <Link to="/register" className="hover:text-blue-400">Register</Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? '✖️' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 dark:bg-gray-900 px-4 pt-2 pb-4 space-y-2">
          <button
            onClick={toggleTheme}
            className="w-full text-left bg-gray-700 px-2 py-1 rounded hover:bg-gray-600"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>

          {isLoggedIn ? (
            <>
              <Link to="/" className="block hover:text-blue-400">Translate</Link>
              <Link to="/history" className="block hover:text-blue-400">History</Link>
              <button 
                onClick={handleLogout} 
                className="w-full text-left bg-red-600 px-3 py-1 rounded hover:bg-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block hover:text-blue-400">Login</Link>
              <Link to="/register" className="block hover:text-blue-400">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
