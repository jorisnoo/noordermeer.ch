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
    };
</script>

<template>
    <div class="px-1/3 selection-red">
        <h1 class="sr-only">
            {{ $t('contact') }}
        </h1>
        <div class="prose prose-large">
            <p>
                noordermeer gmbh<br>
                Zentralstr. 43<br>
                8003 <span :class="[ locale ]">{{ zurich }}</span><br>
                <span :class="[ locale ]">{{ switzerland }}</span>
            </p>
            <p>
                <a href="mailto:contact@noordermeer.ch">
                    contact@noordermeer.ch
                </a>
            </p>
            <p>
                <a
                    href="https://www.linkedin.com/in/jorisnoo/"
                    rel="noreferrer noopener nofollow"
                    target="_blank"
                >LinkedIn</a>
            </p>
        </div>
    </div>
</template>

<style scoped>
    .ja {
        font-size: 0.9em;
    }
</style>
