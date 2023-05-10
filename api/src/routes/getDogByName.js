const { Router } = require('express');
const router = Router();
const getDogByName = require('../controllers/getDogByName')

router.get('/dogs', async (req, res) => {
    const name = req.query.name.toLowerCase(); //* Importante parsear a lowerCase lo que nos pasen por query para que no hayan problemas de coincidencia
    try {
        const dogs = await getDogByName(name);
        if (dogs.length) return res.status(200).json(dogs);
        res.status(404).json({ message: "There aren't dogs with that name" });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}); //* Verificamos que el nombre del perro que nos piden exista para devolverlo o en cuyo caso retornar error

module.exports = router;