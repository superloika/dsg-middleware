<template>
    <div @mousedown="DevChatStore.state.unreadMsgCount=0">
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            users: [],
            // messages: [],
            newMessage: ""
        };
    },

    computed: {
        channel() {
            // return this.PrincipalsStore.state.selectedPrincipalCode;
            return this.DevChatStore.state.groupChannel;
        }
    },

    methods: {
        fetchMessages() {
            axios.get(`/devchat/fetch-messages?channel=${this.channel}`).then(response => {
                this.DevChatStore.state.messages = response.data;
            });
        },

        sendMessage(message) {
            const payload = {
                message: message,
                channel: this.channel,
            };
            axios.post("/devchat/send-message", payload).then(response => {
                this.newMessage = "";
                console.log(response.data);
            });
        }
    },

    // watch: {
    //     messages() {
    //         console.log(this.messages);
    //     }
    // },

    mounted() {
        console.log("DevChat page mounted.");
        this.DevChatStore.state.unreadMsgCount = 0;
    },

    created() {
        this.fetchMessages();
    }
};
</script>
