import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useData } from '../../contexts/DataContext';
import { Eye, Calendar, User } from 'lucide-react';
import { ContentOfferModal } from '../modals/ContentOfferModal';

export const HomeTab = ({ user }) => {
  const { content, getUserById } = useData();
  const [selectedContent, setSelectedContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSeeOffer = (contentItem) => {
    setSelectedContent(contentItem);
    setIsModalOpen(true);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (content.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Eye className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Content Available</h3>
        <p className="text-gray-500">There are no content posts to display at the moment.</p>
      </div>
    );
  }

  if (content.length === 1) {
    // Single content - poster format
    const item = content[0];
    const creator = getUserById(item.createdBy);

    return (
      <div className="max-w-2xl mx-auto">
        <Card className="content-card overflow-hidden">
          <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-600 relative">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-3xl font-bold mb-2">{item.title}</h2>
                <p className="text-lg opacity-90">{item.description}</p>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <User className="h-4 w-4" />
                <span>{creator?.name || 'Unknown'}</span>
                <Calendar className="h-4 w-4 ml-2" />
                <span>{formatDate(item.createdAt)}</span>
              </div>
            </div>
            <Button 
              className="w-full offer-button"
              onClick={() => handleSeeOffer(item)}
            >
              <Eye className="h-4 w-4 mr-2" />
              See Offer
            </Button>
          </CardContent>
        </Card>

        <ContentOfferModal
          content={selectedContent}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    );
  }

  // Multiple content - scrollable format
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">All Content</h2>
        <p className="text-gray-600">Browse through all available content</p>
      </div>

      <div className="scrollable-content">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.map((item) => {
            const creator = getUserById(item.createdBy);
            return (
              <Card key={item.id} className="content-card overflow-hidden">
                <div className="aspect-video bg-gray-200 relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23e5e7eb"/><text x="150" y="100" text-anchor="middle" fill="%236b7280" font-family="Arial" font-size="14">Image not available</text></svg>';
                    }}
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <User className="h-3 w-3" />
                      <span>{creator?.name || 'Unknown'}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(item.createdAt)}</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full offer-button" 
                    size="sm"
                    onClick={() => handleSeeOffer(item)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    See Offer
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <ContentOfferModal
        content={selectedContent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};