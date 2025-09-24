import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useData } from '../../contexts/DataContext';
import { Plus, FileText, Trash2, Edit, User, Calendar, Eye } from 'lucide-react';
import { CreateContentModal } from '../modals/CreateContentModal';
import { EditContentModal } from '../modals/EditContentModal';
import { ContentOfferModal } from '../modals/ContentOfferModal';

export const ContentTab = ({ user }) => {
  const { content, deleteContent, getUserById } = useData();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [viewingContent, setViewingContent] = useState(null);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  const canCreateContent = true; // All roles can create content
  const canEditContent = (contentItem) => {
    if (user.role === 'superadmin' || user.role === 'admin') return true;
    return contentItem.createdBy === user.id;
  };

  const canDeleteContent = (contentItem) => {
    if (user.role === 'superadmin' || user.role === 'admin') return true;
    return contentItem.createdBy === user.id;
  };

  const handleDeleteContent = (contentId) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      deleteContent(contentId);
    }
  };

  const handleViewOffer = (contentItem) => {
    setViewingContent(contentItem);
    setIsOfferModalOpen(true);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Content Management</h2>
          <p className="text-gray-600">Create and manage content posts</p>
        </div>
        {canCreateContent && (
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Content
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.map((item) => {
          const creator = getUserById(item.createdBy);
          return (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-video bg-gray-200 relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23e5e7eb"/><text x="150" y="100" text-anchor="middle" fill="%236b7280" font-family="Arial" font-size="14">No Image</text></svg>';
                  }}
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <User className="h-3 w-3" />
                    <span>{creator?.name || 'Unknown'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(item.createdAt)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleViewOffer(item)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View Offer
                  </Button>

                  <div className="flex space-x-2">
                    {canEditContent(item) && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingContent(item)}
                        className="flex-1"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    )}
                    {canDeleteContent(item) && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteContent(item.id)}
                        className="flex-1"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {content.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No content found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating your first content post.</p>
        </div>
      )}

      <CreateContentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        userId={user.id}
      />

      <EditContentModal
        content={editingContent}
        isOpen={!!editingContent}
        onClose={() => setEditingContent(null)}
      />

      <ContentOfferModal
        content={viewingContent}
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
      />
    </div>
  );
};