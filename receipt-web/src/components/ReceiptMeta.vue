<template>
    <table class="table-sm" v-show="receiptLoaded">
        <tbody>
            <tr v-for="(value, name) in metaPostProcessed" v-bind:key="value">
                <th>{{name}}</th>
                <td>{{value}}</td>
            </tr>
        </tbody>
    </table>
</template>
<script>
    import moment from "moment"

    export default {
        name: "ReceiptMeta",
        props: {
            meta: Object,
            receiptLoaded: Object
        },
        computed: {
            metaPostProcessed: function () {
                let result = {};
                let meta = this.meta;
                for (let key in meta) {
                    if (key === "date") {
                        result["Дата"] = moment.unix(meta["date"]).format("DD.MM.YYYY HH:mm");
                    } else if (key === "place") {
                        result["Магазин"] = meta["place"];
                    } else if (key === "provider") {
                        result["Провайдер"] = meta["provider"];
                    } else if (key === "sum") {
                        result["Сумма"] = meta["sum"];
                    } else {
                        result[key] = meta[key];
                    }
                }
                return result;
            }
        }
    }

</script>
