import { useTheme } from '../context.js/ThemeContext'; 
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const { darkMode, toggleTheme } = useTheme(); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 dark:bg-gray-900 text-white p-4 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold text-blue-400">🌐 MultiLang Translator</h1>
      <div className="space-x-4 flex items-center">
       
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
    </nav>
  );
};

export default Navbar;
