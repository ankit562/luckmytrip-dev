import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useData } from '../../contexts/DataContext';

export const CreateUserModal = ({ isOpen, onClose, currentUserRole }) => {
  const { addUser } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const availableRoles = currentUserRole === 'superadmin' 
    ? ['admin', 'content_creator']
    : ['content_creator'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      addUser({
        ...formData,
        password: 'defaultPassword123', // In a real app, this should be generated or sent via email
      });

      setFormData({ name: '', email: '', role: '' });
      onClose();
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', email: '', role: '' });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-2 sm:mx-4 max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0 px-1 sm:px-0">
          <DialogTitle className="text-base sm:text-lg">Create New User</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-gray-600">
            Add a new user to the system. Default password will be "defaultPassword123".
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto px-1 sm:px-0">
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 pb-4">
            
            {/* Name Field */}
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="name" className="text-xs sm:text-sm font-medium">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter user's name"
                className="text-sm h-8 sm:h-10 px-2 sm:px-3"
                required
              />
            </div>

            {/* Email Field */}
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="email" className="text-xs sm:text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter user's email"
                className="text-sm h-8 sm:h-10 px-2 sm:px-3"
                required
              />
            </div>

            {/* Role Field */}
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="role" className="text-xs sm:text-sm font-medium">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
                required
              >
                <SelectTrigger className="text-sm h-8 sm:h-10 px-2 sm:px-3">
                  <SelectValue placeholder="Select a role" className="text-xs sm:text-sm" />
                </SelectTrigger>
                <SelectContent>
                  {availableRoles.map((role) => (
                    <SelectItem 
                      key={role} 
                      value={role}
                      className="text-xs sm:text-sm"
                    >
                      {role.replace('_', ' ').charAt(0).toUpperCase() + role.slice(1).replace('_', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Role Information Helper */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-3">
              <p className="text-xs text-blue-800 leading-relaxed">
                <span className="font-medium">Available roles:</span>
                <br />
                {currentUserRole === 'superadmin' && (
                  <>
                    <span className="font-medium">Admin:</span> Can manage all content and users
                    <br />
                  </>
                )}
                <span className="font-medium">Content Creator:</span> Can create and manage their own content
              </p>
            </div>

            {/* Password Information */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 sm:p-3">
              <p className="text-xs text-amber-800 leading-relaxed">
                <span className="font-medium">Security Notice:</span> User will receive default password "defaultPassword123". 
                They should change it on first login.
              </p>
            </div>
          </form>
        </div>

        {/* Footer Buttons - Fixed at bottom */}
        <div className="flex-shrink-0 border-t pt-3 sm:pt-4 px-1 sm:px-0 bg-gray-50 -mx-6 -mb-6 px-6 pb-6 rounded-b-lg">
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              className="w-full sm:w-auto h-8 sm:h-10 text-xs sm:text-sm"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || !formData.name || !formData.email || !formData.role}
              onClick={handleSubmit}
              className="w-full sm:w-auto h-8 sm:h-10 text-xs sm:text-sm"
            >
              {isLoading ? 'Creating...' : 'Create User'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};