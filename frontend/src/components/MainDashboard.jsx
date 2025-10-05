// src/components/MainDashboard.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '../contexts/AuthContext';
import AdminsSection from './section/AdminSection';
import ContentCreatorsSection from './section/ContentCreatorSection';
import ContentSection from './section/ContentSection';
import MyContentSection from './section/MyContentSection';
import HomeSection from './section/HomeSection';
import ExploreSection from './section/ExploreSection';
import CartSection from './section/CartSection';

const MainDashboard = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSection />;
      case 'explore':
        return <ExploreSection />;
      case 'cart':
        return <CartSection />;
      case 'admins':
        return <AdminsSection />;
      case 'content_creators':
        return <ContentCreatorsSection />;
      case 'content':
        return <ContentSection />;
      case 'my_content':
        return <MyContentSection />;
      default:
        return <HomeSection />;
    }
  };

  const getSectionTitle = () => {
    const titles = {
      home: 'Home',
      explore: 'Explore',
      cart: 'Shopping Cart',
      admins: 'Admin Management',
      content_creators: 'Content Creator Management',
      content: 'Content Management',
      my_content: 'My Content',
    };
    return titles[activeSection] || 'Dashboard';
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {getSectionTitle()}
            </h1>
            <p className="text-gray-600">
              Welcome back, {user?.name}! You're logged in as {user?.role?.replace('_', ' ')}.
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {renderSection()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainDashboard;
