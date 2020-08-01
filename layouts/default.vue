<script>
    export default {};
</script>

<template>
    <div class="min-h-screen relative p-4 lg:py-6">
        <Blocks />
        <Navigation />
        <Nuxt class="content typo-large mt-1/2"/>
        <BottomPlaceholder />
    </div>
</template>

<style>
    .content {
        max-width: 1500px;
    }
</style>
