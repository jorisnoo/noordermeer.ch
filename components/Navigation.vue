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
    </nav>
</template>
