import dog_image from "../../../src/Extras/dog-landing.png";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <img src={dog_image} alt="landing_dog" />
      <Link to="/home">
        <hr />
        <h1>Welcome to the website</h1>
        <button>Enter</button>
      </Link>
    </div>
  );
};

export default Landing;
