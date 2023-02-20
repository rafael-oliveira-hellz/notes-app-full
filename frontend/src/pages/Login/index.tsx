import { useContext, useState } from 'react';
import { FloatingLabel, Form, InputGroup } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { FormComponent } from '../../components/Form';
import { FormContainer } from '../../components/Form/Container';
import { Division } from '../../components/Form/Division';
import { SocialIcons } from '../../components/Form/SocialIcons';
import { IToast, ToastMapKey } from '../../components/Toast/helpers';
import { AuthContext } from '../../store/contexts/AuthContext';
import { ToastContext } from '../../store/contexts/ToastContext';
import './index.css';

export const Login = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const { login, message } = useContext(AuthContext);
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

    const signIn = login({ ...formValues });

    const resolveSignIn = Promise.resolve(signIn);

    resolveSignIn.then(
      (value) => {
        console.log(value); // Success!
        createToast('success', 'Sucesso!', 'Login realizado com sucesso!');
      },
      (reason) => {
        console.error(reason); // Error!
        createToast('error', 'Erro!', message as string);
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

        <Division heading="Formulário de Login" />

        <FormComponent>
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
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                name="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Lembrar-me
              </label>
            </div>

            <div className="col-md-12 col-12 bn">
              Não possui uma conta ainda?
              <a href="/register">Cadastre-se</a>
            </div>
          </div>

          <div className="my-3">
            <button
              type="button"
              className="btn btn-primary btn-block btn-lg w-100"
              onClick={handleSubmit}
            >
              <small className="pe-2">
                <FaUser />
              </small>
              Login
            </button>
          </div>
        </FormComponent>
      </FormContainer>
    </>
  );
};
