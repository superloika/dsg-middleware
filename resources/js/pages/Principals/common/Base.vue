<template>
<v-sheet>
    <v-app-bar elevation="0" app color="secondary darken-1" dense>
        <v-toolbar-title class="primary--text">
            <!-- <v-icon>mdi-store</v-icon> -->
            {{ principalName }}
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-sheet>
            <v-tabs
                v-model="tab"
                hide-slider
                height="44"
                show-arrows
                center-active
                dark
                background-color="secondary darken-1"
                active-class="primary--text xxxrounded-t-xl"
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
            <component :is="t.component"></component>
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
                .find(e=>e.id==this.$route.params.principal_id).name;
        }
    },

    mounted() {
        console.log('PrincipalBase component mounted');
    },
};
</script>
