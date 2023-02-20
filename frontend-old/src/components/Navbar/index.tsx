import { faBars, faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './Navbar.css'

type Props = {
  handleSidebarOpen: () => void
  sidebarOpen: boolean
}

export const Navbar = ({ handleSidebarOpen }: Props) => {
  // const [selectedTab, setSelectedTab] = useState('/dashboard')
  const location = useLocation()

  const tabs = [
    {
      tabTitle: 'Usuários',
      link: '/dashboard/users'
    },
    {
      tabTitle: 'Anotações',
      link: '/dashboard/notes'
    },
    {
      tabTitle: 'Admin',
      link: '/dashboard'
    }
  ]

  // const handleSelectedTab = (tab: string) => {
  //   setSelectedTab(tab)
  // }

  useEffect(() => {
    const timeDisplay = document.getElementById('time') as HTMLElement

    function refreshTime() {
      const dateString = new Date().toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo'
      })
      const formattedString = dateString.replace(', ', ' - ')
      timeDisplay.innerHTML = formattedString
    }

    setInterval(refreshTime, 1000)
  }, [])

  return (
    <>
      <nav className="navbar">
        <div className="nav_icon" onClick={() => handleSidebarOpen()}>
          <FontAwesomeIcon icon={faBars} aria-hidden="true" />
        </div>

        <div className="navbar__left">
          {tabs.map((elem) => (
            <a
              href={elem.link}
              key={elem.tabTitle}
              // onClick={() => handleSelectedTab(elem.link)}
              className={location.pathname === elem.link ? 'active_link' : ''}
            >
              {elem.tabTitle}
            </a>
          ))}
        </div>

        <div className="navbar__right">
          <a href="#">
            <FontAwesomeIcon icon={faClock} aria-hidden="true" />
          </a>

          <div className="newTime">
            <p id="time"></p>
          </div>

          <a href="#">
            <img
              width="30"
              src="https://i.imgur.com/6VBx3io.png"
              alt="avatar"
            />
          </a>
        </div>
      </nav>
    </>
  )
}
