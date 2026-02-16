import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface DashboardWelcomeProps {
  onComplete: () => void;
}

export const DashboardWelcome: React.FC<DashboardWelcomeProps> = ({ onComplete }) => {
  const { user } = useAuth();

  useEffect(() => {
    // Auto transition after 3 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-4xl w-full px-4">
        <div className="text-center">
          {/* Welcome Animation */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-600 rounded-full mb-6 animate-bounce">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-5xl font-bold text-gray-900 mb-4 animate-fadeIn">
              Welcome Back!
            </h1>
            
            <div className="text-2xl text-gray-700 mb-8 animate-slideUp">
              Hello, <span className="font-semibold text-blue-600">{user?.name}</span>! 👋
            </div>
          </div>

          {/* Success Message */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 transform animate-scaleIn">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center space-x-2 text-green-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold">Authentication Successful</span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">
              You have successfully logged in to your account using face recognition.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-blue-600 font-semibold mb-1">Secure Login</div>
                <div className="text-gray-600">Face ID verified</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-green-600 font-semibold mb-1">Account Active</div>
                <div className="text-gray-600">All systems operational</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-purple-600 font-semibold mb-1">Welcome</div>
                <div className="text-gray-600">@{user?.username}</div>
              </div>
            </div>
          </div>

          {/* Loading Indicator */}
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-sm">Taking you to your dashboard...</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 1s ease-out 0.3s both;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out 0.6s both;
        }
      `}</style>
    </div>
  );
};
