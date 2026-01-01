import React, { useState } from 'react';
import TouristRecommendations from '../common/TouristRecommendations';

/**
 * Example usage of TouristRecommendations component
 * This can be integrated into your booking or hotel details page
 */
const HotelDetailsWithRecommendations = ({ hotelCity = 'Chennai' }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="hotel-details-container">
      {/* Hotel Overview Section */}
      <div className="hotel-info bg-white p-8 shadow-md">
        <h1 className="text-4xl font-bold mb-4">Hotel Name</h1>
        <p className="text-gray-600 text-lg mb-4">
          Located in {hotelCity}
        </p>
        
        {/* Tab Navigation */}
        <div className="flex gap-4 border-b mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-4 font-medium border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('attractions')}
            className={`py-2 px-4 font-medium border-b-2 transition-colors ${
              activeTab === 'attractions'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Local Attractions
          </button>
          <button
            onClick={() => setActiveTab('amenities')}
            className={`py-2 px-4 font-medium border-b-2 transition-colors ${
              activeTab === 'amenities'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Amenities
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div>
            <p className="text-gray-700">
              Welcome to our hotel in {hotelCity}. We offer comfortable rooms,
              excellent service, and convenient access to local attractions.
            </p>
          </div>
        )}

        {activeTab === 'amenities' && (
          <div>
            <ul className="list-disc list-inside text-gray-700">
              <li>Free Wi-Fi</li>
              <li>24-hour Room Service</li>
              <li>Swimming Pool</li>
              <li>Restaurant & Bar</li>
              <li>Business Center</li>
            </ul>
          </div>
        )}
      </div>

      {/* Tourist Recommendations Section */}
      {activeTab === 'attractions' && (
        <div className="mt-8">
          <TouristRecommendations city={hotelCity} />
        </div>
      )}
    </div>
  );
};

export default HotelDetailsWithRecommendations;
