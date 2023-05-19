const { Dog, Temperament } = require('../db.js');
const { Op } = require('sequelize');
const { getAllTemps } = require('./getAllTemps');

const postDogs = async (name, height, weight, age, image, temperament, createInDb) => {
    //* Buscamoos si ya existe un perro con el mismo nombre en la base de datos usando
    //* el operador Op.iLike para buscar sin importar mayúsculas o minúsculas
    const dbResponse = await Dog.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`,
            },
        },
    });
    console.log(dbResponse);
    if (dbResponse.length) throw new Error("There is already a dog with that name");
    //* Si la base de datos ya tiene un perro con ese nombre devuelve un mensaje
    //* Si no existe un perro con ese nombre, crea uno nuevo en la base de datos
    const newDog = await Dog.create({
        name: name,
        height: height,
        weight: weight,
        age: age,
        image: image,
        createInDb: true,
    });
    //* Verifico si la tabla de temperamentos esté cargada usando count(), de no estar cargada, la creamos
    //* invocando a getAllTemps
    const temperamentCount = await Temperament.count();
    if (temperamentCount === 0) {
        await getAllTemps();
    }
    const tempsFound = [];
    for (let i = 0; i < temperament.length; i++) {
        const tempFound = await Temperament.findOne({ where: { name: temperament[i] } });
        if (!tempFound) {
            throw new Error(`Tipo de ${temperament[i]} no existe`);
        }
        tempsFound.push(tempFound);
    }
    //* Añadimos el temperamento mediante método add de SQL, gracias a la relación entre Dog y Temperament
    await newDog.addTemperament(tempsFound);
    return newDog;
}

module.exports = {
    postDogs
}
    //! Miércoles 10/05 13:05 PM