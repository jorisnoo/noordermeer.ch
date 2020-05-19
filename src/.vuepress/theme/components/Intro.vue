<script>
    import runIntro from "../intro";

    export default {
        name: 'Intro',
        data() {
            return {
                isDragging: false,
                showWebdev: true,
                introHasRun: false,
            };
        },
        mounted() {
            runIntro({
                elements: {
                    joris: this.$refs['joris'],
                    noordermeer: this.$refs['noordermeer'],
                    webDevelopment: this.$refs['webDevelopment'],
                },
                callbacks: {
                    startdrag: () => {
                        this.isDragging = true;
                        this.clearSelection();
                    },
                    enddrag: () => this.isDragging = false,
                    removeWebdev: () => this.showWebdev = false,
                    end: () => this.$emit('end'),
                    endOnMobile: () => this.introHasRun = true,
                },
            });
        },
        methods: {
            clearSelection() {
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
    <div class="fixed overflow-hidden inset-0 z-10" :class="{'pointer-events-none': !isDragging}">
<!--        <div id="debug" class="" />-->
        <span
            ref="joris"
            class="name select-none"
            :class="[introHasRun ? 'hidden lg:inline-block' : '']"
        >Joris</span>
        <span
            ref="noordermeer"
            class="name select-none"
            :class="[introHasRun ? 'hidden lg:inline-block' : '']"
        >Noordermeer</span>
        <span
            v-if="showWebdev"
            ref="webDevelopment"
            class="name select-none"
        >Web Development</span>
    </div>
</template>
