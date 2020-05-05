<script>
    import Navigation from "../components/Navigation";

    export default {
        name: 'Layout',
        components: {
            Navigation,
        },
        computed: {
            pageComponnentToDisplay() {
                return this.pageComponent || false;
            }
        }
    };
</script>

<template>
    <div>
        <Navigation/>
        <div class="container mx-auto mt-8 md:max-w-lg lg:max-w-3xl">
            <Content />
            <component
                v-if="pageComponnentToDisplay"
                :is="pageComponnentToDisplay"
            />
        </div>
    </div>
</template>

<style>
    @import '../styles/styles.css';
</style>
