const  { Dog } = require("../db");

const deleteDog = async (id) => {
  if (!id) {
    throw new Error("Dog ID is required");
  }
  try {
    if (typeof id !== "string") {
      throw new Error("Cannot delete this dog");
    }
    const foundDog = await Dog.findByPk(id);
    if (!foundDog) {
      throw new Error("Dog not found");
    }
    await foundDog.destroy();
    return foundDog;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  deleteDog,
};
