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
    <div class="p-4 lg:flex">
        <div>
            <span class="name mb-2/9 lg:hidden">Joris</span>
            <span class="name mb-2/9 lg:hidden">Noordermeer</span>
            <Navigation />
        </div>
        <div class="content p-1/3 mt-2/9">
            <slot><Content /></slot>
        </div>
    </div>
</template>

<style>
    @import '../styles/styles.css';
</style>
