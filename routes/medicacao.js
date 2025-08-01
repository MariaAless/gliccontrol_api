
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const MedicacaoRepo = require('../repositories/medicacaoRepository');

router.use(auth);

// GET todas do usuário logado
router.get('/', async (req, res) => {
  const lista = await MedicacaoRepo.findAllByUsuario(req.user.id);
  res.json(lista);
});

// POST - novo
router.post('/', async (req, res) => {
  const nova = await MedicacaoRepo.create({ ...req.body, usuarioId: req.user.id });
  res.status(201).json(nova);
});

// PUT atualizar
router.put('/:id', async (req, res) => {
  const atualizado = await MedicacaoRepo.update(req.params.id, req.body);
  if (!atualizado) return res.status(404).json({ error: 'Registro não encontrado' });
  res.json(atualizado);
});

// DELETE
router.delete('/:id', async (req, res) => {
  const removido = await MedicacaoRepo.remove(req.params.id);
  if (!removido) return res.status(404).json({ error: 'Registro não encontrado' });
  res.json(removido);
});

module.exports = router;

