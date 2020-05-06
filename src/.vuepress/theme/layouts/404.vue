<script>
    import Layout from "./Layout";

    export default {
        name: 'Error', // eslint-disable-line vue/match-component-file-name
        components: {
            Layout,
        },
        extends: Layout,
    };
</script>

<template>
    <Layout>
        <h1>404</h1>
        <p class="my-25">
            Looks like we've got some broken links.
        </p>
        <router-link to="/" class="typo-text-normal hover:text-blue">
            Take me home
        </router-link>
    </Layout>
</template>
