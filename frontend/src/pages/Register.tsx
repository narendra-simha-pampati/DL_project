import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaceCapture } from '../components/FaceCapture';
import { authAPI } from '../services/auth';
import { useAuth } from '../context/AuthContext';

export const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
  });
  const [faceDescriptor, setFaceDescriptor] = useState<number[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!faceDescriptor) {
      setError('Please capture your face before registering');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await authAPI.register({
        ...formData,
        faceDescriptor,
      });
      
      login(response.token, response.user);
      navigate('/welcome');
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.message) {
        setError(error.message);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create Your Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Register with your credentials and face recognition
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !faceDescriptor}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Creating Account...' : 'Register'}
                </button>
              </form>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Face Registration
              </h3>
              <FaceCapture
                onCapture={setFaceDescriptor}
                buttonText="Register Face"
              />
              {faceDescriptor && (
                <div className="mt-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
                  ✓ Face registered successfully
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
