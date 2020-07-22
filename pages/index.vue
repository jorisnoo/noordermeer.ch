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
    <div class="typo-large px-1/3 mt-1/2">
        <nuxt-content
            :document="en"
            class="prose-large"
        />
        <p class="typo-base prose-base mt-1/2">
            Zentralstr. 43, 8003 Zurich <br>
            <a href="https://www.linkedin.com/in/jorisnoo/" rel="noreferrer noopener nofollow">LinkedIn</a>
        </p>
    </div>
</template>
