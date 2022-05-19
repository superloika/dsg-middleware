<template>
    <div>
        <v-container>
            <div>
                <v-text-field
                    v-model="newMessage"
                    @keyup.enter="sendMessage(newMessage)"
                    rounded
                    solo
                    placeholder="Enter message here"
                ></v-text-field>
            </div>
        </v-container>

        <v-sheet class="pa-4">
            <div
                v-for="(message, i) in messages"
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
                        style="max-width:700px;"
                    >
                        <div class="pl-4 pr-6 pt-4 pb-2 white--text">
                            <div class="">
                                {{ message.message }}
                            </div>
                            <div class="mt-2">
                                <em class="caption">
                                    {{ message.created_at }}
                                </em>
                            </div>
                        </div>
                        <!-- <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ message.message }}
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    <em class="caption">
                                        {{ message.created_at }}
                                    </em>
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item> -->
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
            messages: [],
            newMessage: ""
        };
    },

    computed: {
        channel() {
            return this.PrincipalsStore.state.selectedPrincipalCode;
        }
    },

    methods: {
        fetchMessages() {
            axios.get(`/devchat/fetch-messages?channel=${this.channel}`).then(response => {
                this.messages = response.data;
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
    },

    created() {
        this.fetchMessages();

        Echo.join(this.channel)
            .listen("MessageSent", event => {
                this.messages.unshift(event.message);
            });
    }
};
</script>
