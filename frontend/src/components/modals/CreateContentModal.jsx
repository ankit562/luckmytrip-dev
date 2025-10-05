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
import { useData } from '../../contexts/DataContext';

export const CreateContentModal = ({ isOpen, onClose, userId }) => {
  const { addContent } = useData();
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
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result }));
        setImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };
  

  const resetForm = () => {
    setFormData({
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
    setImageFile(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-2 sm:mx-4 max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0 px-1 sm:px-0">
          <DialogTitle className="text-base sm:text-lg">Create New Content</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Create a new content post with an attractive offer.
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto px-1 sm:px-0">
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 pb-4">
            
            {/* Title - Full width */}
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="title" className="text-xs sm:text-sm font-medium">Title</Label>
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
              <Label htmlFor="description" className="text-xs sm:text-sm font-medium">Description</Label>
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
                <Label htmlFor="price" className="text-xs sm:text-sm font-medium">Price (₹)</Label>
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
                <Label htmlFor="totalTickets" className="text-xs sm:text-sm font-medium">Total Tickets</Label>
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
              <Label htmlFor="drawDate" className="text-xs sm:text-sm font-medium">Draw Date</Label>
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
              <Label htmlFor="offer" className="text-xs sm:text-sm font-medium">Special Offer Details</Label>
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
              <Label htmlFor="termsAndConditions" className="text-xs sm:text-sm font-medium">Terms & Conditions</Label>
              <Input
                id="termsAndConditions"
                value={formData.termsAndConditions}
                onChange={(e) => setFormData({ ...formData, termsAndConditions: e.target.value })}
                placeholder="Enter terms and conditions"
                className="text-sm h-8 sm:h-10 px-2 sm:px-3"
                required
              />
            </div>

            {/* Image Upload Section */}
            <div className="space-y-1 sm:space-y-2">
              <Label className="text-xs sm:text-sm font-medium">Banner Image</Label>
              <div className="space-y-2">
                {/* File Upload */}
                <div className="flex items-center gap-3 p-2 sm:p-3 border border-gray-300 rounded-md bg-gray-50">
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="text-xs sm:text-sm w-full text-gray-600 file:mr-2 sm:file:mr-3 file:py-1 file:px-2 sm:file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
                    />
                  </div>
                  {(formData.imageUrl || imageFile) && (
                    <div className="flex-shrink-0">
                      <img 
                        src={formData.imageUrl} 
                        alt="Preview" 
                        className="h-8 sm:h-10 w-8 sm:w-10 object-cover rounded border-2 border-purple-300" 
                      />
                    </div>
                  )}
                </div>
                
                {/* URL Input Alternative */}
                <div className="space-y-1">
                  <Label htmlFor="imageUrl" className="text-xs text-gray-600">Or enter image URL</Label>
                  <Input
                    id="imageUrl"
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="Enter image URL"
                    className="text-sm h-8 sm:h-10 px-2 sm:px-3"
                  />
                </div>
                
                <p className="text-xs text-gray-500">
                  Upload a file or enter URL. Leave empty to use placeholder image.
                </p>
              </div>
            </div>

            {/* Category & Status - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="category" className="text-xs sm:text-sm font-medium">Category</Label>
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
                <Label htmlFor="status" className="text-xs sm:text-sm font-medium">Status</Label>
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

            {/* Content Preview Information */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-2 sm:p-3">
              <p className="text-xs text-green-800 leading-relaxed">
                <span className="font-medium">Content Preview:</span> Your offer will display as a card with 
                "WIN {formData.title || 'Your Title'}" and show price ₹{formData.price}, {formData.totalTickets} tickets, 
                draw date {formData.drawDate}.
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
              disabled={isLoading || !formData.title || !formData.description || !formData.offer}
              onClick={handleSubmit}
              className="w-full sm:w-auto h-8 sm:h-10 text-xs sm:text-sm"
            >
              {isLoading ? 'Creating...' : 'Create Content'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};