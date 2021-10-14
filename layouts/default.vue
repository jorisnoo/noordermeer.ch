<script>
    export default {
        data () {
            return {
                // setting this to true disables the fade-in
                init: false,
                jaFontLoaded: false,
            };
        },
        head () {
            const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true });
            return {
                htmlAttrs: i18nHead.htmlAttrs,
                meta: [
                    {
                        hid: 'og:url',
                        name: 'og:url',
                        content: 'https://noordermeer.ch' + this.$route.fullPath,
                    },
                    ...i18nHead.meta,
                ],
                link: i18nHead.link,
            };
        },
        computed: {
            mainId () {
                return this.$route.params.slug || 'main';
            },
        },
        watch: {
            '$i18n.locale' (locale) {
                this.checkLocale(locale);
            },
        },
        mounted () {
            this.init = true;
            this.checkLocale(this.$i18n.locale);
        },
        methods: {
            checkLocale (locale) {
                if (!this.jaFontLoaded && locale === 'ja') {
                    const jaFont = new FontFace(
                        'Noto Sans JP',
                        'local(\'Noto Sans Japanese Medium\'), local(\'NotoSansJapanese-Medium\'), url(\'/fonts/noto-sans-jp-v36-japanese-500.woff2\') format(\'woff2\'), url(\'/fonts/noto-sans-jp-v36-japanese-500.woff\') format(\'woff\')',
                        { weight: 500 },
                    );
                    jaFont.load().then(function (loadedFont) {
                        document.fonts.add(loadedFont);
                    });
                }
            },
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
