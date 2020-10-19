<script>
    export default {
        nuxtI18n: {
            paths: {
                en: '/contact',
                de: '/kontakt',
                // jp: '/連絡',
            },
        },
        data () {
            return {
                zurich: this.$t('zurich'),
                switzerland: this.$t('switzerland'),
            };
        },
        created () {},
        head () {
            return {
                title: 'Contact',
            };
        },
    };
</script>

<template>
    <div class="px-1/3 selection-red">
        <div class="prose prose-large">
            <p>
                noordermeer gmbh<br>
                Zentralstr. 43<br>
                8003 {{ zurich }}<br>
                {{ switzerland }}
            </p>
            <p>
                <a href="mailto:contact@noordermeer.ch">contact@noordermeer.ch</a>
<!--                    <span class="md:hidden">E-Mail</span>-->

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
