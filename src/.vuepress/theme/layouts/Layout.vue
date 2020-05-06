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
    <div>
        <Navigation />
        <div class="container mx-auto mt-8 md:max-w-lg lg:max-w-3xl">
            <slot>
                <Content />
            </slot>
        </div>
    </div>
</template>

<style>
    @import '../styles/styles.css';
</style>
