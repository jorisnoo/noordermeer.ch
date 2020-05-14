<script>
    import Navigation from "../components/Navigation";
    import Work from "../pages/Work";

    export default {
        name: 'Layout',
        components: {
            Navigation,
            Work,
        },
        computed: {
            pageComponent() {
                return this.$frontmatter.page || false;
            },
        },
    };
</script>

<template>
    <div class="p-4 lg:flex lg:py-0">
        <div class="flex-col-reverse justify-between flex-shrink-0 lg:max-w-sm lg:min-h-screen lg:w-1/4 lg:flex">
            <div class="lg:py-6 lg:sticky lg:bottom-0">
                <span class="name mb-2/9 lg:mb-0">Joris</span>
                <span class="name mb-2/9 lg:hidden">Noordermeer</span>
            </div>
            <Navigation class="lg:sticky lg:top-0 lg:py-6" />
        </div>
        <div class="flex-col justify-between mt-2/9 lg:p-6 lg:pb-0 lg:mt-0 lg:flex">
            <transition
                name="fade"
                mode="out-in"
            >
                <component
                    :is="pageComponent"
                    v-if="pageComponent"
                    :key="$page.key"
                />
                <div
                    v-else
                    :key="$page.key"
                    class="container content p-1/3 lg:py-0 lg:px-4"
                >
                    <slot><Content /></slot>
                </div>
            </transition>
            <div class="sticky bottom-0 hidden pt-12 pb-6 lg:block bg-gradient-b-fade-out">
                <span class="name">Noordermeer</span>
            </div>
        </div>
    </div>
</template>

<style>
    @import '../styles/styles.css';

    .fade-enter-active, .fade-leave-active {
        @apply transition-opacity duration-100 ease-in;
    }
    .fade-enter, .fade-leave-to {
        @apply opacity-0;
    }
</style>
