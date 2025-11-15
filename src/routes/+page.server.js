import Database from 'better-sqlite3';
import { createSubscriber } from 'svelte/reactivity';


const connection = Database('gestion-materiel-itV3.db');

export function load(){
    const allPc = connection.prepare("SELECT * FROM pcs").all();
    return { listePc: allPc};
    const allUser = connection.prepare("SELECT * FROM users").all();
    return { listeUser: allUser};
};

export const actions = {
    addpc: async ({ request }) => {
        console.log('pc add');
        const formulaire = await request.formData();
        const modelePc = formulaire.get('model');
        console.log(modelePc)
        connection.prepare(`INSERT INTO pcs (model) VALUES (?)`).run(modelePc);
    },
    deleteitem: async ({ request }) => {
        console.log('pc delete');
        const formulaire = await request.formData();
        const idpc = formulaire.get('idpc');
        console.log(idpc);
        connection.prepare(`DELETE FROM pcs WHERE id = ?`).run(idpc);
    },
    createUserProfile: async ({ request }) => {
        console.log('user create');
        const formulaire = await request.formData();
        const firstNameUser = formulaire.get('nameUser');
        const lastNameUser = formulaire.get('firstNameUser');
        const emailUser = formulaire.get('emailUser');
        console.log(firstNameUser, lastNameUser, emailUser);
        connection.prepare(`INSERT INTO users (first_name, last_name, email) VALUES (?, ?, ?)`).run(firstNameUser, lastNameUser, emailUser);
    } 
};