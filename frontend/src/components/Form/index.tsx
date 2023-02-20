import './index.css';

type FormProps = {
  children: React.ReactNode;
};

export const FormComponent = ({ children }: FormProps) => {
  return (
    <>
      <form className="form-container">
        <div className="mb-3">{children}</div>
      </form>
    </>
  );
};
