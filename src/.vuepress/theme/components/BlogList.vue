<script>
    export default {
        name: 'BlogList',
    };
</script>

<template>
    <div>
        <h1>Blog</h1>
        <ul>
            <li
                v-for="page in $pagination.pages"
                :key="'navigation'+page.path"
                class="my-2"
            >
                <router-link
                    :to="page.path"
                    class="hover:bg-orange-300"
                >
                    {{ page.title }}
                </router-link>
            </li>
        </ul>
    </div>
</template>
