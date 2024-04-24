<template>
    <v-dialog v-model="dialog" fullscreen scrollable>
        <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" title="General Masterfiles">
                <v-icon>mdi-folder-multiple</v-icon>
            </v-btn>
        </template>

        <v-card>
            <v-card-title >
                <div class="d-flex align-center">
                    <div class="mr-4">General Masterfiles</div>
                    <div>
                        <v-tabs v-model="tab_genmas">
                            <v-tab class="px-3 text-caption">
                                Principals
                            </v-tab>
                            <v-tab class="px-3 text-caption">
                                Customers
                            </v-tab>
                            <v-tab class="px-3 text-caption">
                                Items
                            </v-tab>
                        </v-tabs>
                    </div>
                    <div>
                        <v-btn text @click="dialog = false" icon>
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </div>
                </div>
            </v-card-title>

            <v-tabs-items v-model="tab_genmas">
                <v-tab-item>
                    <MasterPrincipals></MasterPrincipals>
                </v-tab-item>
                <v-tab-item>
                    <MasterCustomers></MasterCustomers>
                </v-tab-item>
                <v-tab-item>
                    <MasterItems></MasterItems>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </v-dialog>
</template>


<script>
export default {
    components: {
        DevChat: () => import('../pages/Principals/common/DevChat.vue'),
        MasterCustomers: () => import('../pages/MasterCustomers'),
        MasterItems: () => import('../pages/MasterItems'),
        MasterPrincipals: () => import('../pages/MasterPrincipals'),
    },

    data() {
        return {
            dialog: false,
            tab_genmas: null,
        }
    },
}
</script>
