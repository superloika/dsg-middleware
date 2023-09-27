<template>
    <v-sheet @mousedown="DevChatStore.state.unreadMsgCount=0" class="pa-2 ma-0">
        <v-row>
            <v-col cols="12" md="8">
                <v-textarea
                    solo rounded
                    v-model="newMessage"
                    @keyup.enter="sendMessage(newMessage)"
                    label="Type your message here (press Enter to send)"
                    auto-grow
                    rows="2"
                ></v-textarea>

                <v-card style="overflow-y: scroll;max-height: 400px;" flat>
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
                                    ? 'primary' : 'secondary'
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
                </v-card>
            </v-col>

            <v-col cols="12" md="4">
                <v-card>
                    <v-card-text>
                        <div
                            v-for="(u) in onlineUsers"
                            :key="u.username"
                        >
                            <span class='primary--text'>
                                {{ u.name }} (<em>{{ u.username }}</em>)
                            </span>
                        </div>
                    </v-card-text>

                    <!-- <v-list rounded>
                        <v-subheader>Online Users</v-subheader>
                        <v-list-item-group>
                            <v-list-item
                                v-for="(u) in onlineUsers"
                                :key="u.username"
                                dense
                            >
                                <v-list-item-content>
                                    <v-list-item-title
                                        :class="u.id==AuthUser.id ? 'info--text' : 'primary--text'"
                                    >
                                    <span>
                                        {{ u.name }} - <em>{{ u.username }}</em>
                                    </span>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list> -->
                </v-card>
            </v-col>
        </v-row>
    </v-sheet>
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
