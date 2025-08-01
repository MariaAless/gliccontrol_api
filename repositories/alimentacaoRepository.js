const Alimentacao = require('../models/Alimentacao');

async function findAllByUsuario(usuarioId) {
  return await Alimentacao.findAll({ where: { usuarioId } });
}

async function findById(id) {
  return await Alimentacao.findByPk(id);
}

async function create(data) {
  return await Alimentacao.create(data);
}

async function update(id, data) {
  const alimentacao = await Alimentacao.findByPk(id);
  if (alimentacao) {
    await alimentacao.update(data);
    return alimentacao;
  }
  return null;
}

async function remove(id) {
  const alimentacao = await Alimentacao.findByPk(id);
  if (alimentacao) {
    await alimentacao.destroy();
    return alimentacao;
  }
  return null;
}

module.exports = {
  findAllByUsuario, findById, create, update, remove,
};
