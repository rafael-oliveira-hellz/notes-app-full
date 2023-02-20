import React, { useEffect } from 'react';
import { FaBars, FaClock } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import './index.css';

type Props = {
  handleSidebarOpen: () => void;
  sidebarOpen: boolean;
};

export const Navbar: React.FC<Props> = ({ handleSidebarOpen, sidebarOpen }) => {
  const location = useLocation();

  const tabs = [
    {
      tabTitle: 'Dashboard',
      tabPath: '/',
    },
    {
      tabTitle: 'Usuários',
      tabPath: '/admin/users',
    },
    {
      tabTitle: 'Anotações',
      tabPath: '/admin/notes',
    },
  ];

  useEffect(() => {
    const timeDisplay = document.getElementById('time') as HTMLElement;

    const refreshTime = () => {
      const date = new Date().toLocaleString('pt-BR', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'America/Sao_Paulo',
      });

      const formattedDate = date.replace(', ', ' - ');
      timeDisplay.innerHTML = formattedDate;
    };

    setInterval(refreshTime, 1000);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="nav_icon" onClick={() => handleSidebarOpen()}>
          <FaBars aria-hidden="true" />
        </div>

        <div className="navbar__left">
          {tabs.map((tab) => (
            <a
              href={tab.tabPath}
              key={tab.tabTitle}
              className={location.pathname === tab.tabPath ? 'active_link' : ''}
            >
              {tab.tabTitle}
            </a>
          ))}
        </div>

        <div className="navbar__right">
          <div className="navbar__right__time">
            <a href="#" className="navbar__right__icon">
              <FaClock aria-hidden="true" />
            </a>

            <div className="navbar__right__time__container">
              <div className="navbar__right__time_tick" id="time"></div>
            </div>
          </div>

          <a href="#" className="navbar__right__icon">
            <img
              src="https://i.imgur.com/6VBx3io.png"
              alt="avatar"
              width={30}
            />
          </a>
        </div>
      </nav>
    </>
  );
};
