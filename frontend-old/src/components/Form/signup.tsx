import { useContext, useState } from 'react'
import { signupFields } from '../../constants/formFields'
import { AuthContext } from '../../context/auth'
import FormAction from './formAction'
import Input from './input'

const fields = signupFields
const fieldsState: any = {}

fields.forEach((field) => (fieldsState[field.id] = ''))

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState)
  const { register }: any = useContext(AuthContext as any)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value })

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()
    console.log(signupState)
    register(signupState)
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </div>
    </form>
  )
}
