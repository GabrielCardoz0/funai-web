import { IUserUpdateInput, IUserUpdatePasswordInput } from "@/types";
import { api } from "./axios";

export const getMe = async () => {
  try {
    const response = await api.get('/users/me');

    if (!response.status || response.status !== 200) {
      throw new Error('Failed to login');
    }

    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}

export const updateUser = async (data: IUserUpdateInput) => {
  try {
    const response = await api.put('/users', data);

    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}

export const updatePassword = async (data: IUserUpdatePasswordInput) => {
  try {
    const response = await api.put('/users/password', data);

    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}

export const forgotPassword = async (email: string) => {
  try {
    const response = await api.post('/auth/forgot-password', { email });

    return response.data;
  } catch (error) {
    console.error('Error forgot password:', error);
    throw error;
  }
}

export const resetPassword = async (data: { password: string, token: string }) => {
  try {
    const response = await api.post('/auth/reset-password', data);

    return response.data;
  } catch (error) {
    console.error('Error reset password:', error);
    throw error;
  }
}

export const cancelSubscription = async (data: { password: string, reason: string }) => {
  try {
    const response = await api.delete('/subscriptions', {
      data
    });

    return response.data;
  } catch (error) {
    console.error('Error cancel subscription:', error);
    throw error;
  }
}

export const getSubscription = async () => {
  try {
    const response = await api.get('/subscriptions');

    return response.data;
  } catch (error) {
    console.error('Error get subscription:', error);
    throw error;
  }
}