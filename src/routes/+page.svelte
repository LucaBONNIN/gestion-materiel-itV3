<script>

    export let data ;
    let { listPc, listUser } = data;
    const allPc = data.allPc;
    const allUser = data.allUser;
    const allDepartments = data.allDepartments;

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
        name="nameUser"
        id="nameUser"
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
<table id="pcTable" name="pcTable">
    <thead>
        <tr>
            <th>Marque</th>
            <th>Modele</th>
            <th>utilisateur Assigné</th>
        </tr>
    </thead>

    <tbody>
        {#each allPc as pc}
        <tr>
            <td>{pc.brand}</td>
            <td>{pc.model}</td>

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