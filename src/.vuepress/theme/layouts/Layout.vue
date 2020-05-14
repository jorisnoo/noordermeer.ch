<script>
    import Navigation from "../components/Navigation";

    export default {
        name: 'Layout',
        components: {
            Navigation,
        },
    };
</script>

<template>
    <div class="p-4 lg:flex lg:py-0">
        <div class="lg:max-w-sm lg:flex lg:flex-col-reverse lg:justify-between">
            <div class="lg:py-6 lg:sticky lg:bottom-0">
                <span class="name mb-2/9 lg:mb-0">Joris</span>
                <span class="name mb-2/9 lg:hidden">Noordermeer</span>
            </div>
            <Navigation class="lg:sticky lg:top-0 lg:py-6"/>
        </div>
        <div class="p-1/3 mt-2/9 lg:p-6 lg:pb-0 lg:mt-0 lg:flex-grow lg:flex lg:flex-col lg:justify-between">
            <div class="container content lg:px-4">
                <slot><Content /></slot>
            </div>
            <div class="hidden lg:block sticky bottom-0 pb-6">
                <span class="name">Noordermeer</span>
            </div>
        </div>
    </div>
</template>

<style>
    @import '../styles/styles.css';
</style>
