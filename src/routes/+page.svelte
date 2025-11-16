<script>
    export let data ;
    let { listPc, listUser } = data;

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

{#each listPc as item}
    <p>{item.modele}</p>
    <form action="?/deleteitem" method="POST">
        <input type="hidden" name="idpc" value={item.id}/>
        <button type="submit">X</button>
    </form>
{/each}
<br />
<form action="?/addpc" method="POST">
    <input type="text" name="modele" id="modele" />
    <button type="submit">Ajouter</button>
</form>
<br />
<!-- <h2>Add User</h2> -->
<!-- <form action="?/createUserProfile" method="POST">
    <input type="text" name="firstNameUser" id="firstNameUser" /><br>
    <input type="text" name="nameUser" id="nameUser" /><br>
    <input type="text" name="emailUser" id="emailUser" />
    <button id="addUserButton" type="submit">Add user</button>

    <p id="errorMessage" style="display: block">
        Vous devez remplir tous les champs !
    </p>

</form> -->
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
        type="text"
        name="emailUser"
        id="emailUser"
        bind:value={emailUser}
    />

    {#if showError}
        <p id="errorMessage" style="color: red; font-weight: bold;">
            Tous les champs sont obligatoires.
        </p>
    {/if}

    <button id="addUserButton" type="submit">Add user</button>
</form>
