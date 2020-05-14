<script>
    export default {
        name: 'Navigation',
    };
</script>

<template>
    <nav>
        <router-link
            to="/"
            class="round-link hover:bg-blue lg:mb-2"
            exact-active-class="bg-blue"
        >
            Info
        </router-link>
        <router-link
            to="/work"
            class="round-link hover:bg-green lg:mb-2"
            active-class="bg-green"
        >
            Work
        </router-link>
    </nav>
</template>
