<script>
    import Layout from "./Layout";
    import BlogList from "../components/BlogList";

    export default {
        name: 'Blog',
        extends: Layout,
        components: {
            BlogList,
        },
        data: () => ({
            pageComponent: 'BlogList',
        }),
        // computed: {
        //     pageComponent() {
        //         return 'touring-page';
        //     },
        // },
    };
</script>
