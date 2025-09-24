import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useData } from '../../contexts/DataContext';
import { Plus, Users, Trash2, Edit, Crown, Shield, PenTool } from 'lucide-react';
import { CreateUserModal } from '../modals/CreateUserModal';
import { EditUserModal } from '../modals/EditUserModal';

export const UsersTab = ({ user }) => {
  const { users, deleteUser } = useData();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const canCreateUser = user.role === 'superadmin' || user.role === 'admin';
  const canEditUser = (targetUser) => {
    if (user.role === 'superadmin') return true;
    if (user.role === 'admin' && targetUser.role !== 'superadmin') return true;
    return false;
  };

  const canDeleteUser = (targetUser) => {
    if (targetUser.id === user.id) return false; // Can't delete self
    if (user.role === 'superadmin') return true;
    if (user.role === 'admin' && targetUser.role !== 'superadmin') return true;
    return false;
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(userId);
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'superadmin':
        return <Crown className="h-4 w-4 text-yellow-500" />;
      case 'admin':
        return <Shield className="h-4 w-4 text-blue-500" />;
      case 'content_creator':
        return <PenTool className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'superadmin':
        return 'bg-yellow-100 text-yellow-800';
      case 'admin':
        return 'bg-blue-100 text-blue-800';
      case 'content_creator':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">User Management</h2>
          <p className="text-gray-600">Manage system users and their permissions</p>
        </div>
        {canCreateUser && (
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((userData) => (
          <Card key={userData.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getRoleIcon(userData.role)}
                  <CardTitle className="text-lg">{userData.name}</CardTitle>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(userData.role)}`}>
                  {userData.role.replace('_', ' ')}
                </span>
              </div>
              <CardDescription>{userData.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-500 mb-4">
                <p>Created: {new Date(userData.createdAt).toLocaleDateString()}</p>
              </div>

              <div className="flex space-x-2">
                {canEditUser(userData) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingUser(userData)}
                    className="flex-1"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                )}
                {canDeleteUser(userData) && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteUser(userData.id)}
                    className="flex-1"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {users.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
        </div>
      )}

      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        currentUserRole={user.role}
      />

      <EditUserModal
        user={editingUser}
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
        currentUserRole={user.role}
      />
    </div>
  );
};