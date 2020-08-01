<script>
    export default {
        name: 'Navigation',
    };
</script>

<template>
    <nav class="navigation:flex justify-between">
        <div class="flex">
            <nuxt-link
                to="/"
                class="typo-large round-link hover:bg-blue"
                exact-active-class="bg-blue"
            >
                Info
            </nuxt-link>
            <nuxt-link
                to="/work"
                class="typo-large round-link hover:bg-green"
                active-class="bg-green"
            >
                Work
            </nuxt-link>
            <nuxt-link
                to="/contact"
                class="typo-large round-link hover:bg-red"
                active-class="bg-red"
            >
                Contact
            </nuxt-link>
        </div>
        <div class="flex">
            <nuxt-link
                to="/"
                class="typo-large round-link hover:bg-blue"
            >
                En
            </nuxt-link>
            <nuxt-link
                to="/"
                class="typo-large round-link hover:bg-green"
            >
                De
            </nuxt-link>
            <nuxt-link
                to="/"
                class="typo-large round-link hover:bg-red"
            >
                <span class="jp">日本語</span>
            </nuxt-link>
        </div>
    </nav>
</template>

<style scoped>
    .jp {
        font-size: 0.9em;
        line-height: 1.111111111;
    }
</style>
