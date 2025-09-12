"use client";
import { useState } from 'react';

const useAuthToken = () => {
  // const [token, setToken] = useState<string | null>(() => {
  //   return localStorage.getItem('token');
  // });
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  });

  const saveToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return { token, saveToken, removeToken };
};

export default useAuthToken;