<script>
    import intro from "../intro";

    export default {
        name: 'Intro',
        data() {
            return {
                isDragging: false,
                showWebdev: true,
            };
        },
        mounted() {
            intro({
                elements: {
                    joris: this.$refs['joris'],
                    noordermeer: this.$refs['noordermeer'],
                    webDevelopment: this.$refs['webDevelopment'],
                    wallLeft: this.$refs['wallLeft'],
                    wallRight: this.$refs['wallRight'],
                    wallBottom: this.$refs['wallBottom'],
                },
                callbacks: {
                    startdrag: () => {
                        this.isDragging = true;
                        this.clearSelection();
                    },
                    enddrag: () => {
                        this.isDragging = false;
                    },
                    removeWebdev: () => {
                        this.showWebdev = false;
                    },
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
        <!--<div id="debug" class="" />-->
        <div ref="wallBottom" class="h-1 w-screen" />
        <div ref="wallLeft" class="h-screen w-1" />
        <div ref="wallRight" class="h-screen w-1" />
        <span ref="joris" class="name select-none">Joris</span>
        <span ref="noordermeer" class="name select-none">Noordermeer</span>
        <span
            v-if="showWebdev"
            ref="webDevelopment"
            class="name select-none"
        >Web Development</span>
    </div>
</template>
