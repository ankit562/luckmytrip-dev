// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = login(email, password);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  const handleDemoLogin = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    const result = login(demoEmail, demoPassword);
    if (!result.success) {
      setError(result.error);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <span className="text-blue-600 font-bold text-xl">🔐</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
        <p className="text-gray-600 mt-2">Sign in to your dashboard</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      
      <div className="mt-8">
        <p className="text-sm text-gray-600 text-center mb-4">Demo Accounts:</p>
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => handleDemoLogin('superadmin@example.com', 'admin123')}
            className="w-full text-left px-3 py-2 text-xs bg-purple-50 text-purple-700 rounded border hover:bg-purple-100 transition-colors"
          >
            🔑 Super Admin: superadmin@example.com / admin123
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin('admin@example.com', 'admin123')}
            className="w-full text-left px-3 py-2 text-xs bg-blue-50 text-blue-700 rounded border hover:bg-blue-100 transition-colors"
          >
            👨‍💼 Admin: admin@example.com / admin123
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin('creator@example.com', 'creator123')}
            className="w-full text-left px-3 py-2 text-xs bg-green-50 text-green-700 rounded border hover:bg-green-100 transition-colors"
          >
            ✍️ Content Creator: creator@example.com / creator123
          </button>
        </div>
      </div>
    </div>
  );
};
