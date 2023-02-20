import { useContext, useState } from 'react'
import { loginFields } from '../../constants/formFields'
import { AuthContext } from '../../context/auth'
import FormAction from './formAction'
import FormExtra from './formExtra'
import Input from './input'

const fields = loginFields
const fieldsState: any = {}

fields.forEach((field) => (fieldsState[field.id] = ''))

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState)
  const { login }: any = useContext(AuthContext as any)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log(loginState)
    login(loginState)
  }

  //Handle Login API Integration here
  // const authenticateUser = () => {}

  return (
    <form className="mt-8 space-y-6">
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>

      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  )
}
