<script>

    export let data ;
    let { listPc, listUser } = data;
    // const allPc = data.allPc;
    // const allUser = data.allUser;
    // const allDepartments = data.allDepartments;
    const allData = data.allData;

    let firstNameUser = "";
    let nameUser = "";
    let emailUser = "";
    let showError = false;

    function handleSubmit(event) {
        if (!firstNameUser.trim() || !nameUser.trim() || !emailUser.trim()) {
            event.preventDefault();      // on bloque l’envoi
            showError = true;
        } else {
            showError = false;
        }
    }



</script>

<h1>Page test</h1>
<!-- Lorsque j'ajoute un pc  -->
<br />
<form action="?/addpc" method="POST">
    <input type="text" name="brand" id="brand" />
    <input type="text" name="model" id="model" />
    <button type="submit">Ajouter</button>
</form>
<!-- Lorsque j'ajoute un utilisateur  -->
<br />
<form action="?/createUserProfile" method="POST" on:submit={handleSubmit}>
    <input
        type="text"
        name="firstNameUser"
        id="firstNameUser"
        bind:value={firstNameUser}
    /><br>

    <input
        type="text"
        name="lastNameUser"
        id="lastNameUser"
        bind:value={nameUser}
    /><br>

    <input
        type="email"
        name="emailUser"
        id="emailUser"
        bind:value={emailUser}
    />

    {#if showError}
        <p id="errorMessage" style="color: red; font-weight: bold;">
            Tous les champs sont obligatoires.
        </p>
    {/if}

    <button id="addUserButton" type="submit">Validate the user</button>
</form>
<!-- Affichage de tous les pc -->
<h1>Liste des PC</h1>
<br>
<table id="pcTable">
    <thead>
        <tr>
            <th>Marque</th>
            <th>Modele</th>
            <th>utilisateur Assigné</th>
        </tr>
    </thead>

    <tbody>
        {#each allData as pc}
        <tr>
            <td>{pc.pc_brand}</td>
            <td>{pc.pc_model}</td>

            <td>
                {#if pc.assigned_user_id}
                    {pc.first_name} {pc.name} {pc.mail}<br/>
                {:else}
                    <i>Non assigné</i>
                {/if}
            </td>
        </tr>
        {/each}
    </tbody>
</table>
<!-- Affichage de tous les utilisateurs -->
<h1>Liste des Utilisateurs</h1>
<br>
<table id="userTable">
    <thead>
        <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Département</th>
            <th>Pc assigné</th>
        </tr>
    </thead>
    <tbody>
        {#each allData as user}
        <tr>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
            <td>
                {#if user.department_id}
                    {user.department_name}<br/>
                {:else}
                    <i>Non assigné</i>
                {/if}
            </td>
            <td>{user.assigned_pc_id}</td>
        </tr>
        {/each}
    </tbody>
</table>
<!-- Affichage de tous les départements -->
<h1>Liste des Départements</h1>
<br>
<table id="departmentTable">
    <thead>
        <tr>
            <th>Nom du Département</th>
            <th>Utilisateur(s) Assigné(s)</th>
        </tr>
    </thead>
    <tbody>
        {#each allData as department}
        <tr>
            <td>{department.department_name}</td>
            <td>            
                {#if department.user_id}
                    {department.user_id}<br/>
                {:else}
                    <i>Non assigné</i>
                {/if}
            </td>
        </tr>
        {/each}
    </tbody>
</table>