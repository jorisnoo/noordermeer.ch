<script>
    export default {
        name: 'Navigation',
        data() {
            return {
                links: [
                    {path: '/', label: 'Info'},
                    {path: '/about', label: 'Work'},
                    // {path: '/blog', label: 'Blog'},
                ],
            };
        },
    };
</script>

<template>
    <nav class="container my-8 mx-auto space-x-3 md:max-w-lg lg:max-w-3xl">
        <router-link
            v-for="link in links"
            :key="'navigation'+link.label"
            class="text-gray-500 hover:text-black"
            :to="link.path"
        >
            {{ link.label }}
        </router-link>
    </nav>
</template>
