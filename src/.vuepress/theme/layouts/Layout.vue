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
        data() {
            return {
                introHasPlayed: false,
            };
        },
        computed: {
            pageComponent() {
                return this.$frontmatter.page || false;
            },
            hideContentDuringIntro() {
                return this.$site.themeConfig.runIntroOnPages.includes(this.$page.path) && !this.introHasPlayed;
            },
        },
    };
</script>

<template>
    <div>
        <Intro @end="introHasPlayed = true" />
        <div
            class="transition-opacity duration-500 ease-in p-4 lg:flex lg:py-0"
            :class="{'opacity-0': hideContentDuringIntro}"
        >
            <div id="left-side" class="relative flex-shrink-0 lg:max-w-sm lg:min-h-screen lg:w-1/4">
                <span class="name mb-2/9 lg:hidden bg-transparent select-none">&nbsp;</span>
                <Navigation class="lg:sticky lg:top-0 lg:py-6" />
            </div>
            <div
                id="right-side"
                class="relative flex-col justify-between mt-2/9 pt-2 lg:p-6 lg:pb-0 lg:mt-0 lg:flex"
            >
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
                        class="container content p-1/3 lg:py-0 lg:px-4 selection-blue"
                    >
                        <slot><Content /></slot>
                    </div>
                </transition>

                <div class="sticky bottom-0 hidden pt-12 pb-6 lg:block content-fade">
                    <span class="name bg-transparent select-none">&nbsp;</span><br>
                    <span class="name bg-transparent select-none">&nbsp;</span>
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

    .content-fade {
        @apply bg-gradient-b-fade-out;
    }

    @media (prefers-color-scheme: dark) {
        .content-fade {
            @apply bg-gradient-b-fade-out-dark;
        }
    }
</style>
