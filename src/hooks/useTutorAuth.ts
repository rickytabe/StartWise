import { useState } from 'react';
import { registerTutor, loginTutor, googleTutorSignIn } from '../services/auth';
import { Mentor } from '../types';
import { toast } from 'react-toastify';

export const useTutorAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (
    email: string,
    password: string,
    userData: Omit<Mentor, 'uid' | 'email' | 'role' | 'createdAt' | 'updatedAt'>
  ) => {
    setLoading(true);
    setError(null);
    try {
      const result = await registerTutor(email, password, userData);
      toast.success('Registration successful!');
      return result;
    } catch (err: any) {
      const errorMessage = err.message || 'Registration failed';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await loginTutor(email, password);
      toast.success('Login successful!');
      return result;
    } catch (err: any) {
      const errorMessage = err.message || 'Login failed';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await googleTutorSignIn();
      toast.success('Login successful!');
      return result;
    } catch (err: any) {
      const errorMessage = err.message || 'Google login failed';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    login,
    googleLogin,
    loading,
    error
  };
};