<script>
    export let title
    export let openModal = false
    export let modalGame = false
</script>

<style>
    .modal{
        border-radius: 1rem;
        background-color: #212121;
        color: #eee;
        padding: 1rem 1.5rem;
        margin: 2rem 0;
    }
    .modal-header h1 {
        font-size: 1.6em;
        line-height: 1.1;
    }
    .modal-body{
        max-width: 360px;
        font-size: 0.8em;
        word-break: break-all;
    }
    @media screen and (min-width: 768px) {
        h1{
            font-size: 3.2em;
        }
        .modal-body{
            max-width: 720px;
            font-size: 1.6em;
            word-break: unset;
        }
    }
    .modal-game{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(33, 33, 33, 0.99);
        color: #f9f9f9;
        z-index: 1;
    }
    .modal-game .modal-content{
        display: grid;
        height: 100%;
        place-items: center;
    }
</style>

{#if openModal}
    <div class= {modalGame ? "modal-game":""}>
        <div class="modal-content">
            <div class="modal">
                <div class="modal-header">
                    <h1>{title}</h1>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                {#if $$slots.btnPlay}
                    <div class="footer">
                        <slot name="btnPlay"></slot>
                    </div>
                {/if}
            </div>
        </div>
    </div>

{/if}