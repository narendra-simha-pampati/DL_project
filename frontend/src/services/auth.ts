import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api/auth';

export interface User {
  id: string;
  name: string;
  username: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RegisterData {
  name: string;
  username: string;
  password: string;
  faceDescriptor: number[];
}

export interface LoginData {
  username: string;
  password: string;
}

export interface FaceLoginData {
  faceDescriptor: number[];
}

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/register', data);
    return response.data;
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/login', data);
    return response.data;
  },

  faceLogin: async (data: FaceLoginData): Promise<AuthResponse> => {
    const response = await api.post('/face-login', data);
    return response.data;
  },

  getMe: async (): Promise<{ user: User }> => {
    const response = await api.get('/me');
    return response.data;
  },
};
