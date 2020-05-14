<script>
    export default {
        name: 'Work',
        computed: {
            projects() {
                return this.$frontmatter.projects.filter(({hidden}) => !hidden);
            },
        },
    };
</script>

<template>
    <ul class="py-1/3 lg:py-0">
        <li
            v-for="(project, index) in projects"
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
</template>
