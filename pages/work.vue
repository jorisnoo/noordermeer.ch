<script>
    export default {
        // async asyncData ({ $content }) {
        //     const projects = await $content('en', 'projects').fetch();
        //     return { projects };
        // },
    };
</script>

<template>
    <ul class="py-1/3 selection-green">
        <!--        <li-->
        <!--            v-for="(project, index) in projects"-->
        <!--            :key="'project'+project.name"-->
        <!--        >-->
        <!--            <a-->
        <!--                class="round-link mb-2 lg:mb-0"-->
        <!--                :class="{-->
        <!--                    'hover:bg-green': index%3 === 0,-->
        <!--                    'hover:bg-red': index%3 === 1,-->
        <!--                    'hover:bg-blue': index%3 === 2,-->
        <!--                }"-->
        <!--                :href="project.url"-->
        <!--                rel="noopener"-->
        <!--                target="_blank"-->
        <!--            >-->
        <!--                {{ project.name }}-->
        <!--            </a>-->
        <!--        </li>-->
    </ul>
</template>
