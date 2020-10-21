<script>
    export default {
        key: 'work',
        nuxtI18n: {
            paths: {
                en: '/work/:slug',
                de: '/projekte/:slug',
                // jp: '/作品',
            },
        },
        async asyncData ({ $content }) {
            return {
                projects: {
                    en: await $content('en/projects').where({ disabled: { $ne: true } }).sortBy('date', 'desc').fetch(),
                    de: await $content('de/projects').where({ disabled: { $ne: true } }).sortBy('date', 'desc').fetch(),
                    // jp: await $content('jp/projects').where({ disabled: { $ne: true } }).sortBy('date', 'desc').fetch(),
                },
            };
        },
        data () {
            return {
                openProject: -1,
                projectsInCurrentLocale: this.projects ? this.projects[this.$i18n.locale] : null,
            };
        },
        watch: {
            '$route.params.slug' () {
                this.updateOpenProjectAccordingToRoute();
            },
        },
        created () {
            this.projectsInCurrentLocale = this.projects[this.$i18n.locale];
            if (this.$route.params.slug) {
                this.updateOpenProjectAccordingToRoute();
            }
        },
        methods: {
            updateOpenProjectAccordingToRoute () {
                this.openProject = Object.values(this.projectsInCurrentLocale).findIndex(entry => entry.slug === this.$route.params.slug);
            },
        },
        head () {
            return {
                title: this.$t('work'),
            };
        },
    };
</script>

<template>
    <div>
        <h1 class="sr-only">
            {{ $t('work') }}
        </h1>
        <ul class="selection-green">
            <li
                v-for="(project, index) in projectsInCurrentLocale"
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
                >
                    <nuxt-link :to="localePath((openProject === index) ? { name: 'work' } : { params: { slug: project.slug } })">
                        {{ project.title }}
                    </nuxt-link>
                </h2>
                <slide-up-down :active="openProject === index" :duration="400">
                    <div class="projectDescription px-1/3 pb-4 pt-2">
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
