import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../context/auth'
import AllRoutes from '../routes/Routes'
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AllRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
