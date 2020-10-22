<script>
    export default {
        key: 'work',
        nuxtI18n: {
            paths: {
                en: '/work',
                de: '/projekte',
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
                projectsInCurrentLocale: this.projects ? this.projects[this.$i18n.locale] : null,
            };
        },
        computed: {
            openProject () {
                return this.projectsInCurrentLocale
                    ? Object.values(this.projectsInCurrentLocale).findIndex(entry => entry.slug === this.$route.params.slug)
                    : -1;
            },
        },
        // watch: {
        // openProject (openProject) {
        //     if (openProject > -1) {
        //         setTimeout(() => {
        //             this.$refs.headers[this.openProject].scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        //         }, 301);
        //     }
        // },
        // },
        created () {
            this.projectsInCurrentLocale = this.projects[this.$i18n.locale];
        },
        head () {
            return {
                title: this.$t('work'),
            };
        },
    };
</script>

<template>
    <div class="selection-green">
        <h1 class="sr-only">
            {{ $t('work') }}
        </h1>
        <article
            v-for="(project, index) in projectsInCurrentLocale"
            :key="'project'+project.name"
        >
            <h2
                :ref="'headers'"
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
                <nuxt-link :to="localePath({ params: { slug: (openProject === index) ? null : project.slug } })">
                    {{ project.title }}
                </nuxt-link>
            </h2>
            <slide-up-down :active="openProject === index" :duration="500">
                <div class="projectDescription px-1/3 pb-4 pt-2">
                    <nuxt-content class="typo-base prose prose-base" :document="project" />
                </div>
            </slide-up-down>
        </article>
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
