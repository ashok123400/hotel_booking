import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Component to display nearby tourist recommendations
 * Props:
 *  - city: String (e.g., "Chennai", "Coimbatore")
 *  - category: Optional filter (e.g., "Temple", "Beach")
 */
const TouristRecommendations = ({ city, category = null }) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(category);

  const API_URL = 'http://localhost:8080/api/tourist-places';

  useEffect(() => {
    fetchTouristPlaces();
  }, [city, selectedCategory]);

  const fetchTouristPlaces = async () => {
    setLoading(true);
    setError(null);
    try {
      let endpoint = `${API_URL}/recommendations?city=${city}`;
      
      // If category filter is selected
      if (selectedCategory) {
        endpoint = `${API_URL}/city/${city}/category/${selectedCategory}`;
      }

      const response = await axios.get(endpoint);
      setPlaces(response.data);
    } catch (err) {
      setError('Failed to load tourist places. Please try again.');
      console.error('Error fetching tourist places:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'All',
    'Temple',
    'Beach',
    'Museum',
    'Historical',
    'Park',
    'Spiritual',
    'Waterfall',
    'Hill Station'
  ];

  if (loading) {
    return <div className="text-center py-8">Loading recommendations...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div className="tourist-recommendations p-8 bg-gray-50">
      <h2 className="text-3xl font-bold mb-2">
        Explore {city}
      </h2>
      <p className="text-gray-600 mb-6">
        Discover amazing tourist attractions and things to do
      </p>

      {/* Category Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat === 'All' ? null : cat)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              (cat === 'All' && selectedCategory === null) ||
              selectedCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tourist Places Grid */}
      {places.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place) => (
            <div
              key={place.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Image */}
              {place.imageUrl && (
                <div className="h-48 bg-gray-300 overflow-hidden">
                  <img
                    src={place.imageUrl}
                    alt={place.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-800 flex-1">
                    {place.name}
                  </h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                    {place.category}
                  </span>
                </div>

                {/* Distance */}
                <p className="text-sm text-gray-500 mb-2">
                  📍 {place.distanceFromCity} km from city center
                </p>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {place.description}
                </p>

                {/* Opening Hours */}
                {place.openingHours && (
                  <p className="text-sm text-gray-500 mb-2">
                    🕐 {place.openingHours}
                  </p>
                )}

                {/* Ticket Info */}
                <div className="mb-4">
                  {place.ticketRequired ? (
                    <p className="text-sm font-semibold text-green-600">
                      💳 Entry: ₹{place.ticketPrice}
                    </p>
                  ) : (
                    <p className="text-sm font-semibold text-green-600">
                      ✓ Free Entry
                    </p>
                  )}
                </div>

                {/* Action Button */}
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No tourist places found for the selected filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default TouristRecommendations;
