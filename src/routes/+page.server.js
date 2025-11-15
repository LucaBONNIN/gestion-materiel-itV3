import Database from 'better-sqlite3';
import { createSubscriber } from 'svelte/reactivity';


const connection = Database('gestion-materiel-itV3.db');

export function load(){
    const allPc = connection.prepare("SELECT * FROM pc").all();
    return { listePc: allPc};
    const allUser = connection.prepare("SELECT * FROM user").all();
    return { listeUser: allUser};
};

export const actions = {
    addpc: async ({ request }) => {
        console.log('pc add');
        const formulaire = await request.formData();
        const modelePc = formulaire.get('modele');
        console.log(modelePc)
        connection.prepare(`INSERT INTO pc (modele) VALUES (?)`).run(modelePc);
    },
    deleteitem: async ({ request }) => {
        console.log('pc delete');
        const formulaire = await request.formData();
        const idpc = formulaire.get('idpc');
        console.log(idpc);
        connection.prepare(`DELETE FROM pc WHERE id = ?`).run(idpc);
    },
    createUserProfile: async ({ request }) => {
        console.log('user create');
        const formulaire = await request.formData();
        const nameUser = formulaire.get('nameUser');
        const firstNameUser = formulaire.get('firstNameUser');
        const emailUser = formulaire.get('emailUser');
        console.log(nameUser, firstNameUser, emailUser);
        connection.prepare(`INSERT INTO user (name, firstName, email) VALUES (?, ?, ?)`).run(nameUser, firstNameUser, emailUser);
    } 
};