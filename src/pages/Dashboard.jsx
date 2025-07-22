import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </header>

      <section className="mb-6">
        <p className="text-xl">
          Welcome, <span className="font-semibold">{user.name}</span>! (
          {user.role})
        </p>
      </section>

      <nav className="space-x-4">
        <button
          onClick={() => navigate('/students')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Manage Students
        </button>
        <button
          onClick={() => navigate('/courses')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Manage Courses
        </button>
      </nav>
    </div>
  );
};

export default Dashboard;
