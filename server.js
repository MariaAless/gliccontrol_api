const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');

// Rotas
const usuariosRoutes = require('./routes/usuarios');
const glicemiaRoutes = require('./routes/glicemia');
const medicacaoRoutes = require('./routes/medicacao');
const alimentacaoRoutes = require('./routes/alimentacao');

const app = express();
app.use(cors());
app.use(express.json());

sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado');
}).catch(err => {
  console.error('Erro ao sincronizar banco:', err);
});

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/glicemia', glicemiaRoutes);
app.use('/api/medicacao', medicacaoRoutes);
app.use('/api/alimentacao', alimentacaoRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    message: 'GlicControl API funcionando!',
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`Servidor rodando na porta ${PORT} em todas as interfaces`);
// });