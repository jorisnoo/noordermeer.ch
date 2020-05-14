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
    <div class="p-4 lg:flex lg:p-6">
        <div class="lg:max-w-sm">
            <span class="name mb-2/9 lg:hidden">Joris</span>
            <span class="name mb-2/9 lg:hidden">Noordermeer</span>
            <Navigation />
        </div>
        <div class="p-1/3 mt-2/9 flex-grow lg:p-0 lg:mt-0">
            <div class="content container lg:px-4">
                <slot><Content /></slot>
            </div>
        </div>
    </div>
</template>

<style>
    @import '../styles/styles.css';
</style>
