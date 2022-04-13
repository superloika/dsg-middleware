<template>
<v-sheet>
    <!-- <v-tabs v-model="tab" heightx="35" show-arrow background-color="grey darken-4"> -->
    <v-tabs v-model="tab" heightx="35" show-arrow>
        <v-tab v-for="(data, index) in generatedData" :key="index"
            class="px-3 text-caption"
        >
            {{ data[0] }}
            <v-chip color="warning" x-small
                class="ml-1 text-captionx px-1"
                v-if="groupCustomersNotFoundLineCount(data[1]) > 0
                    || groupProductsNotFoundLineCount(data[1]) > 0"
            >
                {{ groupCustomersNotFoundLineCount(data[1]) > groupProductsNotFoundLineCount(data[1]) ?
                    groupCustomersNotFoundLineCount(data[1]) : groupProductsNotFoundLineCount(data[1]) }}
            </v-chip>
        </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
        <v-tab-item v-for="(data, index) in generatedData" :key="index">
            <div class="mb-2 pa-0 overflow-auto" v-if="data[1].length > 0">
                <component
                    :is="GeneratedTable"
                    :items="data[1]"
                ></component>
            </div>
        </v-tab-item>
    </v-tabs-items>
</v-sheet>
</template>

<script>
export default {
    props: ["generatedData"],

    data: () => ({
        tab: null
    }),

    computed: {
        GeneratedTable() {
            const vm = this;
            // return () =>
            //     import(`../${vm.PrincipalsStore.state.selectedPrincipalCode}/GeneratedTable.vue`);
            return () => import(`./GeneratedTable.vue`);
        }
    },

    methods: {
        // get product_notfound line count per group
        groupProductsNotFoundLineCount(lines = []) {
            const test = lines.filter(e => {
                return e.product_notfound == 1;
            });
            return test.length;
        },

        // get customer_notfound line count per group
        groupCustomersNotFoundLineCount(lines = []) {
            const test = lines.filter(e => {
                return e.customer_notfound == 1;
            });
            return test.length;
        }
    },

    created() {},

    mounted() {
        console.log("GeneratedTableWrapper component mounted");
    }
};
</script>

<style scoped>
div {
    color: #eeeeee;
}
</style>
