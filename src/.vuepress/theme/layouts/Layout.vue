<script>
    import Navigation from "../components/Navigation";

    export default {
        name: 'Layout',
        components: {
            Navigation,
        },
        computed: {
            layout() {
                // Use properties from layout components extending this base layout
                // to toggle components / elements on the page
                return {
                    pageComponent: this.pageComponent || false,
                    showBackButton: this.showBackButton || false,
                };
            },
        },
    };
</script>

<template>
    <div>
        <Navigation />
        <div class="container mx-auto mt-8 md:max-w-lg lg:max-w-3xl">
            <Content />
            <component
                :is="layout.pageComponent"
                v-if="layout.pageComponent"
            />
            <template v-if="layout.showBackButton">
                <br>
                <a
                    class="cursor-pointer mt-10 text-gray-500 hover:text-black"
                    @click="$router.go(-1)"
                >Go Back</a>
            </template>
        </div>
    </div>
</template>

<style>
    @import '../styles/styles.css';
</style>
