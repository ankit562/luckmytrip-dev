import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

const AdminsSection = () => {
  const { user } = useAuth();
  const { users, addUser, updateUser, deleteUser } = useData();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'admin' });

  // Filter to show only admins, and hide superadmin from admin users
  const admins = users.filter(u => {
    if (user.role === 'superadmin') {
      return u.role === 'admin' || u.role === 'superadmin';
    } else {
      return u.role === 'admin' && u.role !== 'superadmin';
    }
  });

  const canEdit = (targetUser) => {
    if (user.role === 'superadmin') return true;
    if (user.role === 'admin') {
      return targetUser.id !== user.id && targetUser.role !== 'superadmin';
    }
    return false;
  };

  const canDelete = (targetUser) => {
    if (user.role === 'superadmin') return targetUser.id !== user.id;
    if (user.role === 'admin') {
      return targetUser.id !== user.id && targetUser.role !== 'superadmin';
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      updateUser(editingUser.id, formData);
      setEditingUser(null);
    } else {
      addUser({ ...formData, id: Date.now() });
      setShowCreateModal(false);
    }
    setFormData({ name: '', email: '', role: 'admin' });
  };

  const startEdit = (admin) => {
    setEditingUser(admin);
    setFormData({ name: admin.name, email: admin.email, role: admin.role });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Admin Management</h2>
        {(user.role === 'superadmin' || user.role === 'admin') && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Admin
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {admins.map((admin) => (
          <div key={admin.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium">
                  {admin.name?.[0]?.toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{admin.name}</h3>
                <p className="text-sm text-gray-600">{admin.email}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                admin.role === 'superadmin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {admin.role.replace('_', ' ').toUpperCase()}
              </span>
              <div className="flex space-x-2">
                {canEdit(admin) && (
                  <button
                    onClick={() => startEdit(admin)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Edit
                  </button>
                )}
                {canDelete(admin) && (
                  <button
                    onClick={() => deleteUser(admin.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || editingUser) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingUser ? 'Edit Admin' : 'Add Admin'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              {user.role === 'superadmin' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    value={formData.role}
                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                  </select>
                </div>
              )}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingUser(null);
                    setFormData({ name: '', email: '', role: 'admin' });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingUser ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminsSection;
