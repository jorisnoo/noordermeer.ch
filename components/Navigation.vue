<script>
    export default {
        name: 'Navigation',
    };
</script>

<template>
    <nav class="navigation:flex justify-between">
        <div class="flex flex-wrap">
            <nuxt-link
                :to="localePath('/')"
                class="typo-large round-link hover:bg-blue"
                exact-active-class="bg-blue"
            >
                <span :class="[ $i18n.locale ]">{{ $t('info') }}</span>
            </nuxt-link>
            <nuxt-link
                :to="localePath('work')"
                class="typo-large round-link hover:bg-green"
                active-class="bg-green"
            >
                <span :class="[ $i18n.locale ]">{{ $t('work') }}</span>
            </nuxt-link>
            <nuxt-link
                :to="localePath('contact')"
                class="typo-large round-link hover:bg-red"
                active-class="bg-red"
            >
                <span :class="[ $i18n.locale ]">{{ $t('contact') }}</span>
            </nuxt-link>
        </div>
        <div class="flex">
            <nuxt-link
                :to="switchLocalePath('en')"
                class="typo-large round-link hover:bg-green"
                :class="{ 'bg-green': $i18n.locale === 'en' }"
            >
                En
            </nuxt-link>
            <nuxt-link
                :to="switchLocalePath('de')"
                class="typo-large round-link hover:bg-red"
                :class="{ 'bg-red': $i18n.locale === 'de' }"
            >
                De
            </nuxt-link>
            <nuxt-link
                :to="switchLocalePath('ja')"
                class="typo-large round-link hover:bg-blue"
                :class="{ 'bg-blue': $i18n.locale === 'ja' }"
            >
                <span class="ja">日本語</span>
            </nuxt-link>
        </div>
    </nav>
</template>

<style scoped>
    .ja {
        font-size: 0.9em;
    }
</style>
