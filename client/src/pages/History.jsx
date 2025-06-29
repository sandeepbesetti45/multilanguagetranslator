import { useEffect, useState } from 'react';
import axios from 'axios';

const History = () => {
  const [history, setHistory] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/history', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHistory(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch history.");
      }
    };

    fetchHistory();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-blue-400 mb-4">🕘 Translation History</h2>

      {history.length === 0 ? (
        <p className="text-gray-400">No history yet.</p>
      ) : (
        <ul className="space-y-4">
          {history.map((entry, index) => (
            <li key={index} className="bg-gray-800 p-4 rounded shadow">
              <p>
  <span className="text-gray-400 dark:text-gray-400">Original:</span>{' '}
  <span className="text-gray-400 dark:text-white">{entry.originalText}</span>
</p>
<p>
  <span className="text-green-200">Translated:</span>{' '}
  <span className="text-green-400">{entry.translatedText}</span>
</p>

              <p className="text-sm text-gray-500">To: {entry.targetLang.toUpperCase()} • {new Date(entry.date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
