<script>
    export default {
        async asyncData ({ $content }) {
            return {
                info: {
                    en: await $content('en/index').fetch(),
                    de: await $content('de/index').fetch(),
                    // jp: await $content('jp/index').fetch(),
                },
            };
        },
        data () {
            return {
                body: this.info ? this.info[this.$i18n.locale] : null,
            };
        },
        created () {
            this.body = this.info[this.$i18n.locale];
        },
        head () {
            return {
                titleTemplate: 'Joris Noordermeer — Web Development',
            };
        },
    };
</script>

<template>
    <div class="px-1/3 selection-blue">
        <nuxt-content
            :document="body"
            :key="'info'+$i18n.locale"
            class="prose prose-large"
            :class="[ $i18n.locale ]"
        />
    </div>
</template>
