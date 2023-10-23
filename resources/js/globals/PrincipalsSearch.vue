<template>
    <!-- <div> -->
        <v-menu
            v-model="menu" offset-y allow-overflow
            :close-on-click="true" max-width="500"
            :close-on-content-click="true"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn rounded color="primary" v-bind="attrs" v-on="on">
                    <v-icon>mdi-magnify</v-icon>
                    {{ caption }}
                </v-btn>
            </template>
            <!-- <v-card> -->
                <slot></slot>
            <!-- </v-card> -->
        </v-menu>
    <!-- </div> -->
</template>

<script>
export default {
    props: ['caption'],

    data: () => ({
        menu: false,
    }),

    mounted() {
        console.log("PrincipalsSearch mounted");
    },

    methods: {
        test(e) {
            console.log(e);
        }
    }
};
</script>
