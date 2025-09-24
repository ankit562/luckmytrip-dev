import React, { useState } from 'react';

const ExploreSection = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const exploreItems = [
    { id: 1, title: 'Marketing Campaign', type: 'Campaign', status: 'Active' },
    { id: 2, title: 'Product Launch', type: 'Event', status: 'Upcoming' },
    { id: 3, title: 'User Analytics', type: 'Report', status: 'Ready' },
    { id: 4, title: 'Content Strategy', type: 'Strategy', status: 'Draft' },
  ];

  const filteredItems = exploreItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search items..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{item.type}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.status === 'Active'
                  ? 'bg-green-100 text-green-800'
                  : item.status === 'Upcoming'
                  ? 'bg-blue-100 text-blue-800'
                  : item.status === 'Ready'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreSection;
