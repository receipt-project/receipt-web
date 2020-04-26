<template>
    <!-- <div class="card" v-bind:class="cardStyle" style="margin-bottom: 20px;">
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
    </div> -->
    <div class="row row-cols-1 row-cols-md-2">
        <div class="col mb-4 position-relative">
            <div class="card  p-2" v-bind:class="cardStyle">
                <div class="row no-gutters">
                    <div class="col-md-7">
                        <div class="card-body">
                            <div class="text-muted">
                                <span>18.04.2020 20:19</span>
                                <p>Парашютная, 65стр1</p>
                            </div>
                            <p class="card-text">
                                32234 рублей.
                            </p>
                        </div>
                    </div>
                    <div class="col-md-5 d-md-flex align-items-md-center position-static btn-card-link">
                        <div class="card-body d-md-flex justify-content-md-center">
                            <a v-bind:href="href" class="btn btn-outline-card stretched-link">Открыть</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col mb-4 position-relative">
            <div class="card  p-2" v-bind:class="cardStyle">
                <div class="row no-gutters">
                    <div class="col-md-7">
                        <div class="card-body">
                            <div class="text-muted">
                                <span>18.04.2020 20:19</span>
                                <p>Парашютная, 65стр1</p>
                            </div>
                            <p class="card-text">
                                32234 рублей.
                            </p>
                        </div>
                    </div>
                    <div class="col-md-5 d-md-flex align-items-md-center position-static btn-card-link">
                        <div class="card-body d-md-flex justify-content-md-center">
                            <a v-bind:href="href" class="btn btn-outline-card stretched-link">Открыть</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

         <div class="col mb-4 position-relative">
            <div class="card  p-2" v-bind:class="cardStyle">
                <div class="row no-gutters">
                    <div class="col-md-7">
                        <div class="card-body">
                            <div class="text-muted">
                                <span>18.04.2020 20:19</span>
                                <p>Парашютная, 65стр1</p>
                            </div>
                            <p class="card-text">
                                32234 рублей.
                            </p>
                        </div>
                    </div>
                    <div class="col-md-5 d-md-flex align-items-md-center position-static btn-card-link">
                        <div class="card-body d-md-flex justify-content-md-center">
                            <a v-bind:href="href" class="btn btn-outline-card stretched-link">Открыть</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import moment from "moment";

export default {
    name: "ReceiptCard",
    props: {
        receipt: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        // date: function () {
        //     return moment(this.receipt.date, "Do MMMM YYYY'T'HH:mm:ss");
        // },
        // href: function () {
        //     return `/receipt/` + this.receipt.id;
        // },

        cardStyle: function() {
            // let status = this.receipt.status;
            // if (status === "FAILED") {
            //     return "border-danger"
            // }
            // if (status === "UNDEFINED") {
            //     return "border-warning"
            // }
            return "";
        }
    }
};
</script>
