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
    <div class="p-4 lg:flex lg:p-0">
        <div class="lg:max-w-sm">
            <span class="name mb-2/9 lg:hidden">Joris</span>
            <span class="name mb-2/9 lg:hidden">Noordermeer</span>
            <Navigation class="lg:sticky lg:top-0 lg:p-6"/>
        </div>
        <div class="p-1/3 lg:flex-grow mt-2/9 lg:p-6 lg:mt-0">
            <div class="container content lg:px-4">
                <slot><Content /></slot>
            </div>
        </div>
    </div>
</template>

<style>
    @import '../styles/styles.css';
</style>
