
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const glicemiaRepo = require('../repositories/glicemiaRepository');

router.use(auth);

// GET todas do usuário logado
router.get('/', async (req, res) => {
  const lista = await glicemiaRepo.findAllByUsuario(req.user.id);
  res.json(lista);
});

// POST - novo
router.post('/', async (req, res) => {
  const nova = await glicemiaRepo.create({ ...req.body, usuarioId: req.user.id });
  res.status(201).json(nova);
});

// PUT atualizar
router.put('/:id', async (req, res) => {
  const atualizado = await glicemiaRepo.update(req.params.id, req.body);
  if (!atualizado) return res.status(404).json({ error: 'Registro não encontrado' });
  res.json(atualizado);
});

// DELETE
router.delete('/:id', async (req, res) => {
  const removido = await glicemiaRepo.remove(req.params.id);
  if (!removido) return res.status(404).json({ error: 'Registro não encontrado' });
  res.json(removido);
});

// DELETE todas as glicemias do usuário logado
router.delete('/', async (req, res) => {
  const apagadas = await glicemiaRepo.removeAllByUsuario(req.user.id);
  res.json({ message: `Foram apagadas ${apagadas} glicemias.` });
});


module.exports = router;

