<script>
    export default {
        async asyncData ({ $content }) {
            return {
                info: {
                    en: await $content('en/index').fetch(),
                    de: await $content('de/index').fetch(),
                    ja: await $content('ja/index').fetch(),
                },
            };
        },
        data () {
            return {
                body: this.info ? this.info[this.$i18n.locale] : null,
                locale: this.$i18n.locale,
            };
        },
        head () {
            return {
                titleTemplate: this.info[this.$i18n.locale].pageTitle,
                meta: [
                    { hid: 'description', name: 'description', property: 'description', content: this.info[this.$i18n.locale].description },
                    { hid: 'og:description', name: 'og:description', property: 'og:description', content: this.info[this.$i18n.locale].description },
                ],
            };
        },
        created () {
            this.body = this.info[this.$i18n.locale];
        },
    };
</script>

<template>
    <main id="main" class="px-1/3 selection-blue">
        <h1 class="sr-only">
            {{ info[$i18n.locale].hiddenTitle }}
        </h1>
        <nuxt-content
            :key="'info'+locale"
            :document="body"
            class="prose prose-large"
            :class="[ locale ]"
        />
    </main>
</template>
