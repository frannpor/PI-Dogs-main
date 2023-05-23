import React from "react";
import { Link } from "react-router-dom";
import styles from "../Dogs/Dogs.module.css";

const Dogs = ({ id, name, weight, height, image, temperaments, temperament, createInDb }) => {
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
            Temperamentos: {temperaments.join(", ")}
          </p>
        ) : Array.isArray(temperament) && temperament.length ? (
          <p className={styles.temperaments}>
            Temperamentos: {temperament?.join(", ")}
          </p>
        ) : null}
        <p className={styles.info}>Peso: {weight} kg</p>
        <p className={styles.info}>Altura: {height} cm</p>
        
      </div>
    </div>
  );
};

export default Dogs;
