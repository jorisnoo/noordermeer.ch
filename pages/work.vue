<script>
    export default {
        nuxtI18n: {
            paths: {
                en: '/work',
                de: '/projekte',
                jp: '/作品',
            },
        },
        async asyncData ({ $content }) {
            return {
                projects: {
                    en: await $content('en/projects').sortBy('date', 'desc').fetch(),
                    de: await $content('de/projects').sortBy('date', 'desc').fetch(),
                    jp: await $content('jp/projects').sortBy('date', 'desc').fetch(),
                },
            };
        },
        data () {
            return {
                openProject: -1,
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
    <div>
        <h1 class="sr-only">
<!--            {{ $t('Projects') }}-->
        </h1>
        <ul class="selection-green">
            <li
                v-for="(project, index) in projects[$i18n.locale]"
                :key="'project'+project.name"
            >
                <h2
                    class="round-link cursor-pointer"
                    :class="{
                        'hover:bg-green': index%3 === 0,
                        'hover:bg-red': index%3 === 1,
                        'hover:bg-blue': index%3 === 2,
                        'bg-green': index%3 === 0 && openProject === index,
                        'bg-red': index%3 === 1 && openProject === index,
                        'bg-blue': index%3 === 2 && openProject === index,
                    }"
                    @click="openProject = (openProject === index) ? -1 : index"
                >
                    {{ project.title }}
                </h2>
                <slide-up-down :active="openProject === index" :duration="200">
                    <div class="projectDescription px-1/3 pb-4">
                        <nuxt-content class="typo-base prose prose-base" :document="project" />
                    </div>
                </slide-up-down>
            </li>
        </ul>
    </div>
</template>

<style>
    .projectDescription {
        max-width: 1024px;
    }

    .projectDescription p {
        margin-bottom: 1em;
    }

    .projectDescription p:last-of-type {
        margin-bottom: 0.5em;
    }
</style>
