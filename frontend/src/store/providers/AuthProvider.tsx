import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastMapKey } from '../../components/Toast/helpers';
import { IUser, IUserAuth, IUserSignUp } from '../../interfaces';
import { AuthContext } from '../../store/contexts/AuthContext';
import api from '../../utils/api';

interface AuthProviderProps {
  children?: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [type, setType] = useState<ToastMapKey | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = sessionStorage.getItem('access_token');

    if (accessToken) {
      setAccessToken(accessToken);

      sessionStorage.setItem('access_token', accessToken);

      setIsAuthenticated(true);
    }

    setIsLoading(false);
  }, []);

  const login = async (user: IUserAuth): Promise<void> => {
    const data = await api
      .post('/auth/signin', user)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error) => {
        console.log('Login Error: ', error.response.data.message);
        setMessage(error.response.data.message);
      });

    setAccessToken(data.access_token);

    sessionStorage.setItem('access_token', data.access_token);

    console.log(data);

    setUser(data.user);

    setIsAuthenticated(true);

    navigate('/');
  };

  console.log(message);
  const register = async (user: IUserSignUp) => {
    if (!user.name || !user.email || !user.password) {
      setMessage('Preencha todos os campos!');
      return Promise.reject(message);
    }

    try {
      const data = await api
        .post('/auth/signup', user)
        .then(
          (response: AxiosResponse) => {
            return response.data;
          }
          // (error) => {
          //   console.log(error.response.data);
          //   setMessage(error.response.data.message);
          //   return Promise.reject(error);
          // }
        )
        .catch((error) => {
          console.log(error.response.data);
          setMessage(error.response.data.message);
        });

      setUser(data.user);

      setIsAuthenticated(false);

      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const registerByAdmin = async (user: IUserSignUp) => {
    let message = 'Novo usuário criado com sucesso!';
    let title = 'Sucesso!';

    try {
      await api
        .post('/auth/signup', user)
        .then((response: AxiosResponse) => response.data);

      setType('success');
      setTitle(title);
      setMessage(message);
    } catch (error) {
      message = 'Erro ao realizar cadastro!';
      title = 'Erro!';

      setType('error');
      setTitle(title);
      setMessage(message);
    }
  };

  const logout = (): void => {
    setType(null);
    setTitle(null);
    setMessage(null);
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    setIsAuthenticated(false);
    sessionStorage.clear();
    localStorage.clear();
    navigate('/login');
  };

  const value = {
    user,
    setUser,
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    setIsLoading,
    login,
    logout,
    register,
    registerByAdmin,
    message,
    setMessage,
    title,
    setTitle,
    type,
    setType,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
