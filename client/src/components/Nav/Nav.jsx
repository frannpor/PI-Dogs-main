import SearchBar from "../SearchBar/SearchBar";
import React from "react";
import { Link } from "react-router-dom";
import { getByName } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import styles from "./Nav.module.css";

const Nav = () => {
  const dispatch = useDispatch();
  const handleSearch = (search) => {
    dispatch(getByName(search));
  };

  return (
    <nav className={styles.nav}>
      <div>
        <Link to="/">
          <button className={styles.link}>Landing</button>
        </Link>
        <Link to="/home">
          <button className={styles.link}>Home</button>
        </Link>
        <Link to="/form">
          <button className={styles.link}>Crear un nuevo perro</button>
        </Link>
      </div>
      <div className={styles.SearchBar}>
        <SearchBar onSearch={handleSearch} />
      </div>
    </nav>
  );
};

export default Nav;
