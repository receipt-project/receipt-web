<template>
    <table class="table table-striped">
        <tbody>
        <tr v-for="(item, id) in items" v-bind:key="id">
            <td>{{item.text}}</td>
            <td>{{item.price}} р.</td>
            <td>× {{item.amount}}</td>
        </tr>
        </tbody>
    </table>
</template>
<script>
    export default {
        name: 'ReceiptItems',
        props: {
            items: {
                type: Array,
                default: () => []
            }
        }
    }
</script>
