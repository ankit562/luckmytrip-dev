import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { HomeTab } from './tabs/HomeTab';
import { UsersTab } from './tabs/UsersTab';
import { ContentTab } from './tabs/ContentTab';
import { LogOut, User, Home, Users, FileText } from 'lucide-react';

export const Dashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');

  const canAccessUsers = user.role === 'superadmin' || user.role === 'admin';
  const canAccessContent = user.role !== 'content_creator' || user.role === 'content_creator';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DB</span>
                </div>
                <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-500" />
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-gray-500 capitalize">{user.role.replace('_', ' ')}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="home" className="flex items-center space-x-2">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </TabsTrigger>
            {canAccessUsers && (
              <TabsTrigger value="users" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Users</span>
              </TabsTrigger>
            )}
            {canAccessContent && (
              <TabsTrigger value="content" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Content</span>
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="home" className="mt-6">
            <HomeTab user={user} />
          </TabsContent>

          {canAccessUsers && (
            <TabsContent value="users" className="mt-6">
              <UsersTab user={user} />
            </TabsContent>
          )}

          {canAccessContent && (
            <TabsContent value="content" className="mt-6">
              <ContentTab user={user} />
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
};