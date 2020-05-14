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
        <p>
            Looks like we've got some broken links.
        </p>
        <router-link to="/">
            Take me home
        </router-link>
    </Layout>
</template>
