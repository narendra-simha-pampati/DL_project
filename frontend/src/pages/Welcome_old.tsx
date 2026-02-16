import React from 'react';
import { useAuth } from '../context/AuthContext';

export const Welcome: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white shadow-xl rounded-lg p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center">
              <svg
                className="h-10 w-10 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7 7z"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {user?.name}!
          </h1>

          <p className="text-gray-600 mb-8">
            You have successfully logged in as <span className="font-medium">{user?.username}</span>
          </p>

          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md">
              <p className="text-sm font-medium">✓ Authentication Successful</p>
              <p className="text-xs mt-1">You are now logged in to the system</p>
            </div>

            <button
              onClick={logout}
              className="w-full bg-red-600 text-white py-3 px-4 rounded-md font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
