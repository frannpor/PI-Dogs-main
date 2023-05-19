import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../redux/actions/actions";
import styles from "../SearchBar/SearchBar.module.css";
const SearchBar = ({ onSearch }) => {
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState("");
  const [error, setError] = useState("");
  const handleOnChange = (event) => {
    setSearchName(event.target.value);
    setError("");
  };
  const handleSearch = () => {
    const search = searchName.trim().toLowerCase();
    if (!search) {
      setError("Please enter a dog name");
      return;
    } else if (!search.match(/^[a-zA-Z\s]+$/)) {
      setError("Please enter alphabetic characters");
      return;
    }
    dispatch(getByName(search));
    setSearchName(""); //* Actualización del input
    onSearch(search); //* Ejecutamos el onSearch pasado por props
  };
  return (
    <div className={styles.SearchBarContainer}>
      <input
        className={styles.SearchInput}
        type="text"
        value={searchName}
        onChange={handleOnChange}
      />
      <button
        className={styles.SearchButton}
        onClick={handleSearch}
        disabled={!searchName}
      >
        Search
      </button>
      {error && <p className={styles.Error}>{error}</p>}
    </div>
  );
};

export default SearchBar;
