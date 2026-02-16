import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaceCapture } from '../components/FaceCapture';
import { authAPI } from '../services/auth';
import { useAuth } from '../context/AuthContext';

export const FaceLogin: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleFaceCapture = async (descriptor: number[]) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await authAPI.faceLogin({ faceDescriptor: descriptor });
      login(response.token, response.user);
      navigate('/welcome');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Face recognition failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Face Recognition Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              use username and password
            </Link>
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-8">
          <div className="text-center mb-6">
            <p className="text-gray-600">
              Position your face in front of the camera and click "Login with Face"
            </p>
          </div>

          <FaceCapture
            onCapture={handleFaceCapture}
            buttonText="Login with Face"
          />

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          {isLoading && (
            <div className="mt-4 bg-blue-50 border border-blue-200 text-blue-600 px-4 py-3 rounded-md">
              Verifying your face...
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
