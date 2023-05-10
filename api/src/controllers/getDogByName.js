const { getAllDogs } = require('./getAllDogs')
const { getDbDogs } = require('./getDbDogs')

const getDogsByName = async (name) => {
    const allDogs = await getAllDogs();
    const dbDogs = await getDbDogs();
    return [...allDogs, ...dbDogs].filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
}; //* Juntamos los perros de la base de datos junto con los de la api y filtramos por nombre para enviarlos al Route

module.exports = {
    getDogsByName,
}

//! Martes 09/05 14:47 PM