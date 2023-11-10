const { Router } = require('express');

// Rutas

const getAllDogsRoute = require('./getAllDogs')
const getAllDogsByIdRoute = require('./getDogsById')
const getAllDogByNameRoute = require('./getDogByName')
const getAllTempsTempsRoute = require('./getAllTemps')
const deleteDogRoute = require('./deleteDog')
const postDogsRoute = require('./postDogs')
const router = Router();

// Rutas usadas

router.use('/dogs', getAllDogsRoute, getAllDogsByIdRoute, getAllDogByNameRoute, postDogsRoute, deleteDogRoute)
router.use('/temps', getAllTempsTempsRoute)

module.exports = router;
