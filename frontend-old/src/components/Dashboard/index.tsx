import { useContext, useLayoutEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Main } from '../../components/Main'
import { Navbar } from '../../components/Navbar'
import { SideBar } from '../../components/SideBar'
import { AuthContext } from '../../context/auth'
import { ViewNotes } from '../../pages/Admin/Notes/ViewNotes'
import { ViewUsers } from '../../pages/Admin/Users/ViewUsers'
import api from '../../utils/api'

export const Dashboard = () => {
  const { authenticated } = useContext<any>(AuthContext)
  const [user, setUser] = useState<any>({})
  const navigate = useNavigate()
  const [access_token] = useState(sessionStorage.getItem('access_token') || '')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()

  const handleSidebarOpen = () => {
    setSidebarOpen(!sidebarOpen)
  }

  useLayoutEffect(() => {
    if (!authenticated) {
      navigate('/login')
    }

    if (access_token) {
      api
        .get('/users/me', {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        })
        .then((response) => {
          setUser(response.data.user)
        })
    }
  }, [authenticated, access_token, navigate])
  return (
    <>
      <div className="container">
        <SideBar
          sidebarOpen={sidebarOpen}
          handleSidebarOpen={handleSidebarOpen}
        />

        {location.pathname === '/dashboard' && <Main user={user} />}

        {location.pathname === '/dashboard/users' && <ViewUsers user={user} />}

        {location.pathname === '/dashboard/notes' && <ViewNotes user={user} />}

        <Navbar
          handleSidebarOpen={handleSidebarOpen}
          sidebarOpen={sidebarOpen}
        />
      </div>
    </>
  )
}
