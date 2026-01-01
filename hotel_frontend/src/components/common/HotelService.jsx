import React from "react";
import {
  FaWifi,
  FaUtensils,
  FaTshirt,
  FaCocktail,
  FaParking,
  FaSnowflake,
  FaSwimmingPool,
  FaDumbbell,
  FaSpa,
  FaShieldAlt,
  FaConciergeBell,
  FaTree,
  FaTv,
  FaCoffee,
  FaCar,
  FaKey,
  FaUmbrellaBeach,
  FaHotTub,
  FaBaby,
  FaDog,
  FaBriefcase,
  FaGamepad,
  FaMusic,
  FaUserCheck,
  FaSmokingBan
} from "react-icons/fa";

const HotelService = () => {
  const serviceCategories = [
   
	
    {
      title: "Comfort & Amenities",
      icon: <FaSnowflake className="text-cyan-500" />,
      services: [
        { icon: <FaSnowflake />, name: "Climate Control", description: "Individual room temperature control with AC/heating" },
        { icon: <FaKey />, name: "Digital Key", description: "Mobile check-in and digital room key access" },
        { icon: <FaShieldAlt />, name: "In-room Safe", description: "Electronic safe for your valuables" },
        { icon: <FaSmokingBan />, name: "Non-Smoking Rooms", description: "Fresh, clean air in all accommodations" }
      ]
    },
   
    {
      title: "Business & Convenience",
      icon: <FaBriefcase className="text-orange-500" />,
      services: [
        { icon: <FaBriefcase />, name: "Business Center", description: "Fully equipped business center with printing" },
        { icon: <FaUserCheck />, name: "Meeting Rooms", description: "Flexible meeting and conference spaces" },
        { icon: <FaTshirt />, name: "Express Laundry", description: "Same-day laundry and dry cleaning service" },
        { icon: <FaConciergeBell />, name: "Concierge", description: "Personalized assistance for tours and reservations" }
      ]
    },
   
    
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Luxury <span className="text-blue-600">Amenities</span> & Services
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Experience unparalleled comfort with our comprehensive range of premium services 
          designed to make your stay truly memorable
        </p>
        <div className="w-24 h-1 bg-blue-500 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto">
        {serviceCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-16">
            {/* Category Header */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-3 bg-white rounded-full px-6 py-3 shadow-lg">
                <div className="text-2xl">
                  {category.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {category.title}
                </h2>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.services.map((service, serviceIndex) => (
                <div
                  key={serviceIndex}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  <div className="p-6">
                    {/* Service Icon */}
                    <div className="flex items-center justify-center w-16 h-16 bg-blue-50 rounded-xl mb-4 group-hover:bg-blue-100 transition-colors duration-300">
                      <div className="text-2xl text-blue-600">
                        {service.icon}
                      </div>
                    </div>

                    {/* Service Details */}
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Features Banner */}
      <div className="max-w-7xl mx-auto mt-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Premium Services Included
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              Every stay includes complimentary access to all our premium amenities and personalized services
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-2">
                  <FaUserCheck className="text-xl" />
                </div>
                <span className="font-semibold">24/7 Support</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-2">
                  <FaShieldAlt className="text-xl" />
                </div>
                <span className="font-semibold">Security</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-2">
                  <FaConciergeBell className="text-xl" />
                </div>
                <span className="font-semibold">Concierge</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-2">
                  <FaTree className="text-xl" />
                </div>
                <span className="font-semibold">Eco-Friendly</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Ready to Experience Luxury?
        </h3>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Book your stay now and enjoy all these premium amenities and services
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
          Book Your Stay Now
        </button>
      </div>
    </div>
  );
};

export default HotelService;