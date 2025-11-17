import Database from 'better-sqlite3';
import { createSubscriber } from 'svelte/reactivity';


const connection = Database('gestion-materiel-itV3.db');

export function load(){
    const allPc = connection.prepare(`
        SELECT 
            pcs.id,
            pcs.brand,
            pcs.model,
            pcs.assigned_user_id,
            users.first_name,
            users.last_name,
            users.email
        FROM pcs
        LEFT JOIN users ON users.id = pcs.assigned_user_id
    `).all();

    const allUser = connection.prepare("SELECT * FROM users").all();
    const allDepartments = connection.prepare("SELECT * FROM departments").all();
    
    return { allPc,allUser,allDepartments };
};



export const actions = {
    addpc: async ({ request }) => {
        console.log('pc add');
        const formulaire = await request.formData();
        const brandPc = formulaire.get('brand');
        const modelPc = formulaire.get('model');
        console.log(modelPc)
        connection.prepare(`INSERT INTO pcs (brand, model) VALUES (?, ?)`).run(brandPc, modelPc);
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