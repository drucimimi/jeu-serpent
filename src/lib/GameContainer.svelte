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
   * @type {string | null}
   */
    let maximum: string | null

    let jsonData = null
    let error = null
    let fileInput: HTMLInputElement | null = null

    if(!localStorage.getItem("scoreLevelMax")){
        maximum = "Niveau 1 Score 0"
    } else {
        maximum = localStorage.getItem("scoreLevelMax")
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
    const saveScores = () => {
        const data = {
            max: maximum
        }
        const jsonString = JSON.stringify(data, null, 2)
        const blob = new Blob([jsonString], { type: "application/json" })
        const url = URL.createObjectURL(blob)

        const a = document.createElement("a")
        a.href = url
        a.download = "levelScoreMax.json"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }
    const openFileDialog = () => {
        fileInput?.click()
    }
    const restoreScores = (event:any) => {
        error = null
        const file = event.target.files[0]
        console.log("file ", file)
        if (!file) return

        if (file.type !== "application/json" && !file.name.endsWith('.json')) {
            error = "Veuillez sélectionner un fichier JSON valide."
            return
        }

        const reader = new FileReader()
        reader.onload = async (e:any) => {
        try {
            jsonData = JSON.parse(e.target?.result)
            console.log("score et niveau max ",jsonData)
            localStorage.setItem("scoreLevelMax", jsonData.max)
        } catch (err:any) {
            error = "Le fichier n'est pas un JSON valide : " + err.message
        }
        }
        reader.readAsText(file)
    }
    
</script>

<Modal title="Niveau et Scores" openModal>
    <Scores score={score} maximum={maximum} level={level} />
</Modal>

<Modal title="Règles du jeu" openModal={openModal} modalGame>
    <Text value={textOptions.gameRules} />
    <button slot="btnPlay" on:click={closeModal} style="margin:0.5em;"><Icon name="play"/> Jouer</button>
    <button slot="btnSave" on:click={saveScores} style="margin:0.5em;"><Icon name="save"/> Sauvegarder le niveau et le score maximum</button>
    <button slot="btnRestore" on:click={openFileDialog}><Icon name="restore"/> Restaurer le niveau et le score maximum</button>
    <input type="file" accept=".json" bind:this={fileInput} style="display: none;" on:change={restoreScores}/>
</Modal>

<Modal title="Perdu" openModal={gameOver} modalGame>
    <Text value={textOptions.gameOver} />
    <Scores score={score} maximum={maximum} level={level}/>
    <button slot="btnPlay" on:click={restartGame} style="margin:0.5em;"><Icon name="replay"/> Rejouer</button>
    <button slot="btnSave" on:click={saveScores} style="margin:0.5em;"><Icon name="save"/> Sauvegarder le niveau et le score maximum</button>
    <button slot="btnRestore" on:click={restoreScores}><Icon name="restore"/> Restaurer le niveau et le score maximum</button>
    <input type="file" accept=".json" bind:this={fileInput} style="display: none;" />
</Modal>

<Game bind:initialize={initialize} bind:restart={restart} openModal={openModal} bind:score={score} bind:level={level} gameOver={setGameOver} bind:maximum={maximum} />
