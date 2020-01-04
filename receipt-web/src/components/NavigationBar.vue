<template>
    <nav class="navbar navbar-expand-lg navbar-expand-md navbar-dark bg-dark" style="margin-bottom: 20px;">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler"
                aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"/>
        </button>
        <div class="collapse navbar-collapse" id="navbarToggler">
            <a class="navbar-brand" href="/">Receipt</a>
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <NavigationItem target-route="/" text="Получить чек"/>
                <NavigationItem target-route="/recent" text="История"/>
                <NavigationItem target-route="https://github.com/receipt-project/" text="GitHub"/>
            </ul>
        </div>
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
