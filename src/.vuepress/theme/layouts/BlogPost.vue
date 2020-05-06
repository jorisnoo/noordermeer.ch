<script>
    import Layout from "./Layout";
    import BlogList from "../components/BlogList";

    export default {
        name: 'BlogPost',
        components: {
            Layout,
        },
    };
</script>

<template>
    <Layout>
        <Content />
        <br>
        <a
            class="cursor-pointer mt-10 text-gray-500 hover:text-black"
            @click="$router.go(-1)"
        >Go Back</a>
    </Layout>
</template>
