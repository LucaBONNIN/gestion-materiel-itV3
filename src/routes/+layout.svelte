<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}















export function load(){
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
	`)
}