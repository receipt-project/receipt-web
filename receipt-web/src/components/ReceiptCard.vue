<template>
    <div class="card" v-bind:class="cardStyle" style="margin-bottom: 20px;">
        <div class="card-header">{{receipt.place}}</div>
        <div class="card-body">
            <p class="card-text">
                {{date.format("DD.MM.YYYY HH:mm")}}
            </p>
            <p class="card-text">
                {{receipt.sum}} рублей.
            </p>
            <a v-bind:href="href" class="btn btn-primary">Открыть</a>
        </div>
    </div>
</template>

<script>
    import {RECEIPT_DATETIME_FORMAT} from "@/components/utils/time.js"
    import moment from "moment"

    export default {
        name: 'ReceiptCard',
        props: {
            receipt: {
                type: Object,
                default: () => {}
            }
        },
        computed: {
            date: function () {
                return moment(this.receipt.date, "YYYY-MM-DD'T'HH:mm:ss");
            },
            href: function () {
                let dateStr = this.date.format(RECEIPT_DATETIME_FORMAT);
                return `/?fn=${this.receipt.fn}&i=${this.receipt.fd}&fp=${this.receipt.fp}&s=${this.receipt.sum}&t=${dateStr}`;
            },

            cardStyle: function () {
                let status = this.receipt.status;
                if (status === "FAILED") {
                    return "border-danger"
                }
                if (status === "UNDEFINED") {
                    return "border-warning"
                }
                return ""
            }
        }
    }
</script>

