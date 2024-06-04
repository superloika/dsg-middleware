<template>
    <v-dialog v-model="dialog" max-width="1200" scrollable>
        <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" title="Dev Chat"
                @click.stop="DevChatStore.state.unreadMsgCount = 0;"
            >
                <v-badge v-if="DevChatStore.state.unreadMsgCount > 0" dot color="error" offset-x="10">
                    <v-icon>mdi-message</v-icon>
                </v-badge>
                <v-icon v-else>mdi-message</v-icon>
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
