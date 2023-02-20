import {
  faGlobe,
  faHome,
  faLock,
  faNoteSticky,
  faRightFromBracket,
  faTimes,
  faUser,
  faUsers
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import Logo from '../../assets/logo.jpg'
import { AuthContext } from '../../context/auth'
import './Sidebar.css'

type Props = {
  sidebarOpen: boolean
  handleSidebarOpen: () => void
}

export const SideBar = ({ sidebarOpen, handleSidebarOpen }: Props) => {
  const location = useLocation()
  const { logout } = useContext<any>(AuthContext)

  return (
    <>
      <div className={sidebarOpen ? 'sidebar-responsive' : ''} id="sidebar">
        <div className="sidebar__title">
          <div className="sidebar__img">
            <img src={Logo} alt="logo" />
            <h1>Notes Dashboard</h1>
            <FontAwesomeIcon
              onClick={handleSidebarOpen}
              icon={faTimes}
              id="sidebarIcon"
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="sidebar__menu">
          <div
            className={
              location.pathname === '/dashboard'
                ? 'sidebar__link active_menu_link'
                : 'sidebar__link'
            }
          >
            <FontAwesomeIcon icon={faHome} />
            <a href="/dashboard">Home</a>
          </div>

          <h2>MEU PAINEL</h2>
          <div
            className={
              location.pathname === '/my-notes'
                ? 'sidebar__link active_menu_link'
                : 'sidebar__link'
            }
          >
            <FontAwesomeIcon icon={faNoteSticky} />
            <a href="#">Minhas Anotações</a>
          </div>
          <div
            className={
              location.pathname === '/profile'
                ? 'sidebar__link active_menu_link'
                : 'sidebar__link'
            }
          >
            <FontAwesomeIcon icon={faUser} />
            <a href="#">Meus Dados</a>
          </div>
          <div
            className={
              location.pathname === '/change-password'
                ? 'sidebar__link active_menu_link'
                : 'sidebar__link'
            }
          >
            <FontAwesomeIcon icon={faLock} />
            <a href="#">Alterar Senha</a>
          </div>

          <h2>ADMIN</h2>
          <div
            className={
              location.pathname === '/dashboard'
                ? 'sidebar__link active_menu_link'
                : 'sidebar__link'
            }
          >
            <FontAwesomeIcon icon={faGlobe} />
            <a href="/dashboard">Área Administrativa</a>
          </div>
          <div
            className={
              location.pathname === '/dashboard/users'
                ? 'sidebar__link active_menu_link'
                : 'sidebar__link'
            }
          >
            <FontAwesomeIcon icon={faUsers} />
            <a href="/dashboard/users">Gerenciar Usuários</a>
          </div>
          <div
            className={
              location.pathname === '/dashboard/notes'
                ? 'sidebar__link active_menu_link'
                : 'sidebar__link'
            }
          >
            <FontAwesomeIcon icon={faNoteSticky} />
            <a href="/dashboard/notes">Gerenciar Anotações</a>
          </div>
          <div className="sidebar__link sidebar__logout">
            <FontAwesomeIcon icon={faRightFromBracket} />
            <a href="#" onClick={logout}>
              Logout
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
