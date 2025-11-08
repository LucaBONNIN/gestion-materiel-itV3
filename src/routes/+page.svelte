<script>
    export let data ;
    let { listePc } = data;

</script>

<h1>Page test</h1>

{#each listePc as item}
    <p>{item.modele}</p>
    <form action="?/deleteitem" method="POST">
        <input type="hidden" name="idpc" value={item.id}/>
        <button type="submit">X</button>
    </form>
{/each}
<br />
<form action="?/createitem" method="POST">
    <input type="text" name="modele" id="modele " />
    <button type="submit">Ajouter</button>
</form>