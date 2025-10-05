import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { ContentOfferModal } from '../modals/ContentOfferModal';

const MyContentSection = () => {
  const { user } = useAuth();
  const { content, addContent, updateContent, deleteContent } = useData();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '', 
    status: 'draft', 
    category: 'offers', 
    image: '',
    price: 499,
    totalTickets: 2500,
    drawDate: '2025-02-20',
    offer: '',
    termsAndConditions: ''
  });
  const [selectedContent, setSelectedContent] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Only content by this user, or all if superadmin
  // Sort myContent by createdAt descending (latest first)
  const myContent = user.role === 'superadmin'
    ? [...content].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : content.filter(item => item.createdBy === user.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingContent) {
      updateContent(editingContent.id, formData);
      setEditingContent(null);
    } else {
      addContent({ ...formData, id: Date.now(), createdBy: user.id, createdAt: new Date() });
      setShowCreateModal(false);
    }
    setFormData({ title: '', description: '', status: 'draft', category: 'offers', image: '' });
  };

  const startEdit = (contentItem) => {
    setEditingContent(contentItem);
    setFormData({
      title: contentItem.title || '',
      description: contentItem.description || '',
      status: contentItem.status || 'draft',
      category: contentItem.category || 'offers',
      image: contentItem.image || '',
      price: contentItem.price || 499,
      totalTickets: contentItem.totalTickets || 2500,
      drawDate: contentItem.drawDate || '2025-02-20',
      offer: contentItem.offer || '',
      termsAndConditions: contentItem.termsAndConditions || ''
    });
  };

  // Group myContent by category
  const categories = [
    { key: 'offers', label: 'Offers' },
    { key: 'jackpot', label: 'Jackpot Offer' },
    { key: 'spinlock', label: 'Spin Lock Offer' },
  ];
  const groupedContent = categories.map(cat => ({
    ...cat,
    items: myContent.filter(item => (item.category || 'offers') === cat.key),
  }));
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">My Content</h2>
        {(user.role === 'superadmin' || user.role === 'content_creator') && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Create New Content
          </button>
        )}
      </div>
      {myContent.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-4 text-4xl">📝</div>
          <p className="text-gray-600 mb-4">You haven't created any content yet</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Create Your First Content
          </button>
        </div>
      ) : (
        <div className="max-h-[60vh] overflow-y-auto flex flex-col gap-6">
          {groupedContent.map(cat => (
            <div key={cat.key}>
              <h3 className="text-lg font-bold mb-2 text-purple-700">{cat.label}</h3>
              {cat.items.length === 0 ? (
                <div className="text-gray-400 italic mb-4">No content in this category.</div>
              ) : (
                <div className="flex flex-col gap-4">
                  {cat.items.map(item => (
                    <div
                      key={item.id}
                      className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-purple-200 flex flex-col justify-end min-h-[320px] group transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                      style={item.image ? {backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center'} : {background: 'linear-gradient(to right, #4f46e5, #7c3aed)'}}>
                      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/80 z-0"></div>
                      <div className="absolute top-4 right-4 z-10">
                        <span className="inline-block bg-yellow-400 text-black text-sm font-bold px-3 py-1 rounded-full shadow-lg">Limited Time</span>
                      </div>
                      <div className="relative z-10 p-8 flex flex-col h-full justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                        <div className="flex flex-col gap-3">
                          <div className="flex items-baseline justify-between">
                            <div>
                              <h3 className="text-6xl font-black text-white drop-shadow-lg tracking-wide mb-2 bg-clip-text bg-gradient-to-r from-white to-white/80">WIN</h3>
                              <h4 className="text-2xl font-bold text-white/90 drop-shadow-md tracking-wide">{item.title}</h4>
                            </div>
                            <div className="text-right">
                              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                                <p className="text-purple-900 text-sm font-medium">Price</p>
                                <p className="text-3xl font-bold text-purple-700">₹{item.price || 499}</p>
                                <p className="text-xs text-purple-600">From India</p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-lime-400/90 backdrop-blur-sm text-gray-900 text-base font-semibold px-4 py-2 rounded-lg w-fit shadow-lg">
                            {item.description}
                          </div>
                          <div className="flex items-center justify-between gap-4 bg-black/30 backdrop-blur-sm rounded-lg p-4 mt-2">
                            <div>
                              <p className="text-white/80 text-sm font-medium mb-1">Total Tickets</p>
                              <p className="text-3xl font-bold text-yellow-400">{item.totalTickets || 2500}</p>
                            </div>
                            <div>
                              <p className="text-white/80 text-sm font-medium mb-1">Ends In</p>
                              <p className="text-lg font-bold text-yellow-400">5 Days</p>
                            </div>
                          </div>
                          <p className="text-white/70 text-sm mt-2">
                            Draw Date: {item.drawDate || '20 February 2025'} or earlier if sold out
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mt-6">
                          <button
                            onClick={() => setSelectedContent(item)}
                            className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white text-base px-6 py-2.5 rounded-lg font-semibold shadow-lg transition-all duration-200 hover:shadow-xl transform hover:-translate-y-0.5"
                          >
                            See Offer Details
                          </button>
                          {(user.role === 'superadmin' || item.createdBy === user.id) && (
                            <>
                              <button
                                onClick={() => startEdit(item)}
                                className="text-blue-600 bg-white/90 hover:bg-white text-base px-4 py-1 rounded font-semibold shadow"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteContent(item.id)}
                                className="text-red-600 bg-white/90 hover:bg-white text-base px-4 py-1 rounded font-semibold shadow"
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Offer Details Modal */}
      <ContentOfferModal
        isOpen={selectedContent !== null}
        onClose={() => setSelectedContent(null)}
        offer={selectedContent}
      />

      {/* Create/Edit Modal */}
      {(showCreateModal || editingContent) && (
        <div className="fixed overflow-y-auto flex-wrap inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3y className="text-lg font-semibold mb-4">
              {editingContent ? 'Edit Content' : 'Create New Content'}
            </h3y>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                  rows="3"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Tickets</label>
                  <input
                    type="number"
                    value={formData.totalTickets}
                    onChange={e => setFormData({ ...formData, totalTickets: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Draw Date</label>
                <input
                  type="date"
                  value={formData.drawDate}
                  onChange={e => setFormData({ ...formData, drawDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Offer Details</label>
                <textarea
                  value={formData.offer}
                  onChange={e => setFormData({ ...formData, offer: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                  rows="3"
                  placeholder="Enter any special offers or additional details"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Terms & Conditions</label>
                <textarea
                  value={formData.termsAndConditions}
                  onChange={e => setFormData({ ...formData, termsAndConditions: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                  rows="3"
                  placeholder="Enter terms and conditions for the offer"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Banner Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mb-2"
                />
                {formData.image && (
                  <img src={formData.image} alt="Banner Preview" className="w-full h-32 object-cover rounded mb-2 border" />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 mb-2"
                >
                  <option value="offers">Offers</option>
                  <option value="jackpot">Jackpot Offer</option>
                  <option value="spinlock">Spin Lock Offer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingContent(null);
                    setFormData({ 
                      title: '', 
                      description: '', 
                      status: 'draft',
                      category: 'offers',
                      image: '',
                      price: 499,
                      totalTickets: 2500,
                      drawDate: '2025-02-20',
                      offer: '',
                      termsAndConditions: ''
                    });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  {editingContent ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyContentSection;
