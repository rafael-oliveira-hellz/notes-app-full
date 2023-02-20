import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MainPanel } from '../../components/Main';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { Admin } from '../../pages';
import { AuthContext } from '../../store/contexts/AuthContext';
import api from '../../utils/api';

export const Dashboard: React.FC = () => {
  const {
    logout,
    isAuthenticated,
    isLoading,
    setIsAuthenticated,
    setUser,
    user,
  } = useContext(AuthContext);
  const [accessToken] = useState<string>(
    sessionStorage.getItem('access_token') || ''
  );
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSideBarOpen = () => {
    setSideBarOpen(!sideBarOpen);
  };

  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    if (accessToken) {
      const decodedJwt = parseJwt(sessionStorage.getItem('access_token') || '');

      console.log(decodedJwt.exp);

      if (decodedJwt.exp * 1000 < Date.now()) {
        logout();
      }

      api
        .get('/auth/verify-user', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(
          (response) => {
            setIsAuthenticated(true);
            setUser(response.data.user);
          },
          (error) => {
            logout();
          }
        );

      if (!isAuthenticated) {
        navigate('/login');
      }
    }
  }, [accessToken, isAuthenticated, isLoading, navigate]);

  return (
    <>
      <div className="hb_container">
        <Sidebar
          handleSideBarOpen={handleSideBarOpen}
          sideBarOpen={sideBarOpen}
        />

        {location.pathname === '/' && <MainPanel user={user} />}

        {location.pathname === '/admin/users' && <Admin />}

        <Navbar
          handleSidebarOpen={handleSideBarOpen}
          sidebarOpen={sideBarOpen}
        />
      </div>
    </>
  );
};
