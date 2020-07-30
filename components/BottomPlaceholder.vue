<script>
    export default {
        name: 'BottomPlaceholder',
    };
</script>

<template>
    <div class="sticky bottom-0 hidden pt-12 pb-6 lg:block content-fade">
        <span class="typo-large name-block bg-transparent select-none">&nbsp;</span>
    </div>
</template>

<style lang="postcss" scoped>
    .content-fade {
        @apply bg-gradient-b-fade-out;
    }

    @media (prefers-color-scheme: dark) {
        .content-fade {
            @apply bg-gradient-b-fade-out-dark;
        }
    }
</style>
