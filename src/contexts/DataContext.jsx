// src/contexts/DataContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  // Default users
  const defaultUsers = [
    {
      id: 1,
      email: 'superadmin@example.com',
      role: 'superadmin',
      name: 'Super Admin',
      createdAt: new Date('2024-01-01'),
    },
    {
      id: 2,
      email: 'admin@example.com',
      role: 'admin',
      name: 'Admin User',
      createdAt: new Date('2024-01-02'),
    },
    {
      id: 3,
      email: 'creator@example.com',
      role: 'content_creator',
      name: 'Content Creator',
      createdAt: new Date('2024-01-03'),
    },
  ];

  // Default content
 

  // Load from localStorage or use defaults
  const [users, setUsers] = useState(() => {
    const stored = localStorage.getItem('users');
    return stored ? JSON.parse(stored).map(u => ({ ...u, createdAt: new Date(u.createdAt) })) : defaultUsers;
  });

  const [content, setContent] = useState(() => {
    const stored = localStorage.getItem('content');
    return stored ? JSON.parse(stored).map(c => ({ ...c, createdAt: new Date(c.createdAt) })) : [];
  });

  // Sync users to localStorage
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  // Sync content to localStorage
  useEffect(() => {
    localStorage.setItem('content', JSON.stringify(content));
  }, [content]);

  // CRUD functions
  const addUser = (userData) => {
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date(),
    };
    setUsers(prev => [...prev, newUser]);
    return newUser;
  };

  const updateUser = (userId, userData) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId ? { ...user, ...userData } : user
      )
    );
  };

  const deleteUser = (userId) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const addContent = (contentData) => {
    const newContent = {
      id: Date.now(),
      ...contentData,
      createdAt: new Date(),
    };
    setContent(prev => [...prev, newContent]);
    return newContent;
  };

  const updateContent = (contentId, contentData) => {
    setContent(prev =>
      prev.map(item =>
        item.id === contentId ? { ...item, ...contentData } : item
      )
    );
  };

  const deleteContent = (contentId) => {
    setContent(prev => prev.filter(item => item.id !== contentId));
  };

  const getUserById = (userId) => {
    return users.find(user => user.id === userId);
  };

  const value = {
    users,
    content,
    addUser,
    updateUser,
    deleteUser,
    addContent,
    updateContent,
    deleteContent,
    getUserById,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
