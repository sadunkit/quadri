<script>
    export let fps = 0;
</script>

<div class="debug-area">
    <h1>Debugger</h1>
    <p>FPS: {fps.toFixed(2)}</p>
</div>

<style>
    .debug-area {
        position: fixed;
        top: 0;
        right: 0;
        background-color: rgba(29, 18, 94, 255);
        padding: 1rem;
        border: 1px solid black;
        color: #fafafa;
    }
</style>