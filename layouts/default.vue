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
    <div class="wrapper min-h-screen relative p-4 lg:py-6 xl:container delay-500 transition-opacity ease-out duration-1000" :class="{ 'opacity-0': !init }">
        <Blocks />
        <Navigation />
        <Nuxt />
        <BottomPlaceholder />
    </div>
</template>

