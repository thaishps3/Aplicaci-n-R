const express = require('express');
const router = express.Router();
const db = require('../database');

// Obtener usuarios activos de la app
router.get('/', (req, res) => {
    db.all(
        `SELECT id, nombre, rol, activo, creado_en
         FROM usuarios_app
         WHERE activo = 1
         ORDER BY nombre ASC`,
        [],
        (error, rows) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    error: 'Error al obtener usuarios'
                });
            }

            res.json({
                ok: true,
                usuarios: rows
            });
        }
    );
});

// Crear usuario de la app
router.post('/', (req, res) => {
    const { nombre, rol, pin } = req.body || {};

    if (!nombre || !nombre.trim()) {
        return res.status(400).json({
            ok: false,
            error: 'El nombre es obligatorio'
        });
    }

    if (!rol || !['admin', 'auxiliar'].includes(rol)) {
        return res.status(400).json({
            ok: false,
            error: 'El rol debe ser admin o auxiliar'
        });
    }

    if (!pin || !/^\d{4}$/.test(pin)) {
        return res.status(400).json({
            ok: false,
            error: 'El PIN debe tener 4 dígitos'
        });
    }

    db.run(
        `INSERT INTO usuarios_app (nombre, rol, pin)
         VALUES (?, ?, ?)`,
        [nombre.trim(), rol, pin],
        function(error) {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    error: 'Error al crear usuario'
                });
            }

            res.status(201).json({
                ok: true,
                usuario: {
                    id: this.lastID,
                    nombre: nombre.trim(),
                    rol,
                    activo: 1
                }
            });
        }
    );
});

module.exports = router;