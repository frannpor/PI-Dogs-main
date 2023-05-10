const { Router } = require('express');
const { postDogs } = require('../controllers/postDogs')
const router = Router();

router.post('/', async (req, res) => {
    const { name, height, weight, age, image, temperament} = req.body;
    try {
        if (!name || !height || !weight || !age || !image || !temperament) {
            throw Error("There are missing information to create the dog");
        } else {
            const newDog = await postDogs(name, height, weight, age, image, temperament);
            res.status(200).json(newDog);
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
});

module.exports = router;