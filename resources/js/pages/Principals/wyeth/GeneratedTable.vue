<template>
<v-data-table
    dense
    :items="items"
    :headers="tableHeader"
    :items-per-page="10"
    :search="PrincipalsStore.state.currentGeneratedDataSearchKey"
>
    <template v-slot:[`item.customer_code`]="{ item }">
        <v-chip
            v-if="item.customer_notfound==1"
            color="warning"
            small
            linkx
            outlined
            title="Unmapped"
        >
            <!-- @click="AppStore.copyToClipboard(item.customer_code)" -->
            <div :id="item.customer_code">
                {{ item.customer_code }}
            </div>
        </v-chip>
        <span v-else>{{ item.customer_code }}</span>
    </template>

    <template v-slot:[`item.item_code`]="{ item }">
        <v-chip
            v-if="item.item_notfound==1"
            color="warning"
            small
            linkx
            outlined
            title="Unmapped"
        >
            <!-- @click="AppStore.copyToClipboard(item.item_code)" -->
            <div :id="item.item_code">
                {{ item.item_code }}
            </div>
        </v-chip>
        <span v-else>{{ item.item_code }}</span>
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
        console.log("GeneratedTable component mounted", this.PrincipalsStore.state.selectedPrincipalCode);
    }
};
</script>

