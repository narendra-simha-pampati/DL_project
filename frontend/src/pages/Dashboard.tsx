import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ActivityMonitor } from '../components/ActivityMonitor';
import { Sidebar } from '../components/Sidebar';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    // Track user activity
    const activityLog = {
      user: user?.username,
      action: 'dashboard_access',
      timestamp: new Date().toISOString(),
      page: currentPage
    };
    
    // Store activity in localStorage for demo
    const existingLogs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
    existingLogs.push(activityLog);
    localStorage.setItem('activityLogs', JSON.stringify(existingLogs.slice(-50))); // Keep last 50
  }, [currentPage, user]);

  const handleLogout = () => {
    const activityLog = {
      user: user?.username,
      action: 'logout',
      timestamp: new Date().toISOString(),
      page: currentPage
    };
    
    const existingLogs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
    existingLogs.push(activityLog);
    localStorage.setItem('activityLogs', JSON.stringify(existingLogs.slice(-50)));
    
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <h1 className="ml-4 text-xl font-semibold text-gray-900">
                  {currentPage === 'dashboard' ? 'Dashboard' : 'Activity Monitor'}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
                <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {currentPage === 'dashboard' ? (
            <div className="animate-fadeIn">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome back, {user?.name}! 👋
                </h2>
                <p className="text-gray-600">
                  Here's what's happening with your account today.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6 transform hover:scale-105 transition-transform duration-200">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Last Login</p>
                      <p className="text-lg font-semibold text-gray-900">Just now</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6 transform hover:scale-105 transition-transform duration-200">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 rounded-lg p-3">
                      <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Auth Method</p>
                      <p className="text-lg font-semibold text-gray-900">Face ID</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6 transform hover:scale-105 transition-transform duration-200">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-purple-100 rounded-lg p-3">
                      <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Account Type</p>
                      <p className="text-lg font-semibold text-gray-900">Premium</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6 transform hover:scale-105 transition-transform duration-200">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-orange-100 rounded-lg p-3">
                      <svg className="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Status</p>
                      <p className="text-lg font-semibold text-gray-900">Active</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity Preview */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-500 text-center py-8">
                    No recent activity. Start using the system to see your activity here.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <ActivityMonitor />
          )}
        </main>
      </div>
    </div>
  );
};
