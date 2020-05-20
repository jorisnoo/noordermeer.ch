<script>
    export default {
        name: 'Navigation',
        methods: {
            clicked() {
                console.log('clicked!')
            }
        }
    };
</script>

<template>
    <nav>
        <router-link
            to="/"
            class="round-link hover:bg-blue"
            exact-active-class="bg-blue"
        >
            Info
        </router-link>
        <router-link
            to="/work"
            class="round-link hover:bg-green"
            active-class="bg-green"
        >

                Work
        </router-link>
    </nav>
</template>
