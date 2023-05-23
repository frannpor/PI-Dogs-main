import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemperaments } from "../../redux/actions/actions";
import { validate } from "../../Extras/validate";
// import { Link } from "react-router-dom"; //? Proximamente NavBar
import styles from "../Form/Form.module.css";

const Form = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
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
    const { name, value } = event.target;
    if (name === "age" || name === "weight" || name === "height") {
      const formattedValue = value.replace(/(\d{2})\s-\s(\d{2})/, "$1 - $2");
      setInput((prevInput) => ({
        ...prevInput,
        [name]: formattedValue,
      }));
    } else {
      setInput((prevInput) => ({
        ...prevInput,
        [name]: value,
      }));
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value), // Función para validar un campo específico
    }));
  };
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "El nombre de la raza es obligatorio";
        }
        break;
      case "height":
        if (!value.trim()) {
          error = "La altura es obligatoria";
        } else if (!/^(\d{2})\s-\s(\d{2})$/.test(value)) {
          error =
            "Formato de altura inválido. Utiliza 'número - número' (por ejemplo, '20 - 110')";
        }
        break;
      case "weight":
        if (!value.trim()) {
          error = "El peso es obligatorio";
        } else if (!/^(\d{2})\s-\s(\d{2})$/.test(value)) {
          error =
            "Formato de peso inválido. Utiliza 'número - número' (por ejemplo, '2 - 90')";
        }
        break;
      case "age":
        if (!value.trim()) {
          error = "La edad es obligatoria";
        } else if (!/^(\d{2})\s-\s(\d{2})$/.test(value)) {
          error =
            "Formato de edad inválido. Utiliza 'número - número' (por ejemplo, '8 - 20')";
        }
        break;
      case "image":
        if (!value.trim()) {
          error = "La URL de la imagen es obligatoria";
        } else if (!/^https?:\/\/\S+$/.test(value)) {
          error = "URL de imagen inválida";
        }
        break;
      default:
        break;
    }

    return error;
  };
  const handleSelect = (event) => {
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
      dispatch(postDog(input)).then((response) => {});
      alert("Breed created successfully");
    } else {
      alert("Please fix the following errors:");
      setErrors(validationErrors);
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
            <h1 className={styles.title}>Crea tu propia raza!</h1>
            <div className={styles.field}>
              <label className={styles.label}>Breed:</label>
              <input
                type="text"
                value={input.name}
                name="name"
                onChange={handleChange}
                className={styles.input}
              />
              {errors.name && <p className={styles.error}>{errors.name}</p>}
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Height:</label>
              <input
                type="text"
                value={input.height}
                name="height"
                onChange={handleChange}
                className={styles.input}
              />
              {errors.height && <p className={styles.error}>{errors.height}</p>}
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Weight:</label>
              <input
                type="text"
                value={input.weight}
                name="weight"
                onChange={handleChange}
                className={styles.input}
              />
              {errors.weight && <p className={styles.error}>{errors.weight}</p>}
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Age:</label>
              <input
                type="text"
                value={input.age}
                name="age"
                onChange={handleChange}
                className={styles.input}
              />
              {errors.age && <p className={styles.error}>{errors.age}</p>}
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Image:</label>
              <input
                type="text"
                value={input.image}
                name="image"
                onChange={handleChange}
                className={styles.input}
              />
              {errors.image && <p className={styles.error}>{errors.image}</p>}
            </div>
            <div className={styles.field}>
              <label htmlFor="temperament" className={styles.label}>
                Temperament:
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
                {selectedTemps?.map((temp) => (
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
