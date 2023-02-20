import { useContext, useState } from 'react';
import { FloatingLabel, Form, InputGroup } from 'react-bootstrap';
import { FaUserAlt } from 'react-icons/fa';
import { FormComponent } from '../../components/Form';
import { FormContainer } from '../../components/Form/Container';
import { Division } from '../../components/Form/Division';
import { SocialIcons } from '../../components/Form/SocialIcons';
import { IToast, ToastMapKey } from '../../components/Toast/helpers';
import { AuthContext } from '../../store/contexts/AuthContext';
import { ToastContext } from '../../store/contexts/ToastContext';
import './index.css';

export const Register = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { register } = useContext(AuthContext);
  const { toastList, setToastList } = useContext(ToastContext);

  const createToast = (type: ToastMapKey, title: string, message: string) => {
    const newToast: IToast = {
      type: type,
      title: title,
      message: message,
    };
    setToastList([...toastList, newToast]);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const signUp = register({ ...formValues });

    const resolveSignUp = Promise.resolve(signUp);

    resolveSignUp.then(
      (value) => {
        console.log(value); // Success!
        createToast('success', 'Sucesso!', 'Cadastro realizado com sucesso!');
      },
      (reason) => {
        console.error(reason); // Error!
        createToast('error', 'Erro!', 'Erro ao realizar o cadastro!');
      }
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <>
      <FormContainer>
        <SocialIcons />

        <Division heading="Formulário de Cadastro" />

        <FormComponent>
          <InputGroup className="my-3">
            <FloatingLabel
              controlId="floatingNameInput"
              label="Digite seu nome"
              className="mb-3"
            >
              <Form.Control
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                aria-label="Name"
                placeholder="John Doe"
              />
            </FloatingLabel>
          </InputGroup>

          <InputGroup className="my-3">
            <FloatingLabel
              controlId="floatingEmailInput"
              label="Digite seu e-mail"
              className="mb-3"
            >
              <Form.Control
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                aria-label="E-mail"
                placeholder="name@example.com"
              />
            </FloatingLabel>
          </InputGroup>

          <InputGroup className="mb-3">
            <FloatingLabel
              controlId="floatingPasswordInput"
              label="Digite sua senha"
              className="mb-3"
            >
              <Form.Control
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                aria-label="Senha"
                placeholder="xpto@#14585"
              />
            </FloatingLabel>
          </InputGroup>

          <div className="col-md-12 col-12">
            <div className="col-md-12 col-12 bn">
              Já possui uma conta?
              <a href="/login">Efetue o login</a>
            </div>
          </div>

          <div className="my-3">
            <button
              type="button"
              className="btn btn-primary btn-block btn-lg w-100"
              onClick={handleSubmit}
            >
              <small className="pe-2">
                <FaUserAlt />
              </small>
              Cadastrar
            </button>
          </div>
        </FormComponent>
      </FormContainer>
    </>
  );
};
