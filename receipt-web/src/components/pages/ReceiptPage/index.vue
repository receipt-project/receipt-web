<template>
    <div class="row">
        <div class="col-12">
            <p v-if="notFound">
                Receipt #{{receiptId}} was not found
            </p>
            <receipt-items v-bind:items="items"/>
            <div style="margin-bottom: 20px"></div>
            <receipt-meta v-bind:meta="meta"/>
        </div>
    </div>
</template>

<script>
    import ReceiptMeta from "./ReceiptMeta";
    import ReceiptItems from "./ReceiptItems";
    import axios from "axios";

    export default {
        name: "ReceiptPage",
        props: ["receiptId"],
        data: function () {
            return {
                items: [],
                meta: {},
                notFound: false
            }
        },
        components: {
            ReceiptItems,
            ReceiptMeta
        },
        created: function () {
            axios
                    .put("/api/receipts", {ids: [this.receiptId]})
                    .then(result => {
                        let data = result.data;
                        if (data.length > 0) {
                            this.meta = data[0];
                        } else {
                            this.notFound = true;
                        }
                    });

            axios
                    .put("/api/items", {receiptIds: [this.receiptId]})
                    .then(result => {
                        this.items = result.data;
                    });

        }
    }
</script>

