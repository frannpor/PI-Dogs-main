import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getById, deleteDogId } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom"; //? Proximamente NavBar

const Detail = () => {
  const dispatch = useDispatch();
  let dog = useSelector((state) => state.details);
  const [dogId, setDogId] = useState();
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
    <div>
      <h1>{dog.name}</h1>
      <img src={dog.image} alt={dog.name} />
      <p>Temperament: {dog.temperament ? dog.temperament.join(", ") : ""}</p>
      <p>Age: {dog.age} years</p>
      <p>Height: {dog.height} cm</p>
      <p>Weight: {dog.weight} kg</p>
    </div>
  );
};

export default Detail;
