<template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-sm-8">
                <form class="form-inline" v-on:submit.prevent>
                    <label class="sr-only" for="ReceiptPageReceiptIdInput">Name</label>
                    <input type="text"
                           class="form-control mb-2 mr-sm-2"
                           id="ReceiptPageReceiptIdInput"
                           v-model="receiptId"
                           placeholder="Receipt ID">
                </form>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-sm-8">
                <p v-if="notFound">
                    Receipt #{{receiptId}} was not found
                </p>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <receipt-items v-bind:items="items"/>
                <div style="margin-bottom: 20px"></div>
                <receipt-meta v-bind:meta="meta"/>
            </div>
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
                meta: {}
            }
        },
        computed: {
            notFound: function () {
                return this.receiptId && Object.keys(this.meta).length === 0;
            }
        },
        components: {
            ReceiptItems,
            ReceiptMeta
        },
        watch: {
            receiptId: function (newValue, oldValue) {
                if (newValue && newValue !== oldValue) {
                    this.$router.replace(`/receipt/${newValue}`);
                    this.reloadReceipt();
                }
            }
        },
        methods: {
            reloadReceipt: function () {
                axios
                        .put("/api/receipts", {ids: [this.receiptId]})
                        .then(result => {
                            let data = result.data;
                            if (data.length > 0) {
                                this.meta = data[0];
                            } else {
                                this.meta = {};
                            }
                        });

                axios
                        .put("/api/items", {receiptIds: [this.receiptId]})
                        .then(result => {
                            this.items = result.data;
                        });
            }
        },
        created: function () {
            this.reloadReceipt();
        }
    }
</script>

