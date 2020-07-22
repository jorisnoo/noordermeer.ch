<script>
    export default {
        async asyncData ({ $content }) {
            const en = await $content('en', 'index').fetch();
            return { en };
        },
    };
</script>

<template>
    <div class="typo-large px-1/3 mt-1/2">
        <nuxt-content
            :document="en"
        />
        <p class="typo-base mt-1/2">
            Zentralstr. 43, 8003 Zurich <br>
            <a href="https://www.linkedin.com/in/jorisnoo/" rel="noreferrer noopener nofollow">LinkedIn</a>
        </p>
    </div>
</template>
