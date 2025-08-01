
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const usuarioRepository = require('../repositories/usuarioRepository');

function generateToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

// Cadastro
router.post('/cadastro', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ error: 'Preencha todos os campos' });
    }

    const existente = await usuarioRepository.findByEmail(email);
    if (existente) {
      return res.status(400).json({ error: 'Email já em uso' });
    }

    const usuario = await usuarioRepository.create({ nome, email, senha });
    const token = generateToken(usuario.id);

    res.status(201).json({ usuario, token });
  } catch (err) {
    res.status(500).json({ error: 'Erro no cadastro' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await usuarioRepository.validatePassword(email, senha);

    if (!usuario) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    const token = generateToken(usuario.id);
    res.json({ usuario, token });
  } catch (err) {
    res.status(500).json({ error: 'Erro no login' });
  }
});

module.exports = router;

