<template>
    <div id="app">
        <nav class="navbar navbar-expand-lg navbar-expand-md navbar-dark bg-dark" style="margin-bottom: 20px;">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                <a class="navbar-brand" href="/">Receipt</a>
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <HeaderItem target-route="/test" text="Test"/>
                    <HeaderItem target-route="/" text="Найти чек"/>
                    <HeaderItem target-route="/" text="Чек"/>
                    <HeaderItem target-route="/recent" text="История"/>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
    // import HelloWorld from './components/HelloWorld.vue'
    // import ReceiptCard from "./components/ReceiptCard";
    // import ReceiptMeta from "./components/ReceiptMeta";

    import HeaderItem from "./components/HeaderItem";

    export default {
        name: 'app',
        components: {
            HeaderItem
        }
    }
</script>
