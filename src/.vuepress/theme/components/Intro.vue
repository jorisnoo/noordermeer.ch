<script>
    import runIntro from '../intro';
    import { debounce } from 'throttle-debounce';

    export default {
        name: 'Intro',
        data() {
            return {
                showWebdev: true,
                introHasRun: false,
                initialised: false,
                isDragging: false,
            };
        },
        mounted() {
            if(this.$site.themeConfig.runIntroOnPages.includes(this.$page.path)) {
                // Run the intro on mobile and desktop on these pages
                this.runIntro();
            } else if (window.innerWidth >= 1024) {
                // Run the intro on desktop, but show content instantly
                // on all other pages
                this.runIntro();
                this.$emit('end');
            } else {
                // Do only run intro on other pages if the window
                // is being resized
                window.addEventListener('resize', this.checkIfIntroShouldRun);
                this.$emit('end');
            }
        },
        methods: {
            checkIfIntroShouldRun: debounce(200, function() {
                if(window.innerWidth >= 1024) {
                    this.runIntro();
                    window.removeEventListener('resize', this.checkIfIntroShouldRun);
                }
            }),
            runIntro() {
                runIntro({
                    elements: {
                        joris: this.$refs['joris'],
                        noordermeer: this.$refs['noordermeer'],
                        webDevelopment: this.$refs['webDevelopment'],
                    },
                    callbacks: {
                        startdrag: this.clearSelection,
                        enddrag: () => this.isDragging = false,
                        removeWebdev: () => this.showWebdev = false,
                        end: () => this.$emit('end'),
                        endOnMobile: () => this.introHasRun = true,
                    },
                });
                this.initialised = true;
            },
            clearSelection() {
                // this.isDragging = true;
                if (window.getSelection) {
                    window.getSelection().removeAllRanges();
                } else if (document.selection) {
                    document.selection.empty();
                }
            },
        },
    };
</script>

<template>
    <div
        class="fixed overflow-hidden inset-0 z-10 intro-container touch-action-none"
        :class="{'opacity-0': !initialised, 'pointer-events-none': !isDragging }"
    >
<!--        {{ isDragging }}-->
                <div id="debug" class="" />
        <span
            ref="joris"
            class="name select-none pointer-events-auto"
        >Joris</span>
        <span
            ref="noordermeer"
            class="name select-none pointer-events-auto"
        >Noordermeer</span>
        <span
            v-if="showWebdev"
            ref="webDevelopment"
            class="name select-none"
        >Web Development</span>
    </div>
</template>

<style>
    .touch-action-none {
        touch-action: none;
    }
</style>
