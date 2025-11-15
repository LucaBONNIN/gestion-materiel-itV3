<script>
    export let data ;
    let { listPc } = data;
    let { listUser } = data;

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
<h2>Add User</h2>
<form action="?/createUserProfile" method="POST">
    <input type="text" name="nameUser" id="nameUser" /><br>
    <input type="text" name="firstNameUser" id="firstNameUser" /><br>
    <input type="text" name="emailUser" id="emailUser" />
    <button type="submit">Add user</button>
</form>