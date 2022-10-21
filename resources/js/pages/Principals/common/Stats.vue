<template>
<v-sheet>
    <v-app-bar class="elevation-0" densex>
        <v-toolbar-title>
            <div>
                Stats
            </div>
        </v-toolbar-title>

        <v-spacer></v-spacer>

    </v-app-bar>
    <v-sheet>
        <v-card>
            <v-card-text>
                <v-sparkline
                    :value="totalAmounts"
                    height="100"
                    padding="16"

                >
                    <template v-slot:label="item">
                        {{ item.value }}
                    </template>
                </v-sparkline>
            </v-card-text>
        </v-card>
    </v-sheet>
</v-sheet>
</template>


<script>


export default {
    // props: ['date','searchKey'],

    data: () => ({
        totalAmounts: [
            100,
            200,
            210,
            400,
            90
        ],
    }),

    computed: {
        selectedPrincipalCode() {
            return this.PrincipalsStore.state.selectedPrincipalCode;
        },
    },

    methods: {

    },

    watch: {

    },

    created() {

    },

    mounted() {

    }


}
</script>
