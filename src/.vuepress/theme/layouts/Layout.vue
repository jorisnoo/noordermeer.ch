<script>
    import Intro from '../components/Intro';
    import Navigation from "../components/Navigation";
    import Work from "../pages/Work";

    export default {
        name: 'Layout',
        components: {
            Intro,
            Navigation,
            Work,
        },
        computed: {
            pageComponent() {
                return this.$frontmatter.page || false;
            },
        },
        created() {
            // Set a random text selection color
            let selectionColor = ['#f9325a', '#149646', '#1e50f0'][Math.floor(Math.random() * 3)];
            document.documentElement.style.setProperty('--selection-color', selectionColor);
        },
    };
</script>

<template>
    <div>
        <Intro />
        <div class="p-4 lg:flex lg:py-0">
            <div class="relative flex-shrink-0 lg:max-w-sm lg:min-h-screen lg:w-1/4">
                <span class="name mb-2/9 lg:hidden">Joris</span>
                <span class="name mb-2/9 lg:hidden">Noordermeer</span>
                <Navigation class="lg:sticky lg:top-0 lg:py-6" />
            </div>
            <div class="relative flex-col justify-between mt-2/9 pt-2 lg:p-6 lg:pb-0 lg:mt-0 lg:flex">
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
                    <span class="name bg-white">&nbsp;</span>
                </div>
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
