<script lang="ts">
// @ts-nocheck

    import {onMount} from 'svelte'
    import Snake from "../utils/snake.js"
    import Apple from "../utils/apple.js"
    import ControlsKeyboard from "./ControlsKeyboard.svelte";
    export let score
    export let level
    export let gameOver
    export let openModal
    export let restart
    export let maximum
    export let initialize = false

    const userAgent = navigator.userAgent.toLowerCase()
    const isMobileTablet = /mobile/.test(userAgent)
    const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent)
    const mobileLandscape = window.orientation

    let canvas
    let context
    let blockSize
    let canvasWidth
    let canvasHeight
    if((isMobileTablet && window.screen.width < 768) || (isMobileTablet && mobileLandscape === 90)){
        blockSize = 15
        if(mobileLandscape === 0){
            canvasWidth = window.screen.width - 100
            canvasHeight = window.screen.width - 200
        } else if(mobileLandscape === 90){
            canvasWidth = window.screen.width - 250
            canvasHeight = window.screen.height - 300
        }
    } else {
        blockSize = 30
        canvasWidth = 600
        canvasHeight = 400
    }
    let widthInBlocks = canvasWidth/blockSize
    let heightInBlocks = canvasHeight/blockSize
    let delay
    let snakee
    let applee
    let timeOut

    onMount( () => {
        context = canvas.getContext('2d')
    })

    document.onkeydown = (e) => {
        const key = e.key;
        let newDirection;
        switch(key){
            case "Left":
            case "ArrowLeft":
                newDirection = "left";
                break;
            case "Up":
            case "ArrowUp":
                newDirection = "up";
                break;
            case "Right":
            case "ArrowRight":
                newDirection = "right";
                break;
            case "Down":
            case "ArrowDown":
                newDirection = "down";
                break;
            default:
                return;
        }
        snakee.setDirection(newDirection);
    }

    $ : if (initialize || restart){
        init()
    }

    const init = () => { //ajout du bac à sable du jeu
        canvas.width = canvasWidth
        canvas.height = canvasHeight
        launch()
    }
    const launch = () => {  //ajout du serpent, de la pomme et du score dans le bac
        if( isMobileTablet || mobileLandscape === 90){
            snakee = new Snake("right", [3,2],[2,2])
            applee = new Apple([3, 3])
        } else {
            snakee = new Snake("right", [6,4],[5,4],[4,4],[3,4],[2,4])
            applee = new Apple()
        }
        score = 0
        level = 1
        clearTimeout(timeOut)
        if(isMobileTablet || mobileLandscape === 90){
            delay = 300
        } else {
            delay = 150
        }
        refreshCanvas()
    }

    const refreshCanvas = () => { //lancement d'une partie
        let audioCollision = document.getElementById("collision")
        let audioEat = document.getElementById("eat")
        if(audioCollision != null){
            audioCollision.delete()
        }
        if(audioEat != null){
            audioEat.delete()
        }
        snakee.advance()
        if (snakee.checkCollision(widthInBlocks, heightInBlocks)){
            audioCollision = document.createElement("audio")
            audioCollision.id = "collision"
            audioCollision.src = "/serpentmur.mp3"
            audioCollision.play()
            gameOver()
            if(score > Number(maximum.split("Score ")[1]) || level > Number(maximum.split("Score ")[0].split("Niveau ")[1].trim())){
                maximum=`Niveau ${level} Score ${score}`
                localStorage.setItem("scoreLevelMax", maximum)
            }
        } else {
            if (snakee.isEatingApple(applee)){
                let audioEat = document.createElement("audio")
                audioEat.id = "eat"
                audioEat.src = "/serpentquandilmange.mp3"
                audioEat.play()
                score++
                snakee.ateApple = true

                do {
                    applee.setNewPosition(widthInBlocks, heightInBlocks);
                } while(applee.isOnSnake(snakee));

                if(score % 10 == 0){
                    speedUp()
                }
            }
            context.clearRect(0,0,canvasWidth,canvasHeight);
            drawSnake(context, blockSize, snakee);
            drawApple(context, blockSize, applee);
            timeOut = setTimeout(refreshCanvas,delay)
        }
    }

    const speedUp = () => { //accélération de la cadence du jeu et changement de niveau
        delay /= 1.5
        level++
    }

    const drawSnake = (context, blockSize, snake) => { //permet d'afficher le serpent
        context.save()
        context.fillStyle="#ff0000"
        for (let block of snake.body){
            drawBlock(context,block, blockSize)
        }
        context.restore()
    }
    const drawApple = (context, blockSize, apple) => { //permet d'afficher la pomme
        const radius = blockSize/2
        const x = apple.position[0]*blockSize + radius
        const y = apple.position[1]*blockSize + radius
        context.save()
        context.fillStyle = "#33cc33"
        context.beginPath()
        context.arc(x, y, radius, 0, Math.PI*2, true)
        context.fill()
        context.restore()
    }

    const drawBlock = (ctx, position, blockSize) => { //permet de construire le serpent par bloc
        const [x,y] = position
        ctx.fillRect(x*blockSize,y*blockSize,blockSize,blockSize)
    }


</script>

<style>
    .game{
        border: 10px solid gray;
        margin: 0 auto;
        background-color: #ddd;
    }
    .game-container{
        display: flex;
    }
</style>

<div class={isTablet || (isMobileTablet && mobileLandscape === 90) ? "game-container" : ""}>
    <canvas bind:this={canvas} class="game"></canvas>
    {#if isMobileTablet}
        <ControlsKeyboard bind:snakee={snakee} isTablet={isTablet} isMobileLandscape={(isMobileTablet && mobileLandscape === 90)}/>
    {/if}
</div>