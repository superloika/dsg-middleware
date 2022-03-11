<template>
<v-data-table
    dense
    :items="items"
    :headers="tableHeader"
    :items-per-page="10"
>
    <template v-slot:[`item.customer_code`]="{ item }">
        <v-chip
            v-if="item.customer_notfound==1"
            color="warning"
            small
            link
            outlined
            title="Unknown Customer Code"
            @click="AppStore.copyToClip(item.customer_code)"
        >
            <div :id="item.customer_code">
                {{ item.customer_code }}
            </div>
        </v-chip>
        <span v-else>{{ item.customer_code }}</span>
    </template>

    <template v-slot:[`item.product_code`]="{ item }">
        <v-chip
            v-if="item.product_notfound==1"
            color="error"
            small
            link
            outlined
            title="Unknown Product Code"
            @click="AppStore.copyToClip(item.product_code)"
        >
            <div :id="item.product_code">
                {{ item.product_code }}
            </div>
        </v-chip>
        <span v-else>{{ item.product_code }}</span>
    </template>
</v-data-table>
</template>

<script>
export default {
    name: 'GeneratedTable',

    props: ['items'],

    data: () => ({

    }),

    computed: {
        tableHeader() {
            return this[this.PrincipalsStore.state.selectedPrincipalCode]
                .state.generatedDataTableHeader;
        }
    },

    mounted() {
        console.log("GeneratedTable component mounted");
    }
};
</script>
