import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemperaments } from "../../redux/actions/actions";
import { validate } from "../../Extras/validate";
import styles from "../Form/Form.module.css";

const Form = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    //? Estado local para todos los inputs
    id: "",
    name: "",
    height: "",
    weight: "",
    age: "",
    image: "",
    createInDb: "",
    temperament: [],
    temperaments: [], //? Acá se guardan los temperamentos filtrados para el select
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const temperaments = useSelector((state) => state.temperaments);
  const [selectedTemps, setSelectedTemps] = useState([]);
  const [errors, setErrors] = useState({});
  const [filter] = useState("");
  const filteredTemps = temperaments?.filter((temp) =>
    temp.toLowerCase().includes(filter.toLowerCase())
  );

  const handleChange = (event) => {
    //? Manejo del input
    const { name, value } = event.target;
    const error = validate(name, value);
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      //? Manejo de errores
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSelect = (event) => {
    //? Selección de temperamentos para que se mantengan los seleccionados
    const selectedTemperament = event.target.value;
    setInput((prevInput) => ({
      ...prevInput,
      temperament: [...prevInput.temperament, selectedTemperament],
      temperaments: Array.isArray(prevInput.temperaments)
        ? [...prevInput.temperaments, selectedTemperament]
        : [selectedTemperament],
    }));
    setSelectedTemps((prevSelectedTemperaments) => [
      ...prevSelectedTemperaments,
      selectedTemperament,
    ]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(input);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(postDog(input));
      setInput({
        id: "",
        name: "",
        height: "",
        weight: "",
        age: "",
        image: "",
        createInDb: "",
        temperament: [],
        temperaments: [],
      });
    }
  };

  const handleRemove = (temperament) => {
    setSelectedTemps((prevSelectedTemps) =>
      prevSelectedTemps.filter((temp) => temp !== temperament)
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <h1 className={styles.title}>¡Crea tu propia raza!</h1>
            <div className={styles.field}>
              <label className={styles.label}>Raza:</label>
              <input
                type="text"
                value={input.name}
                name="name"
                onChange={handleChange}
                className={styles.input}
                placeholder="Nombre de la raza"
              />
              {errors.name && <p className={styles.error}>{errors.name}</p>}
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Altura:</label>
              <input
                type="text"
                value={input.height}
                name="height"
                onChange={handleChange}
                className={styles.input}
                placeholder="Altura min - altura max"
              />
              {errors.height && <p className={styles.error}>{errors.height}</p>}
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Peso:</label>
              <input
                type="text"
                value={input.weight}
                name="weight"
                onChange={handleChange}
                className={styles.input}
                placeholder="Peso min - peso max"
              />
              {errors.weight && <p className={styles.error}>{errors.weight}</p>}
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Esperanza de vida:</label>
              <input
                type="text"
                value={input.age}
                name="age"
                onChange={handleChange}
                className={styles.input}
                placeholder="Min - max"
              />
              {errors.age && <p className={styles.error}>{errors.age}</p>}
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Imagen URL:</label>
              <input
                type="text"
                value={input.image}
                name="image"
                onChange={handleChange}
                className={styles.input}
                placeholder="http://example.com"
              />
              {errors.image && <p className={styles.error}>{errors.image}</p>}
            </div>
            <div className={styles.field}>
              <label htmlFor="temperament" className={styles.label}>
                Temperamento:
              </label>
              {errors.temperaments && (
                <p className={styles.error}>{errors.temperaments}</p>
              )}
              <select
                id="temperaments"
                onChange={handleSelect}
                className={styles.select}
              >
                <option value="">Seleccionar</option>
                {filteredTemps?.sort().map((temp) => (
                  <option key={temp} value={temp}>
                    {temp}
                  </option>
                ))}
              </select>
              <div className={styles.selectedTemps}>
                {selectedTemps?.sort().map((temp) => (
                  <div key={temp?.id} className={styles.selectedTemp}>
                    <span>{temp}</span>
                    <button
                      type="button"
                      onClick={() => handleRemove(temp)}
                      className={styles.removeButton}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button type="submit" className={styles.createButton}>
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
