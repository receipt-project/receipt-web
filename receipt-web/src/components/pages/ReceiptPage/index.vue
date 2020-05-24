<template>
    <div class="container">
        <div class="row" v-if="notFound">
            <div class="col-12 col-sm-8">
                <p>
                    Receipt #{{receiptId}} was not found
                </p>
            </div>
        </div>
        <div class="row" v-else>
            <div class="col-12">
                <receipt-items :items="items"/>
                <div style="margin-bottom: 20px"></div>
                <receipt-meta :meta="meta"/>
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
        data() {
            return {
                items: [],
                meta: {}
            }
        },
        computed: {
            notFound() {
                return this.receiptId && Object.keys(this.meta).length === 0;
            }
        },
        components: {
            ReceiptItems,
            ReceiptMeta
        },
        watch: {
            receiptId(newValue, oldValue) {
                if (newValue && newValue !== oldValue) {
                    this.$router.replace(`/receipt/${newValue}`);
                    this.reloadReceipt();
                }
            }
        },
        methods: {
            reloadReceipt() {
                axios.put("/api/receipts", {ids: [this.receiptId]})
                        .then(result => {
                            let data = result.data;
                            if (data.length > 0) {
                                this.meta = data[0];
                            } else {
                                this.meta = {};
                            }
                        });

                axios.put("/api/items", {receiptIds: [this.receiptId]})
                        .then(result => {
                            this.items = result.data;
                        });
            }
        },
        created() {
            this.reloadReceipt();
        }
    }
</script>
