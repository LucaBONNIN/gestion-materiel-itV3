import Database from 'better-sqlite3';
import { createSubscriber } from 'svelte/reactivity';


const connection = Database('gestion-materiel-itV3.db');

connection.exec(`

PRAGMA foreign_keys = ON;

CREATE TABLE pc (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    modele TEXT NOT NULL
);

CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    firstName TEXT NOT NULL,
    email TEXT NOT NULL
    -- pas de FOREIGN KEY ici si tu n'en veux pas
);

CREATE TABLE assignment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_user INTEGER,
    FOREIGN KEY (id_user) REFERENCES user(id)
);

INSERT INTO pc (modele) VALUES
    ('15 pouces'),
    ('14 pouces');


`)

const rows = connection.prepare(
  "SELECT name, sql FROM sqlite_master WHERE type = 'table'"
).all();

console.log(rows);