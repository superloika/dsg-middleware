<template>
    <div @mousedown="DevChatStore.state.unreadMsgCount=0">
        <v-row>
            <v-col cols="8">
                <v-container>
                    <div>
                        <v-textarea
                            v-model="newMessage"
                            @keyup.enter="sendMessage(newMessage)"
                            roundedx
                            outlined
                            label="Message (press Enter to send)"
                        ></v-textarea>
                    </div>
                </v-container>

                <v-sheet class="pa-4">
                    <div
                        v-for="(message, i) in DevChatStore.state.messages"
                        :key="i"
                        class="mb-1"
                    >
                        <div
                            :class="
                                AuthUser.username==message.username
                                ? 'd-flex align-end flex-column'
                                : 'd-flex align-start flex-column'
                            "
                        >
                            <div
                                :class="AuthUser.username==message.username
                                    ? 'light-blue darken-2' : 'secondary'
                                "
                                class="rounded-lg"
                                style="max-width:700px;"
                            >
                                <div class="pl-4 pr-6 pt-4 pb-2 white--text">
                                    <div class="d-flex">
                                        <div>
                                            <v-icon color="" dark>mdi-account</v-icon>
                                        </div>
                                        <div class="pt-1 font-weight-bold caption">
                                            {{ message.name }}
                                        </div>
                                    </div>
                                    <div class="caption">
                                        {{ message.message }}
                                    </div>
                                    <div class="mt-2">
                                        <em class="caption">
                                            {{ message.created_at }}
                                        </em>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-sheet>
            </v-col>

            <v-col cols="4">
                <v-container fluid>
                    <v-card>
                        <v-card-title>
                            <div class="">Online Users</div>
                        </v-card-title>
                        <v-card-text>
                            <div>
                                <div v-for="(u,i) in onlineUsers" :key="i" class="primary--text d-flex">
                                    <div class="mb-2">
                                        <v-chip
                                            :color="u.id==AuthUser.id ? 'info' : 'primary'"
                                            small
                                        >
                                            <v-icon left>mdi-account</v-icon>
                                            {{ u.name }} ({{ u.username }})
                                        </v-chip>
                                    </div>
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>

                </v-container>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            users: [],
            // messages: [],
            newMessage: "",
        };
    },

    computed: {
        channel() {
            // return this.PrincipalsStore.state.selectedPrincipalCode;
            return this.DevChatStore.state.groupChannel;
        },
        onlineUsers() {
            return this.DevChatStore.state.onlineUsers;
        }
    },

    methods: {
        async fetchMessages() {
            await axios.get(`/devchat/fetch-messages?channel=${this.channel}`).then(response => {
                this.DevChatStore.state.messages = response.data;
            });
        },

        async sendMessage(message) {
            const payload = {
                message: message,
                channel: this.channel,
            };
            await axios.post("/devchat/send-message", payload).then(response => {
                this.newMessage = "";
                console.log(response.data);
            });
        }
    },

    watch: {
        // subscribedUsers() {
        //     console.log(this.subscribedUsers);
        // }
    },

    mounted() {
        console.log("DevChat page mounted.");
        this.DevChatStore.state.unreadMsgCount = 0;
    },

    created() {
        this.fetchMessages();
    }
};
</script>
