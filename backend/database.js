const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'data', 'biosenior.db');

const db = new sqlite3.Database(dbPath, (error) => {
    if (error) {
        console.error('Error al conectar con SQLite:', error.message);
        return;
    }

    console.log('Base de datos conectada:', dbPath);
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS usuarios_app (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            rol TEXT NOT NULL,
            pin TEXT NOT NULL,
            activo INTEGER DEFAULT 1,
            creado_en TEXT DEFAULT CURRENT_TIMESTAMP
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS residentes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            genero TEXT,
            activo INTEGER DEFAULT 1,
            creado_en TEXT DEFAULT CURRENT_TIMESTAMP
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS registros_biosenior (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            residente_id INTEGER,
            residente_nombre TEXT NOT NULL,
            genero TEXT,
            deposicion TEXT,
            miccion TEXT,
            observacion TEXT,
            auxiliar TEXT,
            turno TEXT,
            fecha_iso TEXT NOT NULL,
            hora TEXT,
            creado_en TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (residente_id) REFERENCES residentes(id)
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS avisos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            residente_id INTEGER,
            residente_nombre TEXT NOT NULL,
            tipo TEXT NOT NULL,
            estado TEXT DEFAULT 'activo',
            responsable TEXT,
            observacion TEXT,
            creado_por TEXT,
            cerrado_por TEXT,
            fecha_iso TEXT NOT NULL,
            hora_inicio TEXT,
            hora_cierre TEXT,
            creado_en TEXT DEFAULT CURRENT_TIMESTAMP,
            cerrado_en TEXT,
            FOREIGN KEY (residente_id) REFERENCES residentes(id)
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS comedor_asientos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            residente_id INTEGER,
            residente_nombre TEXT,
            mesa TEXT NOT NULL,
            asiento TEXT NOT NULL,
            necesita_ayuda INTEGER DEFAULT 0,
            observacion TEXT,
            actualizado_por TEXT,
            actualizado_en TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (residente_id) REFERENCES residentes(id)
        )
    `);
});

module.exports = db;