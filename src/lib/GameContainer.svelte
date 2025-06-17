<script lang="ts">
    import Modal from "./Modal.svelte"
    import Game from "./Game.svelte"
    import Scores from "./Scores.svelte"
    import Text from "./Text.svelte"
    import textOptions from "../assets/textOptions.json"
    import Icon from "./Icon.svelte";

    let openModal = true
    let score = 0
    let level = 1
    /**
   * @type {boolean}
   */
    let initialize: boolean
    let gameOver = false
    let restart = false
    /**
   * @type {string | number | null}
   */
    let maximum: string | number | null;
    if(!localStorage.getItem("score max")){
        maximum = 0
    } else {
        maximum = localStorage.getItem(("score max"))
    }

    const closeModal = () => {
        openModal = false
        initialize = true
    }

    const setGameOver=()=>{
        gameOver = true
    }

    const restartGame=()=>{
        gameOver = false
        restart = !restart
    }
</script>

<Modal title="Niveau et Scores" openModal>
    <Scores score={score} maximum={maximum} level={level} />
</Modal>

<Modal title="Règles du jeu" openModal={openModal} modalGame>
    <Text value={textOptions.gameRules} />
    <button slot="btnPlay" on:click={closeModal}><Icon name="play"/> Jouer</button>
</Modal>

<Modal title="Perdu" openModal={gameOver} modalGame>
    <Text value={textOptions.gameOver} />
    <Scores score={score} maximum={maximum} level={level}/>
    <button slot="btnPlay" on:click={restartGame}><Icon name="replay"/> Rejouer</button>
</Modal>

<Game bind:initialize={initialize} bind:restart={restart} openModal={openModal} bind:score={score} bind:level={level} gameOver={setGameOver} bind:maximum={maximum} />
