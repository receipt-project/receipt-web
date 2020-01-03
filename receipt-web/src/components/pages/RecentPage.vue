<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-3 col-md-4 col-sm-6 col-12" v-for="receipt in receipts" v-bind:key="receipt">
                <receipt-card v-bind:receipt="receipt"/>
            </div>
        </div>
    </div>
</template>

<script>
    import ReceiptCard from "@/components/ReceiptCard";
    import axios from "axios";

    export default {
        name: "RecentPage",
        data: function () {
            return {
                receipts: []
            }
        },
        components: {
            ReceiptCard
        },
        created: function () {
            axios.put("/api/receipts",
                    {
                        limit: 12,
                        sort: "DATE",
                        asc: false
                    })
            .then(result => {
                this.receipts = result.data;
            })
        }
    }
</script>

<style scoped>

</style>
