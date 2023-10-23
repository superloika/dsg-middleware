<template>
<v-sheet>
    <!-- <v-app-bar elevation="0" app color="secondary darken-1" dense> -->
    <v-app-bar elevation="27" app dense color="white">
        <v-toolbar-title class="primary--text">
            <!-- <v-icon>mdi-store</v-icon> -->
            <span class="font-weight-bold text-subtitle-2" :title="selectedPrincipal.name">
                {{ selectedPrincipal.name }}
            </span>
            <v-chip x-small
                v-for="p in PrincipalsStore.state.selectedPrincipal[1]"
                :key="p.vendor_code"
                :title="p.name"
                class="mr-1"
            >
                {{ p.vendor_code }}
            </v-chip>
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
            <component
                :is="t.component"
                :id="`${selectedPrincipal.vendor_code}_tab_${new Date().getTime()}`"
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
        selectedPrincipal() {
            // let p = this.AppStore.state.principals
            //     .find(e => e[0] == this.$route.params.main_vendor_code)[1]
            //     .find(e => e.vendor_code == this.$route.params.main_vendor_code)
            //     ?? {name:'NA', vendor_code:'NA'}
            //     ;
            let p = this.PrincipalsStore.state.selectedPrincipal[1]
                .find(e => e.vendor_code == this.$route.params.main_vendor_code)
                ?? {name:'NA', vendor_code:'NA'}
                ;
            return {
                name: p.name,
                vendor_code: p.vendor_code
            };
        },
    },

    mounted() {
        console.log('Principal Base component mounted');
    },
};
</script>
