import React, { useState, useEffect } from 'react';
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
import { useData } from '../../contexts/DataContext';

export const EditContentModal = ({ content, isOpen, onClose }) => {
  const { updateContent } = useData();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    offer: '',
    imageUrl: '',
    price: 499,
    totalTickets: 2500,
    drawDate: '2025-02-20',
    termsAndConditions: '',
    category: 'offers',
    status: 'draft'
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (content) {
      setFormData({
        title: content.title || '',
        description: content.description || '',
        offer: content.offer || '',
        imageUrl: content.imageUrl || '',
        price: content.price || 499,
        totalTickets: content.totalTickets || 2500,
        drawDate: content.drawDate || '2025-02-20',
        termsAndConditions: content.termsAndConditions || '',
        category: content.category || 'offers',
        status: content.status || 'draft'
      });
    }
  }, [content]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      updateContent(content.id, formData);
      onClose();
    } catch (error) {
      console.error('Error updating content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!content) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-2 sm:mx-4 max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0 px-1 sm:px-0">
          <DialogTitle className="text-base sm:text-lg">Edit Content</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Update the content post information.
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto px-1 sm:px-0">
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 pb-4">
            
            {/* Title - Full width */}
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="title" className="text-xs sm:text-sm">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter content title"
                className="text-sm h-8 sm:h-10 px-2 sm:px-3"
                required
              />
            </div>

            {/* Description - Full width */}
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="description" className="text-xs sm:text-sm">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter content description"
                className="text-sm h-8 sm:h-10 px-2 sm:px-3"
                required
              />
            </div>

            {/* Price & Tickets - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="price" className="text-xs sm:text-sm">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  placeholder="499"
                  className="text-sm h-8 sm:h-10 px-2 sm:px-3"
                  min="0"
                  required
                />
              </div>
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="totalTickets" className="text-xs sm:text-sm">Total Tickets</Label>
                <Input
                  id="totalTickets"
                  type="number"
                  value={formData.totalTickets}
                  onChange={(e) => setFormData({ ...formData, totalTickets: Number(e.target.value) })}
                  placeholder="2500"
                  className="text-sm h-8 sm:h-10 px-2 sm:px-3"
                  min="1"
                  required
                />
              </div>
            </div>

            {/* Draw Date - Full width on mobile */}
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="drawDate" className="text-xs sm:text-sm">Draw Date</Label>
              <Input
                id="drawDate"
                type="date"
                value={formData.drawDate}
                onChange={(e) => setFormData({ ...formData, drawDate: e.target.value })}
                className="text-sm h-8 sm:h-10 px-2 sm:px-3"
                required
              />
            </div>

            {/* Offer Details - Full width */}
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="offer" className="text-xs sm:text-sm">Special Offer Details</Label>
              <Input
                id="offer"
                value={formData.offer}
                onChange={(e) => setFormData({ ...formData, offer: e.target.value })}
                placeholder="Enter special offer details"
                className="text-sm h-8 sm:h-10 px-2 sm:px-3"
                required
              />
            </div>

            {/* Terms & Conditions - Full width */}
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="termsAndConditions" className="text-xs sm:text-sm">Terms & Conditions</Label>
              <Input
                id="termsAndConditions"
                value={formData.termsAndConditions}
                onChange={(e) => setFormData({ ...formData, termsAndConditions: e.target.value })}
                placeholder="Enter terms and conditions"
                className="text-sm h-8 sm:h-10 px-2 sm:px-3"
                required
              />
            </div>

            {/* Image URL - Full width */}
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="imageUrl" className="text-xs sm:text-sm">Image URL</Label>
              <Input
                id="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="Enter image URL"
                className="text-sm h-8 sm:h-10 px-2 sm:px-3"
              />
              {formData.imageUrl && (
                <div className="mt-2 flex justify-center">
                  <img 
                    src={formData.imageUrl} 
                    alt="Preview" 
                    className="w-full max-w-xs h-16 sm:h-20 md:h-24 object-cover rounded border"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Category & Status - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="category" className="text-xs sm:text-sm">Category</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full h-8 sm:h-10 px-2 sm:px-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="offers">Offers</option>
                  <option value="jackpot">Jackpot Offer</option>
                  <option value="spinlock">Spin Lock Offer</option>
                </select>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="status" className="text-xs sm:text-sm">Status</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full h-8 sm:h-10 px-2 sm:px-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        {/* Footer Buttons - Fixed at bottom */}
        <div className="flex-shrink-0 border-t pt-3 sm:pt-4 px-1 sm:px-0">
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="w-full sm:w-auto h-8 sm:h-10 text-xs sm:text-sm"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              onClick={handleSubmit}
              className="w-full sm:w-auto h-8 sm:h-10 text-xs sm:text-sm"
            >
              {isLoading ? 'Updating...' : 'Update Content'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};