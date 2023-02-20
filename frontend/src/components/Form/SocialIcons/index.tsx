import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import './index.css';

export const SocialIcons = () => {
  return (
    <>
      <div className="row mx-auto">
        <div className="col-4 icon_container">
          <a href="http://" target="_blank" rel="noreferrer">
            <FaInstagram className="fa-instagram" />
          </a>
        </div>

        <div className="col-4 icon_container">
          <a href="http://" target="_blank" rel="noreferrer">
            <FaFacebook className="fa-facebook" />
          </a>
        </div>

        <div className="col-4 icon_container">
          <a href="http://" target="_blank" rel="noreferrer">
            <FaTwitter className="fa-twitter" />
          </a>
        </div>
      </div>
    </>
  );
};
