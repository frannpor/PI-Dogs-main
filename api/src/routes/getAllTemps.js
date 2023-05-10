const { Router } = require('express');
const { getAllTemps } = require('../controllers/getAllTemps');
const router = Router();

router.get('/', async (req, res) => {
    const temperaments = await getAllTemps();
    try {
        res.status(200).send(temperaments);
    } catch (error) {
        res.status(404).send(error.message);
    }
})

module.exports = router;