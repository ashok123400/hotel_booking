import React, { useEffect, useState } from "react";
import { getAllRooms } from "../utils/ApiFunctions";
import { Link } from "react-router-dom";
import RoomSearch from "./RoomSearch";
import { ArrowRight, Star, MapPin } from "lucide-react";

const RoomCarousel = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    getAllRooms()
      .then((data) => {
        setRooms(data);
        setFilteredRooms(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setIsLoading(false);
      });
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredRooms(rooms);
      return;
    }
    const filtered = rooms.filter((room) =>
      room.roomType.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRooms(filtered);
    setCurrentSlide(0);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev === Math.ceil(filteredRooms.length / 4) - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? Math.ceil(filteredRooms.length / 4) - 1 : prev - 1
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-96 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading rooms...</p>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg max-w-4xl mx-auto my-8">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-5 h-5 text-red-500">⚠️</div>
          </div>
          <div className="ml-3">
            <p className="text-red-700 font-medium">Error loading rooms</p>
            <p className="text-red-600 text-sm">{errorMessage}</p>
          </div>
        </div>
      </div>
    );
  }

  const slides = [];
  for (let i = 0; i < filteredRooms.length; i += 4) {
    slides.push(filteredRooms.slice(i, i + 4));
  }

  return (
    <section className="bg-gray-50 py-12 px-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-8">
        <div className="relative inline-block mb-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Our Rooms
          </h1>
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Discover comfortable and well-appointed rooms for your perfect stay
        </p>
        
        {/* Search */}
        <RoomSearch onSearch={handleSearch} />
        
        {/* Browse All Link */}
        <Link 
          to={"/browse-all-rooms"} 
          className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors duration-200 group mt-4"
        >
          Browse all rooms
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>

      {/* Rooms Carousel */}
      <div className="max-w-7xl mx-auto">
        {filteredRooms.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-xl p-8 max-w-md mx-auto shadow-lg border border-gray-200">
              <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No rooms found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search criteria</p>
              <button
                onClick={() => handleSearch("")}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
              >
                Show All Rooms
              </button>
            </div>
          </div>
        ) : (
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-50 text-amber-600 w-10 h-10 rounded-full flex items-center justify-center shadow-lg border border-gray-200 transition-all duration-200 z-10"
            >
              ‹
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-50 text-amber-600 w-10 h-10 rounded-full flex items-center justify-center shadow-lg border border-gray-200 transition-all duration-200 z-10"
            >
              ›
            </button>

            {/* Carousel Container */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slideRooms, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                      {slideRooms.map((room) => (
                        <div key={room.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-200">
                          {/* Image */}
                          <Link to={`/book-room/${room.id}`} className="block relative group">
                            <img
                              src={`data:image/png;base64, ${room.photo}`}
                              alt={room.roomType}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-3 right-3">
                              <span className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
                                <Star className="w-3 h-3 fill-current" />
                                Featured
                              </span>
                            </div>
                          </Link>
                          
                          {/* Content */}
                          <div className="p-4">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                              {room.roomType}
                            </h3>
                            
                            <p className="text-gray-500 text-sm mb-4">
                              Comfortable and spacious room with all essential amenities for a pleasant stay.
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-xl font-bold text-amber-600">
                                  ${room.roomPrice}
                                </span>
                                <span className="text-gray-500 text-sm">/night</span>
                              </div>
                              <Link
                                to={`/book-room/${room.id}`}
                                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 text-sm"
                              >
                                Book Now
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RoomCarousel;