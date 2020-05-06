<script>
    import Layout from "./Layout";
    import BlogList from "../components/BlogList";

    export default {
        name: 'BlogIndex',
        components: {
            Layout,
            BlogList,
        },
    };
</script>

<template>
    <Layout>
        <Content />
        <BlogList />
    </Layout>
</template>
