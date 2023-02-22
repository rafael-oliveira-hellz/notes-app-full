import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './index.css';

export const SocialIcons = () => {

  const brandsIcons = [faFacebook, faInstagram, faTwitter]

  //Cria os blocos de ícones de redes sociais
  const renderBrandIcons = () => {
    return brandsIcons.map((icons, index) => {
      return (
        <div key={index} className="col-4 icon_container">
          <a href="http://" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={icons} />
          </a>
        </div>
      )
    })
  }

  return (
    <div className="row mx-auto">
      {renderBrandIcons()}
    </div>
  );
};
