<script>
    export default {
        data () {
            return {
                init: false,
            };
        },
        mounted () {
            this.init = true;
        },
    };
</script>

<template>
    <div
        class="min-h-screen relative p-4 lg:py-6 delay-500 transition-opacity ease-out duration-1000"
        :class="{ 'opacity-0': !init }"
    >
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
