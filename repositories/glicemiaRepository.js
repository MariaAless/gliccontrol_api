const Glicemia = require('../models/Glicemia');

async function findAllByUsuario(usuarioId) {
  return await Glicemia.findAll({ where: { usuarioId } });
}

async function findById(id) {
  return await Glicemia.findByPk(id);
}

async function create(data) {
  return await Glicemia.create(data);
}

async function update(id, data) {
  const glicemia = await Glicemia.findByPk(id);
  if (glicemia) {
    await glicemia.update(data);
    return glicemia;
  }
  return null;
}

async function remove(id) {
  const glicemia = await Glicemia.findByPk(id);
  if (glicemia) {
    await glicemia.destroy();
    return glicemia;
  }
  return null;
}

// remove tudo 
async function removeAllByUsuario(usuarioId) {
  return await Glicemia.destroy({ where: { usuarioId } });
}


module.exports = {
  findAllByUsuario, findById, create, update, remove,removeAllByUsuario
};
