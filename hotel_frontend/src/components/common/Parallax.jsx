import React from "react";

const Parallax = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Layers for Parallax Effect */}
      <div className="absolute inset-0 z-0">
        {/* Main Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
          }}
        ></div>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-amber-400 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white max-w-4xl">
          {/* Main Heading with Animation */}
          <div className="mb-6">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 animate-fade-in-up">
              Experience{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Luxury
              </span>{" "}
              Redefined
            </h1>
          </div>

          {/* Subheading */}
          <div className="mb-8 animate-fade-in-up delay-300">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-light mb-4 opacity-90">
              At <span className="font-semibold text-amber-300">Jolly Hotel</span> - Where Every Moment Becomes a Memory
            </h2>
            <p className="text-lg sm:text-xl opacity-80 max-w-2xl mx-auto leading-relaxed">
              Indulge in unparalleled comfort, world-class amenities, and exceptional service that exceeds all expectations
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto animate-fade-in-up delay-500">
            <div className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Luxury Suites</span>
            </div>
            <div className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Fine Dining</span>
            </div>
            <div className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Spa & Wellness</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-700">
            <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/25">
              Book Your Stay
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
              Explore Amenities
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-amber-400 rounded-full opacity-60 animate-float"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-white rounded-full opacity-40 animate-float delay-1000"></div>
      <div className="absolute bottom-40 left-20 w-2 h-2 bg-amber-300 rounded-full opacity-50 animate-float delay-500"></div>
    </div>
  );
};

export default Parallax;