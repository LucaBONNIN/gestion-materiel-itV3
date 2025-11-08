import Database from 'better-sqlite3';


const connection = Database('gestion-materiel-itV3.db');

export function load(){
    const allPc = connection.prepare("SELECT * FROM pc").all();
    return { listePc: allPc};
};

export const actions = {
    createitem: async ({ request }) => {
        console.log('create item');
        const formulaire = await request.formData();
        const modelePc = formulaire.get('modele');
        console.log(modelePc)
        connection.prepare(`INSERT INTO pc (modele) VALUES (?)`).run(modelePc);
    },
    deleteitem: async ({ request }) => {
        console.log('delete item');
        const formulaire = await request.formData();
        const idpc = formulaire.get('idpc');
        console.log(idpc);
        connection.prepare(`DELETE FROM pc WHERE id = ?`).run(idpc);
    }
};