import './index.css';

type FormContainerProps = {
  children: React.ReactNode;
};

export const FormContainer = ({ children }: FormContainerProps) => {
  return (
    <div className="container">
      <div className="row w-100 d-flex justify-content-center align-items-center main_div">
        <div className="col-12 col-lg-6 col-md-8 col-xxl-5">
          <div className="card py-3 px-2">
            <p className="text-center my-3 text-capitalize">
              Se conecte com a gente
            </p>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
