import Database from 'better-sqlite3';
import { createSubscriber } from 'svelte/reactivity';


const connection = Database('gestion-materiel-itV3.db');

export function load(){
    // const allPc = connection.prepare(`
    //     SELECT 
    //         pcs.id,
    //         pcs.brand,
    //         pcs.model,
    //         pcs.assigned_user_id,
    //         users.first_name,
    //         users.last_name,
    //         users.email
    //     FROM pcs
    //     LEFT JOIN users ON users.id = pcs.assigned_user_id
    // `).all();

    // const allUser = connection.prepare(`
    //     SELECT
    //         users.id,
    //         users.first_name,
    //         users.last_name,
    //         users.email,
    //         users.department_id,
    //         departments.department_name,
    //         users.assigned_pc_id
    //     FROM users
    //     LEFT JOIN departments ON departments.id = users.department_id
    // `).all();

    // const allDepartments = connection.prepare(`
    //     SELECT 
    //         departments.id,
    //         departments.department_name,
    //         users.id AS user_id
    //     FROM departments
    //     LEFT JOIN users ON users.department_id = departments.id
    // `).all();
    // return { allPc,allUser,allDepartments };

	const allData = connection.prepare(`
		SELECT
			users.id AS user_id,
			users.first_name AS first_name,
			users.last_name AS last_name,
			users.email AS email,
			users.department_id AS department_id,
			users.assigned_pc_id AS assigned_pc_id,
			pcs.id AS pc_id,
			pcs.brand AS pc_brand,
			pcs.model AS pc_model,
			pcs.assigned_user_id AS pc_assigned_user_id,
			departments.id AS department_id,
			departments.department_name AS department_name
		FROM users
		LEFT JOIN pcs ON pcs.assigned_user_id = users.id
		LEFT JOIN departments ON departments.id = users.department_id

	`).all();

    return { allData };
    
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
        const firstNameUser = formulaire.get('firstNameUser');
        const lastNameUser = formulaire.get('lastNameUser');
        const emailUser = formulaire.get('emailUser');
        console.log(firstNameUser, lastNameUser, emailUser);
        connection.prepare(`INSERT INTO users (first_name, last_name, email) VALUES (?, ?, ?)`).run(firstNameUser, lastNameUser, emailUser);
    } 
};