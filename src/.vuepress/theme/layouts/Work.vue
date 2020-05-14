<script>
    import Layout from "./Layout";
    export default {
        name: 'Work',
        components: {
            Layout,
        },
    };
</script>

<template>
    <Layout>
        <ul class="py-1/3 lg:py-0">
            <li
                v-for="(project, index) in $frontmatter.projects"
                :key="'project'+project.name"
            >
                <a
                    class="round-link"
                    :class="{
                        'hover:bg-green': index%3 === 0,
                        'hover:bg-red': index%3 === 1,
                        'hover:bg-blue': index%3 === 2,
                    }"
                    :href="project.url"
                    rel="noopener"
                    target="_blank"
                >
                    {{ project.name }}
                </a>
            </li>
        </ul>
    </Layout>
</template>
