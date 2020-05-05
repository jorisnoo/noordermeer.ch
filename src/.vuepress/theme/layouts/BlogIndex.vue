<script>
    import Layout from "./Layout";
    import BlogList from "../components/BlogList";

    export default {
        name: 'BlogIndex',
        extends: Layout,
        components: {
            BlogList,
        },
        data: () => ({
            pageComponent: 'BlogList',
        }),
    };
</script>
