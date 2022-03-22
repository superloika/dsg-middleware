<template>
<div class="">
    <div
        v-for="(data, index) in generatedData"
        :key="index"
        class="elevation-0"
        style=""
    >
        <div
            class="mb-2 pa-0 overflow-auto"
            v-if="data[1].length > 0"
        >
            <div
                class="pa-0"
                :id="data[0]"
            >
                <v-alert
                    color="secondary darken-1"
                    class="ma-0 pa-2"
                    tile
                >
                    <v-chip small label outlinedx color="secondary">
                        <span class="font-weight-bold">
                            {{ data[0] }}
                        </span>
                    </v-chip>
                    <!-- <span class="text-subtitle-1 font-weight-medium">{{ data[0] }}</span> -->
                    <v-chip small label outlinedx color="primary">
                        {{ data[1].length }} line/s
                    </v-chip>
                    <v-chip
                        small
                        label
                        outlinedx
                        color="error"
                        v-if="groupProductsNotFoundLineCount(data[1]) > 0"
                    >
                        {{ groupProductsNotFoundLineCount(data[1]) }}
                        error/s
                    </v-chip>
                    <v-chip
                        small
                        label
                        outlinedx
                        color="warning"
                        v-if="groupCustomersNotFoundLineCount(data[1]) > 0"
                    >
                        {{ groupCustomersNotFoundLineCount(data[1]) }}
                        warning/s
                    </v-chip>
                </v-alert>
            </div>

            <!-- Selected Principal's Generated DataTable -->
            <component
                :is="GeneratedTable"
                :items="data[1]"
            ></component>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ['generatedData'],

    data: () => ({
    }),

    computed: {
        GeneratedTable() {
            const vm = this;
            // return () =>
            //     import(`../${vm.PrincipalsStore.state.selectedPrincipalCode}/GeneratedTable.vue`);
            return () =>
                import(`./GeneratedTable.vue`);
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
        },
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
