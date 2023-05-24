const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const getAllDogsRoute = require('./getAllDogs')
const getAllDogsByIdRoute = require('./getDogsById')
const getAllDogByNameRoute = require('./getDogByName')
const getAllTempsTempsRoute = require('./getAllTemps')
const deleteDogRoute = require('./deleteDog')
const postDogsRoute = require('./postDogs')
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', getAllDogsRoute, getAllDogsByIdRoute, getAllDogByNameRoute, postDogsRoute, deleteDogRoute)
router.use('/temps', getAllTempsTempsRoute)

module.exports = router;
