// src/components/Topbar.jsx
import { useState } from 'react';
import { FiMenu, FiSearch } from 'react-icons/fi';
import ThemeToggle from "./ThemeToggle";

function Topbar({ onSearch, sidebarOpen, setSidebarOpen }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) onSearch(value);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-30 transition-colors duration-300">
      {/* Left Section - Menu Button & Title */}
      <div className="flex items-center space-x-4">
        <button 
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FiMenu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">CRM</h2>
      </div>

      {/* Right Section - Search and Controls */}
      <div className="flex items-center space-x-6">
        <div className="relative hidden md:block">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 border rounded-md text-sm w-64 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}

export default Topbar;