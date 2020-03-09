<template>
    <table class="table-sm">
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
            meta: {
                type: Object
            }
        },
        computed: {
            metaPostProcessed: function () {
                let result = {};
                let meta = this.meta;
                for (let key in meta) {
                    if (key === "date") {
                        result["Дата"] = moment(meta["date"], "YYYY-MM-DD'T'HH:mm:ss").format("DD.MM.YYYY HH:mm");
                    } else if (key === "id") {
                        result["Идентификатор"] = meta["id"];
                    } else if (key === "place") {
                        result["Магазин"] = meta["place"];
                    } else if (key === "provider") {
                        result["Провайдер"] = meta["provider"];
                    } else if (key === "sum") {
                        result["Сумма"] = meta["sum"];
                    } else if (key === "fn") {
                        result["Фискальный накопитель"] = meta["fn"];
                    } else if (key === "fd") {
                        result["Номер фискального документа"] = meta["fd"];
                    } else if (key === "fp") {
                        result["Фискальный признак"] = meta["fp"];
                    } else if (key === "status") {
                        result["Статус чека"] = meta["status"];
                    } else {
                        result[key] = meta[key];
                    }
                }
                return result;
            }
        }
    }

</script>
