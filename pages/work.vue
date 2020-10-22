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
            currentSlug () {
                return this.$route.params.slug || null;
            },
            openProjectIndex () {
                return this.projectsInCurrentLocale && this.currentSlug
                    ? Object.values(this.projectsInCurrentLocale).findIndex(entry => entry.slug === this.currentSlug)
                    : -1;
            },
            currentProject () {
                return this.openProjectIndex > -1 && this.projectsInCurrentLocale
                    ? this.projectsInCurrentLocale[this.openProjectIndex]
                    : null;
            },
        },
        watch: {
            openProjectIndex (index) {
                if (index > -1 && this.projects) {
                    this.$store.dispatch('i18n/setRouteParams', {
                        de: { slug: this.projects.de[index].slug },
                        en: { slug: this.projects.en[index].slug },
                    });
                } else {
                    this.$store.dispatch('i18n/setRouteParams', {
                        de: { slug: null },
                        en: { slug: null },
                    });
                }
            },
        },
        created () {
            this.projectsInCurrentLocale = this.projects[this.$i18n.locale];
        },
        head () {
            return {
                title: this.currentProject ? this.currentProject.name : this.$t('work'),
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
            :key="'project-'+project.slug"
            :aria-labelledby="project.slug"
        >
            <h2
                :id="project.slug"
                class="round-link cursor-pointer"
                :class="{
                    'hover:bg-green': index%3 === 0,
                    'hover:bg-red': index%3 === 1,
                    'hover:bg-blue': index%3 === 2,
                    'bg-green': index%3 === 0 && openProjectIndex === index,
                    'bg-red': index%3 === 1 && openProjectIndex === index,
                    'bg-blue': index%3 === 2 && openProjectIndex === index,
                }"
            >
                <nuxt-link :to="localePath({ params: { slug: (openProjectIndex === index) ? null : projects[$i18n.locale][index].slug } })">
                    {{ project.title }}
                </nuxt-link>
            </h2>
            <client-only>
                <slide-up-down :active="openProjectIndex === index" :duration="500">
                    <div class="projectDescription px-1/3 pb-4 pt-2">
                        <nuxt-content class="typo-base prose prose-base" :document="project" />
                    </div>
                </slide-up-down>
                <div class="projectDescription px-1/3 pb-4 pt-2" slot="placeholder">
                    <nuxt-content class="typo-base prose prose-base" :document="project" />
                </div>
            </client-only>
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
