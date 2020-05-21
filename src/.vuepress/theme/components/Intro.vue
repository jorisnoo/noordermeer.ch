<script>
    import runIntro from '../intro';
    // import { debounce } from 'throttle-debounce';

    export default {
        name: 'Intro',
        data() {
            return {
                showWebDevelopment: true,
                initialised: false,
                isDragging: false,
            };
        },
        mounted() {
            this.runIntro();
        },
        methods: {
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
                        removeWebdev: () => {
                            this.$emit('hide-webdev');
                            this.showWebDevelopment = false;
                        },
                        end: () => this.$emit('end'),
                    },
                });
                this.initialised = true;
            },
            clearSelection() {
                this.isDragging = true;
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
        class="absolute top-0 left-0 w-full h-full lg:fixed overflow-hidden lg:inset-0 z-10 intro-container touch-action-none"
        :class="{'opacity-0': !initialised, 'pointer-events-none': !isDragging }"
    >
        <!--<div id="debug" class="absolute" />-->
        <span
            ref="joris"
            class="name select-none pointer-events-auto"
        >Joris</span>
        <span
            ref="noordermeer"
            class="name select-none pointer-events-auto"
        >Noordermeer</span>
        <span
            v-show="showWebDevelopment"
            ref="webDevelopment"
            class="name select-none"
        >Web Development</span>
    </div>
</template>

<style scoped>
    .touch-action-none {
        touch-action: none;
    }
</style>
