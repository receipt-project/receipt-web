<template>
    <div class="card p-2 h-100" :class="cardStyle">
        <div class="row no-gutters h-100">
            <div class="col-md-12">
                <div class="card-body d-md-flex flex-md-column justify-content-md-between h-100">
                    <div class="text-muted">
                        <span>{{ date.format("Do MMMM YYYY HH:mm") }}</span>
                        <p>{{ receipt.place }}</p>
                    </div>
                    <p class="card-text">{{ receipt.sum }} рублей.</p>
                    <div class="btn-card-link d-md-flex justify-content-md-start">
                        <a :href="href" class="btn btn-primary">Открыть</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from "moment";

    export default {
        name: "ReceiptCard",
        props: {
            receipt: {
                type: Object,
                default: () => {}
            }
        },
        computed: {
            date() {
                return moment(this.receipt.date, "YYYY-MM-DD'T'HH:mm:ss");
            },
            href() {
                return `/receipt/` + this.receipt.id;
            },
            cardStyle() {
                let status = this.receipt.status;
                if (status === "FAILED") {
                    return "border-danger";
                }
                if (status === "UNDEFINED") {
                    return "border-warning";
                }
                return "";
            }
        }
    };
</script>
