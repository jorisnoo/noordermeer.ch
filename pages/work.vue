<script>
    export default {
        async asyncData ({ $content }) {
            return {
                projects: {
                    en: await $content('en/projects').sortBy('date', 'desc').fetch(),
                    de: await $content('de/projects').sortBy('date', 'desc').fetch(),
                    jp: await $content('jp/projects').sortBy('date', 'desc').fetch(),
                },
            };
        },
        head () {
            return {
                title: 'Work',
            };
        },
    };
</script>

<template>
    <ul class="selection-green">
        <li
            v-for="(project, index) in projects[$i18n.locale]"
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
