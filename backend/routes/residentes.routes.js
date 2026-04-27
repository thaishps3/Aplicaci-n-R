const express = require('express');
const router = express.Router();
const db = require('../database');

// Obtener residentes activos
router.get('/', (req, res) => {
    db.all(
        `SELECT id, nombre, genero, activo, creado_en
         FROM residentes
         WHERE activo = 1
         ORDER BY nombre ASC`,
        [],
        (error, rows) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    error: 'Error al obtener residentes'
                });
            }

            res.json({
                ok: true,
                residentes: rows
            });
        }
    );
});

// Crear residente
router.post('/', (req, res) => {
    const { nombre, genero } = req.body || {};

    if (!nombre || !nombre.trim()) {
        return res.status(400).json({
            ok: false,
            error: 'El nombre del residente es obligatorio'
        });
    }

    db.run(
        `INSERT INTO residentes (nombre, genero)
         VALUES (?, ?)`,
        [nombre.trim(), genero || null],
        function(error) {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    error: 'Error al crear residente'
                });
            }

            res.status(201).json({
                ok: true,
                residente: {
                    id: this.lastID,
                    nombre: nombre.trim(),
                    genero: genero || null,
                    activo: 1
                }
            });
        }
    );
});

module.exports = router;