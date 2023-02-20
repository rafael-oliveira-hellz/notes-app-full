import './index.css';

type DivisionProps = {
  heading: string;
};

export const Division = ({ heading }: DivisionProps) => {
  return (
    <>
      <div className="division">
        <div className="row">
          <div className="col-6 mx-auto mb-4">
            <span className="main-heading">{heading}</span>
          </div>
        </div>
      </div>
    </>
  );
};
