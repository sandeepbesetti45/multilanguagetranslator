import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!API_URL) throw new Error('Missing REACT_APP_API_URL');

      await axios.post(
        `${API_URL}/api/auth/register`,
        { username, email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      navigate('/login');
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Registration failed';
      alert(msg);
      console.error('Register error:', err);
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form 
        onSubmit={handleSubmit} 
        className="bg-gray-800 p-6 rounded shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-400">Register</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="username"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
        <button 
          type="submit" 
          className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded"
        >
          Register
        </button>

        {/* Link to Login */}
        <p className="text-center text-gray-300 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
