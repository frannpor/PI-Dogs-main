import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getById, deleteDogId } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import style from "./Detail.module.css";

const Detail = () => {
  const dispatch = useDispatch();
  let dog = useSelector((state) => state.details);
  const [, setDogId] = useState();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getById(id));
    setDogId({});
    return dispatch(deleteDogId());
  }, [dispatch, id]);
  if (!dog) {
    return <p>Cargando...</p>;
  }
  return (
      <div className={style.contentContainer}>
      <h1 className={style.titleName}>{dog.name}</h1>
      <div className={style.imageContainer}>
        <img className={style.image} src={dog.image} alt={dog.name} />
      </div>
        <p className={style.temperaments}>Temperament: {dog.temperament ? dog.temperament.join(", ") : ""}</p>
        <p className={style.info}>Age: {dog.age} years</p>
        <p className={style.info}>Height: {dog.height} cm</p>
        <p className={style.info}>Weight: {dog.weight} kg</p>
    </div>
  );
};

export default Detail;