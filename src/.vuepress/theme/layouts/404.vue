<script>
    import Layout from "./Layout";
    import Navigation from "../components/Navigation";

    export default {
        name: 'Error', // eslint-disable-line vue/match-component-file-name
        components: {
            Navigation,
        },
        extends: Layout,
    };
</script>

<template>
    <div>
        <Navigation />
        <div class="container mx-auto mt-8 md:max-w-lg lg:max-w-3xl">
            <h1>404</h1>
            <p class="my-25">
                Looks like we've got some broken links.
            </p>
            <router-link to="/" class="typo-text-normal hover:text-blue">
                Take me home
            </router-link>
        </div>
    </div>
</template>
