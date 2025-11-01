import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-500 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-white rounded-sm grid grid-cols-2 gap-0.5 p-0.5">
            <div className="bg-blue-600"></div>
            <div className="bg-blue-600"></div>
            <div className="bg-blue-600"></div>
            <div className="bg-blue-600"></div>
          </div>
          <span className="text-white font-semibold text-lg">Dashboard</span>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-white hover:underline">Connexion</button>
          <button className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-1 rounded-md">
            S'inscrire
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
