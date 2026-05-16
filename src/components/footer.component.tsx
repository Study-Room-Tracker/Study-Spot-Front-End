import { Link } from "react-router-dom";

const FooterComponent: React.FC = () => {
  return (
    <footer>
      <div>
        <Link to="https://github.com/TapasPulis">
          <img src="/src/assets/github.png" alt="This is the github logo" />
        </Link>
        <Link to="https://www.linkedin.com/in/samragya-gurung-479672327/">
          <img src="/src/assets/linkedin.png" alt="This is the linkedin logo" />
        </Link>
        <Link to="http://www.instagram.com/tapaspulis/">
          <img
            src="/src/assets/instagram.png"
            alt="This is the instagram logo"
          />
        </Link>
      </div>
      <p>&copy;Study Spot. All rights reserved</p>
    </footer>
  );
};

export default FooterComponent;
