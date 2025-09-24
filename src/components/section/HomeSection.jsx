import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const HomeSection = () => {
  const { user } = useAuth();

  const getWelcomeMessage = () => {
    switch (user?.role) {
      case 'superadmin':
        return 'You have full access to all system features and can manage all users and content.';
      case 'admin':
        return 'You can manage admins, content creators, and content. You cannot edit your own profile or view superadmin details.';
      case 'content_creator':
        return 'You can create and manage your own content.';
      default:
        return 'Welcome to the dashboard!';
    }
  };

  const roleCapabilities = {
    superadmin: [
      'Create, edit, delete all admins',
      'Create, edit, delete all content creators',
      'Full content management access',
      'System-wide administrative privileges'
    ],
    admin: [
      'Create and manage other admins',
      'Create and manage content creators',
      'Add and edit all content',
      'Cannot edit own profile',
      'Cannot view superadmin profiles'
    ],
    content_creator: [
      'Create new content',
      'Edit own content',
      'Delete own content',
      'View content analytics'
    ]
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Welcome, {user?.name}!</h2>
          <p className="text-blue-100 mb-4">{getWelcomeMessage()}</p>
          <div className="inline-flex items-center px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
            Role: {user?.role?.replace('_', ' ').toUpperCase()}
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">48</div>
            <div className="text-sm text-gray-600">Content Items</div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Capabilities</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {roleCapabilities[user?.role]?.map((capability, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span className="text-gray-700">{capability}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomeSection;
