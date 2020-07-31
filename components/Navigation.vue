<script>
    export default {
        name: 'Navigation',
    };
</script>

<template>
    <nav>
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
    </nav>
</template>
