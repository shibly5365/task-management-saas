import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import * as api from '../services/api';

export const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState(null);
  const { token, logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const data = await api.getTasks(token);
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [token]);

  const handleCreateTask = async (taskData) => {
    setIsCreating(true);
    try {
      const newTask = await api.createTask(token, taskData);
      setTasks([newTask, ...tasks]);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateTask = async (id, updates) => {
    try {
      const updatedTask = await api.updateTask(token, id, updates);
      setTasks(tasks.map(t => t.id === id ? updatedTask : t));
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteTask = async (id) => {
    setIsDeletingId(id);
    try {
      await api.deleteTask(token, id);
      setTasks(tasks.filter(t => t.id !== id));
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDeletingId(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
            <p className="text-gray-600 mt-1">Welcome, {user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading tasks...</p>
          </div>
        ) : (
          <>
            <TaskForm onSubmit={handleCreateTask} isLoading={isCreating} />
            <TaskList
              tasks={tasks}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
              isDeletingId={isDeletingId}
            />
          </>
        )}
      </main>
    </div>
  );
};
