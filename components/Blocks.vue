<script>
    import runIntro from '../plugins/blocks';

    export default {
        name: 'Blocks',
        data () {
            return {
                showWebDevelopment: true,
                initialised: false,
                isDragging: false,
            };
        },
        mounted () {
            this.runIntro();
        },
        methods: {
            runIntro () {
                runIntro({
                    elements: {
                        joris: this.$refs.joris,
                        noordermeer: this.$refs.noordermeer,
                        webDevelopment: this.$refs.webDevelopment,
                    },
                    callbacks: {
                        startdrag: this.startDrag,
                        enddrag: this.endDrag,
                        removeWebdev: this.removeWebdev,
                    },
                });
                this.initialised = true;
            },
            startDrag () {
                this.clearSelection();
                this.isDragging = true;
            },
            endDrag () {
                this.isDragging = false;
            },
            removeWebdev () {
                this.showWebDevelopment = false;
            },
            clearSelection () {
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
    <div>
        <span class="placeholder typo-large name-block">&nbsp;</span>
        <div
            class="absolute inset-0 overflow-hidden z-10 lg:fixed"
            :class="{'opacity-0': !initialised, 'pointer-events-none': !isDragging, 'touch-action-none': !isDragging }"
        >
            <span
                ref="joris"
                class="typo-large name-block select-none pointer-events-auto"
            >Joris</span>
            <span
                ref="noordermeer"
                class="typo-large name-block select-none pointer-events-auto"
            >Noordermeer</span>
            <span
                v-show="showWebDevelopment"
                ref="webDevelopment"
                class="typo-large name-block select-none"
            >Web Development</span>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
    .touch-action-none {
        touch-action: none;
    }

    .placeholder {
        @apply bg-transparent select-none;

        margin-bottom: 0.222222em;
    }

    @screen lg {
        .placeholder {
            @apply hidden;
        }
    }
</style>
