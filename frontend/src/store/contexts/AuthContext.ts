/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { IAuthContext } from '../../interfaces/IAuthContext';

export const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: () => {},
  accessToken: null,
  setAccessToken: () => {},
  refreshToken: null,
  setRefreshToken: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  isLoading: false,
  setIsLoading: () => {},
  login: () => Promise.resolve(),
  logout: () => {},
  register: () => Promise.resolve(),
  registerByAdmin: () => Promise.resolve(),
  message: null,
  setMessage: () => {},
  title: null,
  setTitle: () => {},
  type: null,
  setType: () => {},
});
