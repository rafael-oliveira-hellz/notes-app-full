import React, { useContext } from 'react';
import { CgLogOut, CgNotes } from 'react-icons/cg';
import {
  FaGlobe,
  FaHome,
  FaLock,
  FaStickyNote,
  FaTimes,
  FaUser,
  FaUsers,
} from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import Logo from '../../assets/logo.jpg';
import { AuthContext } from '../../store/contexts/AuthContext';
import './index.css';

type Props = {
  sideBarOpen: boolean;
  handleSideBarOpen: () => void;
};

export const Sidebar: React.FC<Props> = ({
  sideBarOpen,
  handleSideBarOpen,
}) => {
  const { logout, isAuthenticated, isLoading, user } = useContext(AuthContext);
  const location = useLocation();

  return (
    <>
      <div
        className={sideBarOpen ? 'hb_sidebar__responsive' : ''}
        id="hb_sidebar"
      >
        <div className="hb_sidebar__title">
          <div className="hb_sidebar__img">
            <img src={Logo} alt="logo" />
            <h1>HB Notes</h1>
            <FaTimes
              onClick={handleSideBarOpen}
              id="hb_sidebar__icon"
              aria-hidden="true"
            />
          </div>

          <div className="hb_sidebar__menu">
            <div
              className={
                location.pathname === '/'
                  ? 'hb_sidebar__link active_link'
                  : 'hb_sidebar__link'
              }
            >
              <FaHome />
              <a href="/">Home</a>
            </div>

            <h2 className="text-uppercase">Meu Painel</h2>

            <div
              className={
                location.pathname === '/my-notes'
                  ? 'hb_sidebar__link active_link'
                  : 'hb_sidebar__link'
              }
            >
              <FaStickyNote />
              <a href="/my-notes">Minhas Anotações</a>
            </div>

            <div
              className={
                location.pathname === '/profile'
                  ? 'hb_sidebar__link active_link'
                  : 'hb_sidebar__link'
              }
            >
              <FaUser />
              <a href="/profile">Meus Dados</a>
            </div>

            <div
              className={
                location.pathname === '/change-password'
                  ? 'hb_sidebar__link active_link'
                  : 'hb_sidebar__link'
              }
            >
              <FaLock />
              <a href="/change-password">Alterar Senha</a>
            </div>

            <h2 className="text-uppercase">Admin</h2>

            <div
              className={
                location.pathname === '/'
                  ? 'hb_sidebar__link active_link'
                  : 'hb_sidebar__link'
              }
            >
              <FaGlobe />
              <a href="/">Área Administrativa</a>
            </div>

            <div
              className={
                location.pathname === '/admin/users'
                  ? 'hb_sidebar__link active_link'
                  : 'hb_sidebar__link'
              }
            >
              <FaUsers />
              <a href="/admin/users">Gerenciar Usuários</a>
            </div>

            <div
              className={
                location.pathname === '/admin/notes'
                  ? 'hb_sidebar__link active_link'
                  : 'hb_sidebar__link'
              }
            >
              <CgNotes />
              <a href="/admin/notes">Gerenciar Anotações</a>
            </div>

            <div className="hb_sidebar__link hb_sidebar__logout">
              <CgLogOut />
              <a href="#" onClick={logout}>
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
