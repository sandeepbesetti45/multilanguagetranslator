import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Translate from './pages/Translate';
import History from './pages/History';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const isLoggedIn = !!localStorage.getItem('token'); // check login status

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen transition-colors duration-300">
      <Router>
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route 
            path="/login" 
            element={!isLoggedIn ? <Login /> : <Navigate to="/" replace />} 
          />
          <Route 
            path="/register" 
            element={!isLoggedIn ? <Register /> : <Navigate to="/" replace />} 
          />

          {/* Protected routes */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Translate />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/history" 
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

