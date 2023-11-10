const axios = require("axios");
const { Temperament } = require("../db");

const getAllTemps = async () => {
    const tempsData = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    tempsData.data.forEach(dog => {
        if (dog.temperament) {
      let temps = dog.temperament.split(", ");
      temps.forEach((dogTemp) => {
        Temperament.findOrCreate({
          where: { name: dogTemp },
        });
      });
    }
  });
  const tempsFound = await Temperament.findAll();
  return tempsFound; //* Guardamos todos los temperamentos en tempsFound, en nuestra base de datos
};

module.exports = {
  getAllTemps,
};
