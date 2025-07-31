const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

const Glicemia = sequelize.define('Glicemia', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  data: {
    type: DataTypes.DATEONLY, 
    allowNull: false
  },
  hora: {
    type: DataTypes.TIME, 
    allowNull: false
  },
  periodo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  observacao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario, 
      key: 'id'
    }
  }
});

Glicemia.belongsTo(Usuario, { foreignKey: 'usuarioId' });

module.exports = Glicemia;
