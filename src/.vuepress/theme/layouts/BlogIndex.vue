<script>
    import Layout from "./Layout";
    import BlogList from "../components/BlogList";

    export default {
        name: 'BlogIndex',
        components: {
            BlogList,
        },
        extends: Layout,
        data: () => ({
            pageComponent: 'BlogList',
        }),
    };
</script>
