import Database from 'better-sqlite3';
import { createSubscriber } from 'svelte/reactivity';


const connection = Database('gestion-materiel-itV3.db');

connection.exec(`
PRAGMA foreign_keys = ON;

-- Table des départements
CREATE TABLE IF NOT EXISTS departments (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    department_name TEXT NOT NULL UNIQUE
);

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name      TEXT NOT NULL,
    last_name       TEXT NOT NULL,
    email           TEXT NOT NULL UNIQUE,
    department_id   INTEGER,      -- FK vers departments.id
    assigned_pc_id  INTEGER UNIQUE, -- PC attribué (0 ou 1)
    FOREIGN KEY (department_id)  REFERENCES departments(id),
    FOREIGN KEY (assigned_pc_id) REFERENCES pcs(id)
);

-- Table des PC
CREATE TABLE IF NOT EXISTS pcs (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    model            TEXT NOT NULL,
    assigned_user_id INTEGER UNIQUE, -- utilisateur à qui il est attribué (0 ou 1)
    FOREIGN KEY (assigned_user_id) REFERENCES users(id)
);

UPDATE users SET department_id = 1   WHERE id = 2;
UPDATE users SET assigned_pc_id = 2 WHERE id = 2;
UPDATE pcs   SET assigned_user_id = 2 WHERE id = 2;

UPDATE users SET department_id = 1   WHERE id = 1;
UPDATE users SET assigned_pc_id = 1  WHERE id = 1;
UPDATE pcs   SET assigned_user_id = 1 WHERE id = 1;



`);





const tables = connection.prepare(`
    SELECT name FROM sqlite_master 
    WHERE type='table' AND name NOT LIKE 'sqlite_%';
`).all();

for (const t of tables) {
    console.log(`\n===== TABLE : ${t.name} =====`);
    const rows = connection.prepare(`SELECT * FROM ${t.name}`).all();
    console.log(rows);
}

// -------  INSERT / DELETE EXAMPLES -------
// DELETE FROM pc WHERE modele = '15 pouces';
// DELETE FROM pc WHERE modele = '14 pouces';
// DELETE FROM pc WHERE modele = 'testy';
// INSERT INTO pc (modele) VALUES
//     ('15 pouces'),
//     ('14 pouces');

// -------  ALTER TABLE EXAMPLES -------
//ALTER TABLE assignment ADD COLUMN name_assignment TEXT;

// -------  UPDATE EXAMPLES -------
// UPDATE assignment
// SET id_user = 4
// WHERE id = 2;