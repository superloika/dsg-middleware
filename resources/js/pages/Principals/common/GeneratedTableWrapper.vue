<template>
<v-sheet>
    <v-tabs v-model="tab_template_variation"
        :height="generatedData.length > 1 ? 25 : 0"
    >
        <v-tab
            v-for="(templatedData, index) in generatedData" :key="index"
            class="px-3 text-caption"

        >
            {{ templatedData.name }}
        </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab_template_variation">
        <v-tab-item
            v-for="(templatedData, template_variation_tabitem_index) in generatedData"
            :key="template_variation_tabitem_index"
        >
            <v-sheet>
                <v-tabs v-model="tab" height="35" show-arrow>
                    <v-tab v-for="(data, index) in templatedData.output_template" :key="index"
                        class="px-3 text-caption"
                    >
                        {{ data[0] }}
                        <v-chip color="warning" x-small
                            class="ml-1 text-captionx px-1"
                            v-if="warningsCount(data[1]) > 0"
                        >
                            {{ warningsCount(data[1]) }}
                        </v-chip>
                    </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                    <v-tab-item v-for="(data, index) in templatedData.output_template" :key="index">
                        <div class="mb-2 pa-0 overflow-auto" v-if="data[1].length > 0">
                            <component
                                :id="PrincipalsStore.state.selectedPrincipalCode + '_gentable'"
                                :is="GeneratedTable"
                                :tab_caption="data[0]"
                                :items="data[1]"
                                :template_variation_index="template_variation_tabitem_index"
                                :allow_export="allow_export"
                            ></component>
                        </div>
                    </v-tab-item>
                </v-tabs-items>
            </v-sheet>
        </v-tab-item>
    </v-tabs-items>
</v-sheet>
</template>

<script>
export default {
    props: ["generatedData","allow_export"],
    // props: ["allow_export"],

    data() {
        return {
            tab: null,
            tab_template_variation: null,
        }
    },

    computed: {
        // generatedData() {
        //     return this.PrincipalsStore.state.currentGeneratedData;
        // },

        GeneratedTable() {
            const vm = this;
            // return () =>
            //     import(`../${vm.PrincipalsStore.state.selectedPrincipalCode}/GeneratedTable.vue`);
            return () => import(`./GeneratedTable.vue`);
        }
    },

    methods: {
        // // get item_notfound line count per group
        // groupItemsNotFoundLineCount(lines = []) {
        //     const test = lines.filter(e => {
        //         return e.item_notfound == 1;
        //     });
        //     return test.length;
        // },

        // // get customer_notfound line count per group
        // groupCustomersNotFoundLineCount(lines = []) {
        //     const test = lines.filter(e => {
        //         return e.customer_notfound == 1;
        //     });
        //     return test.length;
        // },

        // get total warnings
        warningsCount(lines = []) {
            const test = lines.filter(e => {
                return e.customer_notfound == 1 || e.item_notfound == 1
                    || e.salesman_notfound == 1;
            });
            return test.length;
        },
    },

    watch: {
        tab_template_variation() {
            this.tab = null;
        }
    },

    created() {},

    mounted() {
        console.log("GeneratedTableWrapper component mounted");
        console.log(this.generatedData);
    }
};
</script>

<style scoped>
div {
    color: #eeeeee;
}
</style>
