

connection.exec(`
CREATE TABLE pc (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    modele TEXT NOT NULL
);

INSERT INTO pc (modele) VALUES
    ('15 pouces'),
    ('14 pouces');
    
    `)