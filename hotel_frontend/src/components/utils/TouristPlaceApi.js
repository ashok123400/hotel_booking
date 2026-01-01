// Tourist Places API Service
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Fetch recommendations for a specific city
export const getTouristRecommendations = (city) => {
  return axios.get(`${API_BASE_URL}/tourist-places/recommendations?city=${city}`);
};

// Fetch tourist places by city and category
export const getTouristPlacesByCategory = (city, category) => {
  return axios.get(
    `${API_BASE_URL}/tourist-places/city/${city}/category/${category}`
  );
};

// Fetch free attractions in a city
export const getFreeTouristPlaces = (city) => {
  return axios.get(`${API_BASE_URL}/recommendations/advanced/free?city=${city}`);
};

// Fetch day trip itinerary
export const getDayTripItinerary = (city) => {
  return axios.get(`${API_BASE_URL}/recommendations/advanced/day-trip?city=${city}`);
};

// Fetch places within budget
export const getTouristPlacesByBudget = (city, maxPrice) => {
  return axios.get(
    `${API_BASE_URL}/recommendations/advanced/by-budget?city=${city}&maxPrice=${maxPrice}`
  );
};

// Fetch places grouped by category
export const getTouristPlacesByAllCategories = (city) => {
  return axios.get(
    `${API_BASE_URL}/recommendations/advanced/by-category?city=${city}`
  );
};

// Search tourist places by keyword
export const searchTouristPlaces = (city, keyword) => {
  return axios.get(
    `${API_BASE_URL}/recommendations/advanced/search?city=${city}&keyword=${keyword}`
  );
};

// Fetch nearby places (within distance)
export const getNearbyPlaces = (city, distance = 25) => {
  return axios.get(
    `${API_BASE_URL}/recommendations/advanced/distance-range?city=${city}&minDistance=0&maxDistance=${distance}`
  );
};
