import React from "react";
import { Link } from "react-router-dom";
import { deleteDog } from "../../redux/actions/actions";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "../Dogs/Dogs.module.css";

const Dogs = ({ id, name, weight, height, image, temperaments, temperament, createInDb }) => {
  const [, setDeleted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const dispatch = useDispatch();
  let timer;

  const handleDeleteDog = async (id) => {
    try {
      dispatch(deleteDog(id));
      setDeleted(true);
      setShowConfirmation(true);
      timer = setTimeout(() => {
        setShowConfirmation(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [timer]);

  return (
    <div className={styles.dogCard}>
      <div className={styles.content}>
        <Link to={`/dogs/${id}`} className={styles.link}>
          <h3 className={styles.title}>{name}</h3>
        </Link>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={image} alt={name} />
        </div>
        {createInDb && Array.isArray(temperaments) && temperaments.length ? (
          <p className={styles.temperaments}>
            Temperamento: {temperaments.join(", ")}
          </p>
        ) : Array.isArray(temperament) && temperament.length ? (
          <p className={styles.temperaments}>
            Temperamento: {temperament?.join(", ")}
          </p>
        ) : null}
        <p className={styles.info}>Peso: {weight} kg</p>
        <p className={styles.info}>Altura: {height} cm</p>
        {createInDb && (
          <button
            className={styles.deleteButton}
            onClick={() => handleDeleteDog(id)}
          >
            Eliminar
          </button>
        )}
        {showConfirmation && (
          <p className={styles.confirmationMessage}>
            El perro fue eliminado exitosamente
          </p>
        )}
      </div>
    </div>
  );
};

export default Dogs;
