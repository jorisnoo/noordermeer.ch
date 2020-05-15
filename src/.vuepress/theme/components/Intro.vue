<script>
    import intro from "../intro";

    export default {
        name: 'Intro',
        data() {
            return {
                isDragging: false,
            };
        },
        mounted() {
            intro(() => {
                this.isDragging = true;
                this.clearSelection();
            }, () => {
                this.isDragging = false;
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
    <div class="absolute overflow-hidden inset-0 z-10" :class="{'pointer-events-none': !isDragging}">
        <div id="debug" class="hidden"/>
        <div id="wall-bottom" class="h-1 w-screen"/>
        <div id="wall-left" class="h-wall w-1"/>
        <div id="wall-right" class="h-wall w-1"/>
        <span id="joris" class="name select-none">Joris</span>
        <span id="noordermeer" class="name select-none">Noordermeer</span>
        <span id="webdevelopment" class="name select-none">Web Development</span>
    </div>
</template>
