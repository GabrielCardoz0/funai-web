import { publicRoutes } from '@/app/layout';
import useAuthToken from '@/hooks/useLocalstorage';
import { getMe } from '@/services/users';
import { IUser } from '@/types';
import { useRouter, usePathname } from 'next/navigation';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';


interface UserContextProps {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  fetchMe: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const { token } = useAuthToken();
  const router = useRouter();
  const pathname = usePathname();

  const expelUser = () => {
    if (!publicRoutes.includes(pathname)) {
      setUser(null);
      router.push('/login');
    }
  };

  const verifyUserTokenOrExpel = () => {
    if(!token && !user) {
      expelUser();
    }
  };

  useEffect(() => verifyUserTokenOrExpel(), [pathname])

  const fetchMe = () => getMe().then(res => setUser(res.data.user)).catch(() => expelUser());

  useEffect(() => {
    verifyUserTokenOrExpel();
    
    if(token && !user) {
      getMe().then(res => setUser(res.data.user)).catch(() => expelUser());
    }
    
  }, [user, token]);


  return (
    <UserContext.Provider value={{ user, setUser, fetchMe }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};