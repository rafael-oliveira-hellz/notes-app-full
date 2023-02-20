const loginFields = [
  {
    labelText: 'E-mail',
    labelFor: 'email',
    id: 'email',
    name: 'email',
    type: 'email',
    placeholder: 'E-mail',
    required: true,
    autocomplete: 'email',
  },
  {
    labelText: 'Senha',
    labelFor: 'password',
    id: 'password',
    name: 'password',
    type: 'password',
    placeholder: 'Senha',
    required: true,
    autocomplete: 'current-password',
  }
]

const registerFields = [
  {
    labelText: 'Nome',
    labelFor: 'name',
    id: 'name',
    name: 'name',
    type: 'text',
    placeholder: 'Nome',
    required: true,
    autocomplete: 'name',
  },
  {
    labelText: 'E-mail',
    labelFor: 'email',
    id: 'email',
    name: 'email',
    type: 'email',
    placeholder: 'E-mail',
    required: true,
    autocomplete: 'email',
  },
  {
    labelText: 'Senha',
    labelFor: 'password',
    id: 'password',
    name: 'password',
    type: 'password',
    placeholder: 'Senha',
    required: true,
    autocomplete: 'new-password',
  }
]

export { loginFields, registerFields }
