import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Mock users database
  const mockUsers = [
    {
      id: 1,
      email: 'superadmin@example.com',
      password: 'admin123',
      role: 'superadmin',
      name: 'Super Admin',
    },
    {
      id: 2,
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
      name: 'Admin User',
    },
    {
      id: 3,
      email: 'creator@example.com',
      password: 'creator123',
      role: 'content_creator',
      name: 'Content Creator',
    },
  ];

  const login = (email, password) => {
    const foundUser = mockUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      return { success: true };
    }

    return { success: false, error: 'Invalid email or password' };
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};