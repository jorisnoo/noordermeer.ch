<script>
    export default {
        data () {
            return {
                init: false,
            };
        },
        head () {
            return {
                htmlAttrs: {
                    lang: this.$i18n.locale,
                },
            };
        },
        computed: {
            mainId () {
                return this.$route.params.slug || 'main';
            },
        },
        mounted () {
            this.init = true;
        },
    };
</script>

<template>
    <div
        class="min-h-screen relative p-4 lg:py-6 transition-opacity ease-out duration-700"
        :class="{ 'opacity-0': !init }"
    >
        <div class="skip-links sr-only">
            <a :href="'#'+mainId">{{ $t('skip_link') }}</a>
        </div>
        <Blocks />
        <Navigation />
        <Nuxt class="content typo-large mt-1/2" />
        <BottomPlaceholder />
    </div>
</template>

<style>
    .content {
        max-width: 1500px;
    }
</style>
