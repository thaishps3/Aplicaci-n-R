const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database');
const residentesRoutes = require('./routes/residentes.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const app = express();

const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/residentes', residentesRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
    res.json({
        ok: true,
        message: 'Servidor BioSenior funcionando'
    });
});

// Servir archivos del frontend desde la carpeta raíz del proyecto
app.use(express.static(path.join(__dirname, '..')));

// Arrancar servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});