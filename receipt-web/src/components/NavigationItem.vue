<template>
    <li class="nav-item" v-bind:class="isActive ? 'active' : ''">
        <a class="nav-link" v-on:click="onClick" href="javascript:void(0);">
            {{text}}
        </a>
    </li>
</template>

<script>
    export default {
        name: "NavigationItem",
        props: {
            targetRoute: String,
            text: String
        },
        computed: {
            isActive: function () {
                return this.$route.path === this.targetRoute
            }
        },
        methods: {
            onClick: function () {
                this.$router.push(this.targetRoute)
            }
        }
    }

</script>
