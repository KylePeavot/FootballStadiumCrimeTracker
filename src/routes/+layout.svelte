<svelte:head>
    <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>
</svelte:head>

<div class="container">
    <slot/>
</div>

<style>
    :global(body) {
        font-family: 'Roboto', Arial, serif;
    }

    .container {
        background: #f5f5f5;
        width: 100%;
        height: 100vh;
    }
</style>