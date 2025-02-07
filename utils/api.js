// @/utils/api.js
import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//-----------------AUTHENTICATION-------------------------

export const loginUser = async (mobile, password) => {
  try {
    const response = await api.post('/auth/login', {
      mobile,
      password,
    });
    
    if (response.data.status) {
      saveAuthTokens(response.data);
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const signUpUser = async (userData) => {
  try {
    const response = await api.post('/auth/signup', userData);
    
    if (response.data.status) {
      saveAuthTokens(response.data);
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


export const verifyOtp = async (otp) => {
  try {
    const response = await api.post('/auth/verify-otp/', { otp });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const resendOtp = async () => {
  try {
    const response = await api.post('/auth/resend-otp');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


export const saveUserData = (email, mobile) => {
  Cookies.set('user_email', email);
  Cookies.set('user_mobile', mobile);
};

export const getUserData = () => ({
  email: Cookies.get('user_email'),
  mobile: Cookies.get('user_mobile')
});

const saveAuthTokens = (data) => {
  Cookies.set('access_token', data.access_token);
  Cookies.set('refresh_token', data.refresh_token);
  Cookies.set('access_expiry', data.access_expiry);
  Cookies.set('refresh_expiry', data.refresh_expiry);
};

export default api;