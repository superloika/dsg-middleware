<template>
    <v-dialog v-model="dialog" max-width="900" scrollable>
        <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" title="Dev Chat">
                <v-icon>mdi-message</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-toolbar elevation="0">
                <v-toolbar-title>Dev Chat</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn text @click="dialog = false" icon>
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-card-text class="pt-2">
                <DevChat></DevChat>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>


<script>
export default {
    components: {
        DevChat: () => import('../pages/Principals/common/DevChat.vue')
    },

    data() {
        return {
            dialog: false,
        }
    },
}
</script>
