<template>
<v-sheet>
    <!-- <v-app-bar elevation="0" app color="secondary darken-1" dense> -->
    <v-app-bar elevation="27" app dense color="white">
        <v-toolbar-title class="primary--text">
            <!-- <v-icon>mdi-store</v-icon> -->
            <span class="font-weight-bold text-subtitle-2" :title="principalName">
                {{ principalName }}
            </span>
            <!-- <v-chip x-small title="Vendor Code">
                {{ vendorCode }}
            </v-chip>
            <v-chip x-small title="Middleware Code">
                {{ PrincipalsStore.state.selectedPrincipalCode }}
            </v-chip> -->
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-sheet>
            <v-tabs
                v-model="tab"
                hide-slider
                show-arrows
                center-active
                background-color="transparent"
                active-class="primary--text"
            >
                <v-tab
                    v-for="(t, index) in tabs"
                    :key="index"
                    :title="t.title"

                >
                    <v-icon>{{ t.icon }}</v-icon>
                </v-tab>
            </v-tabs>
        </v-sheet>
    </v-app-bar>

    <!-- <v-container> -->
    <v-tabs-items v-model="tab" class="pa-0">
        <v-tab-item
            v-for="(t, index) in tabs"
            :key="index"
            class="pa-0"
        >
            <!-- <component :is="t.component" :id="principalName + index"></component> -->
            <component
                :is="t.component"
                :id="`${selectedPrincipalCode}_tab_${new Date().getTime()}`"
            >
            </component>
        </v-tab-item>
    </v-tabs-items>
    <!-- </v-container> -->
</v-sheet>
</template>


<script>
export default {
    props: ['tabs'],

    data: () => ({
        tab: null,
    }),

    computed: {
        principalName() {
            return this.AppStore.state.principals
                .find(e => e[0] == this.$route.params.main_vendor_code)[0];
        },
        // vendorCode() {
        //     return this.AppStore.state.principals
        //         .find(e=>e.code==this.$route.params.principal_code).vendor_code;
        // },
        selectedPrincipalCode() {
            return this.PrincipalsStore.state.selectedPrincipalCode;
        },
    },

    mounted() {
        console.log('Principal Base component mounted');
    },
};
</script>
