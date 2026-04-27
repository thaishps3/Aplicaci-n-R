const express = require('express');
const router = express.Router();
const db = require('../database');

// Obtener registros BioSenior
router.get('/', (req, res) => {
    const { fecha, residente_id } = req.query;

    let sql = `
        SELECT 
            id,
            residente_id,
            residente_nombre,
            genero,
            deposicion,
            miccion,
            observacion,
            auxiliar,
            turno,
            fecha_iso,
            hora,
            creado_en
        FROM registros_biosenior
    `;

    const params = [];
    const conditions = [];

    if (fecha) {
        conditions.push('fecha_iso = ?');
        params.push(fecha);
    }

    if (residente_id) {
        conditions.push('residente_id = ?');
        params.push(residente_id);
    }

    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY fecha_iso DESC, hora DESC, id DESC';

    db.all(sql, params, (error, rows) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                error: 'Error al obtener registros BioSenior'
            });
        }

        res.json({
            ok: true,
            registros: rows
        });
    });
});

// Crear registro BioSenior
router.post('/', (req, res) => {
    const {
        residente_id,
        residente_nombre,
        genero,
        deposicion,
        miccion,
        observacion,
        auxiliar,
        turno,
        fecha_iso,
        hora
    } = req.body || {};

    if (!residente_nombre || !residente_nombre.trim()) {
        return res.status(400).json({
            ok: false,
            error: 'El residente es obligatorio'
        });
    }

    if (!fecha_iso) {
        return res.status(400).json({
            ok: false,
            error: 'La fecha es obligatoria'
        });
    }

    db.run(
        `INSERT INTO registros_biosenior (
            residente_id,
            residente_nombre,
            genero,
            deposicion,
            miccion,
            observacion,
            auxiliar,
            turno,
            fecha_iso,
            hora
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            residente_id || null,
            residente_nombre.trim(),
            genero || null,
            deposicion || null,
            miccion || null,
            observacion || '',
            auxiliar || null,
            turno || null,
            fecha_iso,
            hora || null
        ],
        function(error) {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    error: 'Error al crear registro BioSenior'
                });
            }

            res.status(201).json({
                ok: true,
                registro: {
                    id: this.lastID,
                    residente_id: residente_id || null,
                    residente_nombre: residente_nombre.trim(),
                    genero: genero || null,
                    deposicion: deposicion || null,
                    miccion: miccion || null,
                    observacion: observacion || '',
                    auxiliar: auxiliar || null,
                    turno: turno || null,
                    fecha_iso,
                    hora: hora || null
                }
            });
        }
    );
});

module.exports = router;