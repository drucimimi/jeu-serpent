<script lang="ts">
    export let score
    export let maximum
    export let level
</script>
<style>
    ul{
        list-style: none;
        padding: 0;
    }
</style>
<ul>
    <li>Niveau Actuel : {level}</li>
    <li>Score Actuel : {score}</li>
    <li>Niveau et Score Maximum : {maximum}</li>
</ul>