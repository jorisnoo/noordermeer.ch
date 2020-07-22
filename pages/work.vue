<script>
    export default {
        async asyncData ({ $content }) {
            const projects = await $content('projects').sortBy('date', 'desc').fetch();
            return {
                projects,
            };
        },
    };
</script>

<template>
    <ul class="typo-large mt-1/2 selection-green">
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
