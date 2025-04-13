import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.png" alt="CyberVault Logo" className="h-10 mr-4" />
          <span className="text-white text-xl font-bold">CyberVault</span>
        </div>
        <div className="space-x-6">
          <a href="#home" className="text-white hover:text-gray-300">Home</a>
          <a href="#encrypt" className="text-white hover:text-gray-300">Encrypt</a>
          <a href="#decrypt" className="text-white hover:text-gray-300">Decrypt</a>
          <a href="#sniff" className="text-white hover:text-gray-300">Sniff</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
