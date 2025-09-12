import { useState } from 'react';

const useAuthToken = () => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token');
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