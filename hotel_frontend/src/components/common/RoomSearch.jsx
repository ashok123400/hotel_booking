import React, { useState } from "react";
import { Search } from "lucide-react";

const RoomSearch = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="relative max-w-lg mx-auto my-4">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-amber-500 group-focus-within:text-amber-600 transition-colors duration-200" />
        </div>
        <input
          type="text"
          placeholder="Find your perfect room type..."
          className="block w-full pl-11 pr-4 py-3 text-gray-900 placeholder-gray-400 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 shadow-lg group-hover:shadow-xl group-hover:border-amber-300"
          value={searchQuery}
          onChange={handleSearch}
        />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 opacity-0 group-focus-within:opacity-5 transition-opacity duration-200 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default RoomSearch;