<script>
    export default {
        async asyncData ({ $content }) {
            const en = await $content('english').fetch();
            return { en };
        },
        head () {
            return {
                titleTemplate: 'Joris Noordermeer — Web Development',
            };
        },
    };
</script>

<template>
    <div class="px-1/3 selection-blue">
        <nuxt-content
            :document="en"
            class="prose-large"
        />
    </div>
</template>
