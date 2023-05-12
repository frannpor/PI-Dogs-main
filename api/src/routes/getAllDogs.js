const { Router } = require('express');
const { getAllDogs } = require('../controllers/getAllDogs')
const router = Router();

router.get("/", async (req, res) => {
    const name = req.query.name;
    const allDogs = await getAllDogs();
    try {
        if (name) {
            const dogFound = await allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase())) //* Filtramos lo que nos llega por query y lo parseamos a minúscula 
            dogFound.length ? res.status(200).send(dogFound) : res.status(404).json({ msg: "Dog not found" }) //* para que coicidan con los datos que de el cliente
        } else return res.status(200).send(allDogs)
    } catch (error) {
        return res.status(404).send(error.message)
    }
})

module.exports = router;