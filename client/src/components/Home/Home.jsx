import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getByName, FilterByTemperament, getTemperaments, FilterByWeight, FilterByHeight, FilterByOrigin, FilterByName } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Pagination from "../Pagination/Pagination";
import Dogs from "../Dogs/Dogs";
import styles from "../Home/Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const tempState = useSelector((state) => state.temperaments);
  const handleClick = (event) => {
    event.preventDefault();
    dispatch(getDogs());
  };

 //? Paginate

  const [currentPage, setCurrentPage] = useState(1); //* Página actual, comienza en 1
  const [dogsPerPage] = useState(8); //* Cantidad de perros por página

  const lastDogIndex = currentPage * dogsPerPage;
  const firstDogIndex = lastDogIndex - dogsPerPage;
  const currentDogs = allDogs.slice(firstDogIndex, lastDogIndex);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleSearch = (search) => {
    //* Función para que sea pasada por prop a la SearchBar y setear el numbero de page
    dispatch(getByName(search)).then(() => {
      setCurrentPage(1);
    });
  };

  const handleFilterByTemperament = (event) => {
    event.preventDefault();
    dispatch(FilterByTemperament(event.target.value));
  };

  const handleFilterByWeight = (event) => {
    event.preventDefault();
    dispatch(FilterByWeight(event.target.value));
  };

  const handleFilterByHeight = (event) => {
    event.preventDefault();
    dispatch(FilterByHeight(event.target.value));
  };

  const handleFilteredByOrigin = (event) => {
    event.preventDefault();
    dispatch(FilterByOrigin(event.target.value));
  };

  const handleFilterByName = (event) => {
    event.preventDefault();
    dispatch(FilterByName(event.target.value));
  };

  return (
    <div className={styles.Container}>
      <Link to="/form" className={styles.Link}>
        Crear un nuevo perro
      </Link>
      <SearchBar onSearch={handleSearch} />
      <h1 className={styles.Title}>¡Bienvenido a Dog World!</h1>
      <button className={styles.Button} onClick={(event) => handleClick(event)}>
        Cargar perros de nuevo
      </button>
      <div className={styles.SelectContainer}>
        <h3>Filtrar por:</h3>
        <select
          onChange={(event) => handleFilterByName(event)}
          className={styles.Select}
          defaultValue="Name"
        >
          <option value="Asc">Ascendente</option>
          <option value="Dec">Descendente</option>
        </select>
        <select
          onChange={(event) => handleFilterByWeight(event)}
          className={styles.Select}
          defaultValue="Weight"
        >
          <option value="max">Peso Max-Min</option>
          <option value="min">Peso Min-Max</option>
        </select>
        <select
          onChange={(event) => handleFilterByHeight(event)}
          className={styles.Select}
          defaultValue="Height"
        >
          <option value="max">Max-Min</option>
          <option value="min">Min-Max</option>
        </select>
        <select
          onChange={(event) => handleFilteredByOrigin(event)}
          className={styles.Select}
          defaultValue="Dogs"
        >
          <option value="all">Todos</option>
          <option value="api">Existente</option>
          <option value="created">Creado</option>
        </select>
        <select
          onChange={(event) => handleFilterByTemperament(event)}
          className={styles.Select}
          defaultValue="Temperaments"
        >
          <option value="All">Todos los temperamentos</option>
          {tempState?.map((temp) => (
            <option key={temp} value={temp}>
              {temp}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.DogsContainer}>
        <div className={styles.Dogs}>
          {currentDogs?.map((dog) => (
            <Dogs
              key={dog.id}
              id={dog.id}
              name={dog.name}
              image={dog.image}
              weight={dog.weight}
              height={dog.height}
              temperaments={dog.temperaments}
              temperament={dog.temperament}
              createInDb={dog.createInDb}
            />
          ))}
        </div>
        <Pagination
          dogs={allDogs.length}
          dogsPerPage={dogsPerPage}
          currentPage={currentPage}
          pagination={pagination}
        />
      </div>
    </div>
  );
};

export default Home;
