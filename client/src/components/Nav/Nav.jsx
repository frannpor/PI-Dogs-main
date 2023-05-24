import React from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./Nav.module.css";

const Nav = () => {
  const history = useHistory();
  const handleRedirect = () => {
    history.push("/home");
    window.location.reload()
  };
  return (
    <nav className={styles.nav}>
      <div>
        <Link to="/">
          <button className={styles.link}>Landing</button>
        </Link>
        <Link to="/home">
          <button className={styles.link} onClick={handleRedirect}>
            Home
          </button>
        </Link>
        <Link to="/form">
          <button className={styles.link}>Crear un nuevo perro</button>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
