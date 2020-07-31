<script>
    export default {};
</script>

<template>
    <div class="wrapper min-h-screen relative p-4 lg:py-6">
        <Blocks />
        <Navigation />
        <Nuxt />
        <BottomPlaceholder />
    </div>
</template>

<style lang="postcss">
    .wrapper {
        max-width: 1320px;
    }
</style>
