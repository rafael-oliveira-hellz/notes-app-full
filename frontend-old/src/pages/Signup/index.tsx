import Header from '../../components/Form/header'
import Signup from '../../components/Form/signup'

export default function SignupPage() {
  return (
    <>
      <div className="flex h-screen min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <Header
            heading="Signup to create an account"
            paragraph="Already have an account? "
            linkName="Login"
            linkUrl="/"
          />
          <Signup />
        </div>
      </div>
    </>
  )
}
