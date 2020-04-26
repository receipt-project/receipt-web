<template>
    <div id="app">
        <navigation-bar/>
        <router-view/>
    </div>
</template>

<script>
    import NavigationBar from "@/components/NavigationBar";
    import "./assets/styles/styles.css";

    export default {
        name: 'app',
        components: {
            NavigationBar
        }
    }
</script>
