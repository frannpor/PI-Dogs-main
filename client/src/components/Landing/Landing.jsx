import { Link } from "react-router-dom";
import style from "../Landing/Landing.module.css";

const Landing = () => {
  return (
    <div className={style.container}>
      <div className={style.overlay}></div>
      <div className={style.content}>
        <h1 className={style.title}>Welcome to the dog website</h1>
        <Link to="/home" className={style.link}>
          <button className={style.button}>Enter</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;