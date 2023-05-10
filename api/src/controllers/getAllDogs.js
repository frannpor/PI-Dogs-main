const { getApiDogs } = require('./getApiDogs');
const { getDbDogs } = require('./getDbDogs');

//* Juntamos los datos de la BD junto con los datos de la API
const getAllDogs = async () => {
    const apiDogs = await getApiDogs();
    let dbDogs = await getDbDogs();
    const allDogs = apiDogs.concat(dbDogs);
    return allDogs;
}

module.exports = {
    getAllDogs
}
//! Lunes 08/05 16:25 PM