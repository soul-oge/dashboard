import React, { useState } from "react";
import useProfile from "../hooks/useProfile";
import useLogout from "../hooks/useLogout";
import { Link } from "react-router-dom";
import Service from "../components/Service";

const ProfilePage = () => {
  const { form, loading, error, handleChange, handleUpdate } = useProfile();
  const { handleLogout } = useLogout();
  const [isModalOpen, setModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p className="text-xl font-semibold">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-red-500">
        <p className="text-xl font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex items-center justify-between">
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
        <div className="flex items-center space-x-4">
          <span className="font-semibold text-gray-700">
            <span className="text-xl">Hi, </span>
            {form.username}
          </span>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105"
          >
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Log Out
          </button>
        </div>
      </nav>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-blue-500/30 transition-all duration-500 w-full max-w-md relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-4 text-gray-600 text-2xl hover:text-red-400 transition"
            >
              &times;
            </button>
            <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
              Edit Profile
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
                setModalOpen(false);
              }}
              className="space-y-5"
            >
              <div>
                <label className="block mb-1 text-sm text-gray-600">
                  Username
                </label>
                <input
                  name="username"
                  placeholder="Enter username"
                  value={form.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-600">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-600">
                  New Password
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter new password"
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold py-3 rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Widgets</h2>
        <Service />
      </main>
    </div>
  );
};

export default ProfilePage;
