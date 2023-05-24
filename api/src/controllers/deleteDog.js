const { Dog } = require('../db')

const deleteDog = async (id) => {
    if (!id) {
        throw new Error('This dog does not exist')
    } else if (typeof id === 'number') throw new Error('You can not delete this dog')
    const foundDog = await Dog.findByPk(id)

    foundDog.destroy({
        where: { id: id }
    })
    return foundDog;
}

module.exports = {
    deleteDog
};