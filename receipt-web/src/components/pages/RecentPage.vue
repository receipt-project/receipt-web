<template>
    <div class="container">
        <h2 class="mb-4">История моих покупок</h2>
        <receipt-card />
    </div>
</template>

<script>
import ReceiptCard from "@/components/ReceiptCard";
import axios from "axios";

export default {
    name: "RecentPage",
    data: function() {
        return {
            receipts: []
        };
    },
    components: {
        ReceiptCard
    },
    created: function() {
        axios
            .put("/api/receipts", {
                limit: 12,
                sort: "DATE",
                asc: false
            })
            .then(result => {
                this.receipts = result.data;
            });
    }
};
</script>

<style scoped></style>
