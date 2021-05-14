<script>
    export default {
        data () {
            return {
            };
        },
        head () {
            return {
                title: this.$t('page_not_found'),
                bodyAttrs: {
                    class: ['notfound'],
                },
            };
        },
        watch: {
            '$route' () {
                setTimeout(() => {
                    document.body.className = '';
                }, 100);
            },
        },
    };
</script>

<template>
    <div class="px-1/3 selection-red">
        <div class="prose prose-large sm:flex justify-between items-center">
            <img src="../assets/img/wolf.gif">
            <span class="text-center">{{ $t('page_not_found') }}</span>
            <img src="../assets/img/wolf.gif">
        </div>
    </div>
</template>

<style>
    .notfound {
        font-family: "Comic Sans MS", "Comic Sans", cursive !important;
        background: url("../assets/img/cclouds3.jpg");
    }
    @media (prefers-color-scheme: dark) {
        .notfound {
            background: url("../assets/img/alarm.gif");
        }
    }
    .notfound .content-fade {
        opacity: 0;
    }
</style>
