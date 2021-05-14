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
                titleTemplate: 'Joris Noordermeer — Web Development',
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
            {{ $t('info') }}
        </h1>
        <nuxt-content
            :key="'info'+locale"
            :document="body"
            class="prose prose-large"
            :class="[ locale ]"
        />
    </main>
</template>
