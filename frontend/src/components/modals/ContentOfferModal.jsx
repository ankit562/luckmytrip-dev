import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Gift, Star, Clock, Tag } from 'lucide-react';

export const ContentOfferModal = ({ offer, isOpen, onClose }) => {
  if (!offer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-1">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Gift className="h-5 w-5 text-purple-500" />
            <span className="font-bold">{offer.title}</span>
          </DialogTitle>
          <DialogDescription className="text-sm">
            Limited time opportunity - Don't miss out!
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {/* Hero Section */}
          <div className="relative h-44 rounded-lg overflow-hidden">
            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-2 left-3 right-3">
              <p className="text-white text-sm font-bold line-clamp-2">{offer.description}</p>
            </div>
          </div>

          {/* Price and Stats Section */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-purple-50 p-2 rounded-lg text-center">
              <p className="text-purple-600 text-xs font-medium">Price</p>
              <p className="text-lg font-bold text-purple-900">₹{offer.price || 499}</p>
              <p className="text-purple-600 text-[10px]">From India</p>
            </div>
            <div className="bg-purple-50 p-2 rounded-lg text-center">
              <p className="text-purple-600 text-xs font-medium">Tickets Left</p>
              <p className="text-lg font-bold text-purple-900">{offer.totalTickets || 2500}</p>
              <p className="text-purple-600 text-[10px]">Limited Stock</p>
            </div>
            <div className="bg-purple-50 p-2 rounded-lg text-center">
              <p className="text-purple-600 text-xs font-medium">Ends In</p>
              <p className="text-lg font-bold text-purple-900">5 Days</p>
              <p className="text-purple-600 text-[10px]">Act Fast!</p>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold flex items-center gap-1.5">
              <Star className="w-4 h-4 text-purple-500" />
              Offer Details
            </h3>
            <div className="bg-gray-50 p-3 rounded-lg space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-4 h-4 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <span className="text-purple-600 text-xs">1</span>
                </div>
                <p className="text-gray-700 text-sm">Purchase a ticket for ₹{offer.price || 499} to enter</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-4 h-4 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <span className="text-purple-600 text-xs">2</span>
                </div>
                <p className="text-gray-700 text-sm">Draw on {offer.drawDate || '20 Feb 2025'} or earlier if sold out</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-4 h-4 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <span className="text-purple-600 text-xs">3</span>
                </div>
                <p className="text-gray-700 text-sm">Winners notified via email and phone</p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-purple-700">
              <Tag className="w-3.5 h-3.5" />
              <span>Limited time offer</span>
            </div>
            <div className="flex items-center gap-1.5 text-purple-700">
              <Clock className="w-3.5 h-3.5" />
              <span>Early bird bonus!</span>
            </div>
          </div>

          {/* CTA Section */}
          <div className="pt-2 space-y-3">
            <div className="flex gap-2">
              <Button className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white text-sm py-2 rounded-lg">
                Buy Ticket Now
              </Button>
              <Button variant="outline" onClick={onClose} size="sm">
                Close
              </Button>
            </div>
            <p className="text-center text-xs text-gray-500">
              By purchasing, you agree to our terms & conditions
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};