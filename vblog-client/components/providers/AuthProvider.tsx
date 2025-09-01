'use client';

import {
  getAccessTokenFromLocalStorage,
  removeAccessTokenFromLocalStorage,
} from '@/lib/utils';
import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext({
  isAuth: false,
  setIsAuth: (isAuth: boolean) => {},
});
export const useAppContext = () => {
  return useContext(AppContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuthState] = useState(false);

  useEffect(() => {
    const accessToken = getAccessTokenFromLocalStorage();
    if (accessToken) {
      setIsAuthState(true);
    }
  }, []);

  const setIsAuth = (isAuth: boolean) => {
    if (isAuth) {
      setIsAuthState(true);
    } else {
      setIsAuthState(false);
      removeAccessTokenFromLocalStorage();
    }
  };
  return (
    <AppContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AppContext.Provider>
  );
};
