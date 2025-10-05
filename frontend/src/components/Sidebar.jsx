// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { sidebarMenu, mainMenuItems } from '../data/sidebarMenu';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = ({ activeSection, onSectionChange }) => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [activeMainItem, setActiveMainItem] = useState('home');

  const userRole = user?.role || 'content_creator';
  const roleMenuItems = sidebarMenu[userRole] || [];

  const handleMainItemClick = (itemId) => {
    setActiveMainItem(itemId);
    onSectionChange(itemId);
  };

  const handleRoleMenuClick = (itemId) => {
    onSectionChange(itemId);
  };

  return (
    <div className="sticky top-0 h-screen w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col z-30">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">DB</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          <span className="capitalize">{userRole.replace('_', ' ')}</span>
        </div>
      </div>

      {/* Main Navigation Buttons */}
      <div className="p-4 border-b border-gray-200">
        <nav className="space-y-2">
          {mainMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMainItemClick(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                activeMainItem === item.id
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Role-based Collapsible Menu */}
      <div className="flex-1 p-4">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <span className="font-medium">Role Menu</span>
          <span className={`transform transition-transform duration-200 ${
            isMenuOpen ? 'rotate-180' : 'rotate-0'
          }`}>
            ▼
          </span>
        </button>

        {/* Collapsible Menu Items */}
        <div className={`mt-2 space-y-1 overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          {roleMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleRoleMenuClick(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                activeSection === item.id
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-sm">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-700 rounded-full flex items-center justify-center shadow-md border-2 border-white">
            <span className="text-white font-bold text-lg select-none">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </span>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-800">{user?.name}</div>
            <div className="text-xs text-gray-500">{user?.email}</div>
          </div>
        </div>
          {/* Logout Button */}
          <button
            onClick={logout}
            className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg font-semibold shadow hover:from-red-600 hover:to-red-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m-6-3h12m0 0l-3-3m3 3l-3 3" />
            </svg>
            <span>Logout</span>
          </button>
      </div>
    </div>
  );
};

export default Sidebar;
