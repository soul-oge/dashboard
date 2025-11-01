import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext); 

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="absolute top-0 left-0 w-full z-10 bg-white shadow-sm">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* --- LOGO --- */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-white rounded-sm grid grid-cols-2 gap-0.5 p-0.5">
              <div className="bg-blue-600"></div>
              <div className="bg-blue-600"></div>
              <div className="bg-blue-600"></div>
              <div className="bg-blue-600"></div>
            </div>
            <Link to="/" className="text-black font-bold text-lg">
              <span className="text-blue-600">My_</span>Dashboard
            </Link>
          </div>

          {/* --- MENU DESKTOP --- */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-800 font-semibold">
                  Bonjour, { user.username}
                </span>

                <Link
                  to="/profile"
                  className="bg-purple-200 text-blue-700 px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-100 transition"
                >
                  Mon profil
                </Link>

                {/* 🔹 Lien admin visible uniquement si le rôle est admin */}
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="bg-yellow-300 text-gray-800 px-4 py-2 rounded-md text-sm font-semibold hover:bg-yellow-200 transition"
                  >
                    Admin Dashboard
                  </Link>
                )}

                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-600 transition"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-purple-200 text-blue-700 px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-100 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-purple-200 text-blue-700 px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-100 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* --- BOUTON BURGER --- */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-200 focus:outline-none"
            >
              {!isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* --- MENU MOBILE --- */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden bg-gray-100 border-t">
          <div className="px-2 pt-2 pb-3 space-y-2">
            {user ? (
              <>
                <span className="block text-center font-semibold text-gray-800">
                  { user.username}
                </span>

                <Link
                  to="/profile"
                  className="block text-center bg-purple-200 text-blue-700 px-3 py-2 rounded-md text-base font-medium hover:bg-gray-200 transition"
                >
                  Mon profil
                </Link>

                {/* Admin */}
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="block text-center bg-yellow-300 text-gray-800 px-3 py-2 rounded-md text-base font-medium hover:bg-yellow-200 transition"
                  >
                    Admin Page
                  </Link>
                )}

                <button
                  onClick={logout}
                  className="block w-full text-center bg-red-500 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-red-600 transition"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-center bg-gray-200 text-blue-700 px-3 py-2 rounded-md text-base font-medium hover:bg-gray-300 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block text-center bg-gray-200 text-blue-700 px-3 py-2 rounded-md text-base font-medium hover:bg-gray-300 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
