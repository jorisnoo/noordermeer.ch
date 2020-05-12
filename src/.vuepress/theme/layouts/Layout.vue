<script>
    import Navigation from "../components/Navigation";

    export default {
        name: 'Layout',
        components: {
            Navigation,
        },
    };
</script>

<template>
    <div class="p-4 flex flex-col justify-center">
        <div class="inline-block">
            <span class="name mb-2">Joris</span>
            <span class="name mb-2">Noordermeer</span>
            <Navigation />
        </div>
        <div class="p-2 mt-2">
            <slot><Content /></slot>
        </div>
    </div>
</template>

<style>
    @import '../styles/styles.css';
</style>
