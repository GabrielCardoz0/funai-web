import { api } from "./axios";

export const login = async (payload: {email: string, password: string}) => {
  try {
    const response = await api.post('/auth/login', payload);

    if (!response.status || response.status !== 200) {
      throw new Error('Failed to login');
    }

    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}