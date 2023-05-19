const { Router } = require('express')
const { getAllDogs } = require('../controllers/getAllDogs')
const router = Router()

router.get('/:id', async (req, res) => {
    const id  = req.params.id
    const allDogs = await getAllDogs()
    try {
        if (id) {
            const dogId = await allDogs.find(dog => dog.id == (id))
            dogId ? res.status(200).send(dogId) : res.status(404).json("Dog not found");
        }
    } catch (error) {
        return res.status(404).send(error.message)
    }
})

module.exports = router;