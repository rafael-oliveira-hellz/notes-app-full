import { useContext } from 'react'
import Header from '../../components/Form/header'
import Login from '../../components/Form/login'
import { AuthContext } from '../../context/auth'

export default function LoginPage() {
  const { authenticated } = useContext<any>(AuthContext)
  console.log(authenticated)
  return (
    <>
      <div className="flex h-screen min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <Header
            heading="Login to your account"
            paragraph="Don't have an account yet? "
            linkName="Signup"
            linkUrl="/signup"
          />
          <Login />
        </div>
      </div>
    </>
  )
}
