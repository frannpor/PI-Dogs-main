const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID, //* El id se genera automáticamente si no lo ponemos
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.STRING,
    },
    createInDb: { //* Crear esta propiedad para luego usarla en los filtros
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  },
    { timestamps: false });

};