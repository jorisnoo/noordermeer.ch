<script>
    export default {
        async asyncData ({ $content }) {
            const en = await $content('contact').fetch();
            return { en };
        },
        head () {
            return {
                title: 'Contact',
            };
        },
    };
</script>

<template>
    <div class="typo-large px-1/3 mt-1/2 selection-red">
        <nuxt-content
            :document="en"
            class="prose-large"
        />
    </div>
</template>
