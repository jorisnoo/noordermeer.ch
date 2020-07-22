<script>
    export default {
        async asyncData ({ $content }) {
            const en = await $content('en', 'index').fetch();
            return { en };
        },
    };
</script>

<template>
    <div class="typo-large px-1/3">
        <nuxt-content
            :document="en"
            class=""
        />
        <p class="address typo-base">
            Zentralstr. 43, 8003 Zurich <br>
            <a href="https://www.linkedin.com/in/jorisnoo/" rel="noreferrer noopener nofollow">LinkedIn</a>
        </p>
    </div>
</template>

<style scoped lang="postcss">
    .address {
        margin-top: 0.5em;
    }
</style>
