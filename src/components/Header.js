import React from "react";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 w-full flex items-center justify-between">
      {/* Left Section (Logo or Title) */}
      <div className="flex items-center space-x-2">
        <h1 className="text-xl hidden md:block">Shell App</h1>
      </div>

      {/* Right Section (Navigation) */}
      <nav className="hidden md:flex space-x-6 text-lg">
        <a href="/" className="hover:text-gray-200">Home</a>
        <a href="/about" className="hover:text-gray-200">About</a>
        <a href="/services" className="hover:text-gray-200">Services</a>
        <a href="/contact" className="hover:text-gray-200">Contact</a>
      </nav>

      {/* Mobile Menu (visible on smaller screens) */}
      <div className="md:hidden">
        <button className="text-white p-2 bg-blue-500 rounded hover:bg-blue-400">
          Menu
        </button>
      </div>
    </header>
  );
};

export default Header;
