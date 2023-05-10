const axios = require('axios');
const { API_KEY } = process.env;

const getApiDogs = async () => {
    const getData = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    const infoData = await getData.data.map(dog => {
        return {
            id: dog.id,
            name: dog.name,
            age: dog.life_span,
            image: dog.image.url,
            height: dog["height"]["metric"], //* Acceder a las propiedades mediante bracket notation
            weight: dog["weight"]["metric"], //* ya que siempre son las mismas
            temperament: dog.temperament?.split(",").map(temperament => temperament.trim())
            // // .filter((currentTemper, currentIndex, dogTemper) => dogTemper.indexOf(currentTemper) === currentIndex)
            // // // Verificamos si es que el perro tiene algun temperamento, de ser así separamos cada uno y eliminamos espacios vacíos con el trim
            // // // y luego filtramos para eliminar los duplicados
        }
    })
    return infoData;
}

module.exports = {
    getApiDogs
}