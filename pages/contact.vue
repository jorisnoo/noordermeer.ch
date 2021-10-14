<script>
    export default {
        nuxtI18n: {
            paths: {
                en: '/contact',
                de: '/kontakt',
                ja: '/contact',
            },
        },
        data () {
            return {
                zurich: this.$t('zurich'),
                switzerland: this.$t('switzerland'),
                locale: this.$i18n.locale,
            };
        },
        head () {
            return {
                title: this.$t('contact'),
            };
        },
        methods: {
            plausible (event) {
                if (typeof plausible !== 'undefined') {
                    plausible(event);
                }
            },
        },
    };
</script>

<template>
    <main id="main" class="px-1/3 selection-red">
        <h1 class="sr-only">
            {{ $t('contact') }}
        </h1>
        <div class="prose prose-large">
            <address class="not-italic">
                <p>
                    noordermeer gmbh<br>
                    Zentralstr. 43<br>
                    8003 <span :class="[ locale ]">{{ zurich }}</span><br>
                    <span :class="[ locale ]">{{ switzerland }}</span>
                </p>
            </address>
            <p>
                <a href="mailto:contact@noordermeer.ch" @click="plausible('Clicked mail')">
                    contact@noordermeer.ch
                </a>
            </p>
            <ul>
                <li>
                    <a
                        href="https://www.linkedin.com/in/jorisnoo/"
                        rel="noreferrer noopener nofollow"
                        @click="plausible('Clicked Linkedin')"
                    >LinkedIn</a>
                </li>
                <li>
                    <a
                        href="https://www.github.com/jorisnoo/"
                        rel="noreferrer noopener nofollow"
                        @click="plausible('Clicked Github')"
                    >GitHub</a>
                </li>
            </ul>
        </div>
    </main>
</template>

<style scoped>
.ja {
    font-size: 0.9em;
}
</style>
