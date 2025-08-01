const Medicacao = require('../models/Medicacao');

async function findAllByUsuario(usuarioId) {
  return await Medicacao.findAll({ where: { usuarioId } });
}

async function findById(id) {
  return await Medicacao.findByPk(id);
}

async function create(data) {
  return await Medicacao.create(data);
}

async function update(id, data) {
  const medicacao = await Medicacao.findByPk(id);
  if (medicacao) {
    await medicacao.update(data);
    return medicacao;
  }
  return null;
}

async function remove(id) {
  const medicacao = await Medicacao.findByPk(id);
  if (medicacao) {
    await medicacao.destroy();
    return medicacao;
  }
  return null;
}

module.exports = {
  findAllByUsuario, findById, create, update, remove,
};
