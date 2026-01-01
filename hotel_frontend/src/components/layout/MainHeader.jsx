import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const slides = [
    {
      badge: "Luxury Experience Awaits",
      title: "Experience World-Class",
      highlight: "Luxury ",
      highlightColor: "Comfort",
      description: "Experience world-class comfort with our premium room collection designed for your ultimate relaxation and enjoyment.",
      bgImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2070&q=80",
      frontImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      decorativeImage: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80"
    },
    {
      badge: "Perfect Getaway Destination",
      title: "Your Ideal",
      highlight: "Perfect ",
      highlightColor: "Getaway",
      description: "Find your ideal escape in our carefully curated accommodations with stunning views and exceptional amenities.",
      bgImage: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=2070&q=80",
      frontImage: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80",
      decorativeImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
    },
    {
      badge: "Relax in Ultimate Comfort",
      title: "Unwind & Relax",
      highlight: "In Complete ",
      highlightColor: "Style",
      description: "Discover rooms designed for your ultimate relaxation with premium bedding, spa-like bathrooms, and serene ambiance.",
      bgImage: "https://www.luxuryabode.com/mona/img/hotels.jpg",
frontImage: "https://www.luxuryabode.com/mona/img/hotels.jpg",
decorativeImage: "https://img.freepik.com/free-photo/modern-office-interior-with-minimalist-furniture_23-2151384691.jpg?w=800"
},
    {
      badge: "Your Home Away From Home",
      title: "Experience Hotel",
      highlight: "Jolly ",
      highlightColor: "Hospitality",
      description: "Comfort and elegance in every stay at Jolly Hotel. Experience personalized service and unforgettable memories.",
      bgImage: "https://img.freepik.com/free-photo/indoor-design-luxury-resort_23-2150497283.jpg?t=st=1761623204~exp=1761626804~hmac=430f77225358e401d44f2c9558bf066660b48e1e54be95f26392da01ecb83eb8&w=1060",
      frontImage: "https://img.freepik.com/free-photo/indoor-design-luxury-resort_23-2150497283.jpg?w=800",
      decorativeImage: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const timer = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[95vh] overflow-hidden">
      {/* Slides Container */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image Layer */}
          <div 
            className="absolute inset-0 transition-transform duration-1000"
            style={{
              backgroundImage: `url(${slide.bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: index === currentSlide ? "scale(1)" : "scale(1.1)",
            }}
          />
          
          {/* White Overlay - Primary Layer */}
          <div className="absolute inset-0 bg-white/40" />
          
          {/* Enhanced White Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-white/30 to-white/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/40" />
          
          {/* Subtle Dark Edges for Depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />

          {/* Decorative Elements with Better Blending */}
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl animate-pulse" />
          <div 
            className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-orange-400/10 rounded-full blur-3xl animate-pulse" 
            style={{ animationDelay: "700ms" }} 
          />

          {/* Enhanced Cross Decoration */}
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 opacity-5">
            <div className="relative w-24 h-24">
              <div className="absolute top-1/2 left-0 right-0 h-4 bg-amber-400/40 transform -translate-y-1/2 rounded-full blur-sm" />
              <div className="absolute left-1/2 top-0 bottom-0 w-4 bg-amber-400/40 transform -translate-x-1/2 rounded-full blur-sm" />
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-16 h-full flex items-center">
            <div className="grid md:grid-cols-2 gap-12 items-center w-full">
              
              {/* Left Content - Text Section */}
              <div className="space-y-8">
                {/* Badge with Enhanced Overlay */}
                <div className="inline-block">
                  <span className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wide shadow-xl border border-white/20">
                    {slide.badge}
                  </span>
                </div>

                {/* Title Section */}
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-800 leading-tight drop-shadow-sm">
                    {slide.title}
                  </h1>
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold">
                    <span className="text-gray-800 drop-shadow-sm">{slide.highlight}</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 drop-shadow-sm">
                      {slide.highlightColor}
                    </span>
                  </h2>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-lg leading-relaxed max-w-xl bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-gray-200/50 shadow-lg">
                  {slide.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  {isLoggedIn ? (
                    <Link
                      to="/browse-all-rooms"
                      className=" p-3 bg-gradient-to-r from-amber-500 to-orange-600 
                                 hover:from-amber-600 hover:to-orange-700 text-white font-semibold 
                                 rounded-4 transition-all duration-500 ease-in-out 
                                 shadow-2xl hover:shadow-amber-500/50 transform hover:-translate-y-1 hover:scale-105 
                                 flex items-center justify-center text-lg backdrop-blur-sm border border-amber-300/30"
                    >
                      <svg 
                        className="w-5 h-5 mr-3" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                     Browse Rooms
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 
                                 hover:from-amber-600 hover:to-orange-700 text-white font-semibold 
                                 rounded-full transition-all duration-500 ease-in-out 
                                 shadow-2xl hover:shadow-amber-500/50 transform hover:-translate-y-1 hover:scale-105 
                                 flex items-center justify-center text-lg backdrop-blur-sm border border-amber-300/30"
                    >
                      <svg 
                        className="w-5 h-5 mr-3" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                      </svg>
                      Book Your Stay
                    </Link>
                  )}
                  
                  {/* Enhanced Play Button */}
                  <button 
                    className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 
                               hover:from-amber-600 hover:to-orange-700 rounded-full 
                               flex items-center justify-center transition-all duration-300 
                               hover:scale-110 hover:shadow-2xl hover:shadow-amber-500/40 
                               backdrop-blur-sm border border-amber-300/30 group"
                  >
                    <Play className="w-6 h-6 text-white fill-white ml-1 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Right Content - Images Section */}
              <div className="relative h-80 md:h-[450px]">
                {/* Enhanced Background Decorative Image */}
                <div className="absolute -top-6 -right-6 w-full h-full opacity-10 blur-lg">
                  <img 
                    src={slide.decorativeImage}
                    alt="Hotel background"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>

                {/* Main Image with Enhanced Overlay */}
                <div className="relative z-10 h-full transform hover:scale-105 transition-transform duration-700">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden">
                    <img 
                      src={slide.frontImage}
                      alt="Luxury hotel room"
                      className="w-full h-full object-cover"
                    />
                    {/* Enhanced Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
                    <div className="absolute inset-0 border-2 border-white/20 rounded-2xl" />
                  </div>
                </div>

                {/* Enhanced Floating Elements */}
                <div className="absolute -top-8 -left-8 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl animate-pulse" />
                <div 
                  className="absolute -bottom-8 -right-8 w-40 h-40 bg-orange-400/10 rounded-full blur-2xl animate-pulse" 
                  style={{ animationDelay: "700ms" }} 
                />
                
                {/* Enhanced Rating Badge */}
                <div className="absolute -top-4 -right-4 z-20 bg-white/90 backdrop-blur-md rounded-full shadow-2xl px-4 py-2 flex items-center gap-2 border border-amber-200/50">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-bold text-gray-800">5.0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Bottom Gradient Overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white/40 via-white/20 to-transparent" />
        </div>
      ))}

      {/* Enhanced Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-30 
                   w-14 h-14 bg-white/20 backdrop-blur-md rounded-full 
                   flex items-center justify-center shadow-2xl 
                   hover:bg-white/30 hover:shadow-amber-500/30 transition-all duration-300 
                   hover:scale-110 border border-white/30"
      >
        <ChevronLeft className="w-7 h-7 text-white" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-30 
                   w-14 h-14 bg-white/20 backdrop-blur-md rounded-full 
                   flex items-center justify-center shadow-2xl 
                   hover:bg-white/30 hover:shadow-amber-500/30 transition-all duration-300 
                   hover:scale-110 border border-white/30"
      >
        <ChevronRight className="w-7 h-7 text-white" />
      </button>

      {/* Enhanced Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full backdrop-blur-sm ${
              index === currentSlide 
                ? "w-12 h-3 bg-gradient-to-r from-amber-400 to-orange-500 shadow-2xl border border-amber-300/50" 
                : "w-3 h-3 bg-white/40 hover:bg-white/60 border border-white/30"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;