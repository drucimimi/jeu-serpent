<script>
    import Icon from "./Icon.svelte"
    import Snake from "../utils/snake.js"

    export let snakee
    if(window.screen.width < 768){
        snakee = new Snake("right", [3,2],[2,2])
    } else {
        snakee = new Snake("right", [6,4],[5,4],[4,4],[3,4],[2,4])
    }
    const setDirectionSnake = direction => snakee.setDirection(direction)

</script>
<style>
    .controls-keyboard{
        position: relative;
        height: 100px;
        width: 100px;
        margin: 0 auto;
    }
    .arrows{
        margin: 0;
        padding: 0;
        background-color: transparent;
        border: none;
    }
    .arrow-up{
        position: absolute;
        top: 0;
        left: 50%;
    }
    .arrow-right{
        position: absolute;
        top: 50%;
        right: 0;
        translate: 50% -50%;
    }
    .arrow-down{
        position: absolute;
        bottom: 0;
        left: 50%;
    }
    .arrow-left{
        position: absolute;
        left: 0;
        top: 50%;
        translate: 50% -50%;
    }
</style>
<div class="controls-keyboard">
    <div class="arrow-up">
        <button class="arrows" on:click="{ () => setDirectionSnake('up')}"><Icon name="arrowUp"/></button>
    </div>
    <div class="arrow-right">
        <button class="arrows" on:click="{ () => setDirectionSnake('right')}"><Icon name="arrowRight"/></button>
    </div>
    <div class="arrow-down">
        <button class="arrows" on:click="{ () => setDirectionSnake('down')}"><Icon name="arrowDown"/></button>
    </div>
    <div class="arrow-left">
        <button class="arrows" on:click="{ () => setDirectionSnake('left')}"><Icon name="arrowLeft"/></button>
    </div>
</div>