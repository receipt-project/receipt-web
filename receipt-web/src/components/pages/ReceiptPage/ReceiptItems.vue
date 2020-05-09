<template>
    <table class="table table-striped">
        <thead>
        <tr>
            <th>Наименование</th>
            <th>Цена</th>
            <th>Кол-во</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, id) in items" v-bind:key="id">
            <td>{{item.text}}</td>
            <td>{{item.price}} р.</td>
            <td>× {{totalSum(item.amount)}}</td>
        </tr>
        </tbody>
    </table>
</template>
<script>
    import truncated from "../../utils/truncated";

    export default {
        name: 'ReceiptItems',
        props: {
            items: {
                type: Array,
                default: () => []
            }
        },
        method: {
            totalSum(num) {
                return truncated(num);
            }
        }
    }
</script>
