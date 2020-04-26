<template>
    <nav class="navbar navbar-expand-lg navbar-expand-md navbar-dark bg-navbar" style="margin-bottom: 20px;">
        <b-button class="navbar-toggler"  v-b-toggle.navbarToggler>
            <span class="navbar-toggler-icon"/>
        </b-button>
        <b-collapse class="collapse navbar-collapse  align-items-baseline" id="navbarToggler">
            <a class="navbar-brand" href="/">Receipt</a>
            <ul class="navbar-nav align-items-start mt-2 mt-lg-0">
                <NavigationItem target-route="/" text="Получить чек"/>
                <NavigationItem target-route="/recent" text="История"/>
                <NavigationItem target-route="https://github.com/receipt-project/" text="GitHub"/>
            </ul>
        </b-collapse>
    </nav>
</template>

<script>
    import NavigationItem from "@/components/NavigationItem";

    export default {
        name: "NavigationBar",
        components: {
            NavigationItem
        }
    }
</script>

<style scoped>

</style>
