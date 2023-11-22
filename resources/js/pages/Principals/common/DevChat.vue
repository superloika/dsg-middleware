<template>
    <v-sheet @mousedown="DevChatStore.state.unreadMsgCount=0" class="pa-2 ma-0">
        <v-row>
            <v-col cols="12" md="8">
                <v-sheet class="pb-4">
                    <v-textarea
                        solo auto-grow hide-details rounded
                        v-model="newMessage"
                        label="Type your message here"
                        rows="1"
                        class="pb-2"
                    ></v-textarea>
                    <div class="d-flex justify-end">
                        <v-file-input
                            counter rounded small-chips outlined multiple dense
                            color="primary" prepend-icon="mdi-paperclip" :show-size="1000"
                            label="Attachments" placeholder="Select files"
                            v-model="files"
                            class="mr-3"
                            :loading="sending"
                        >
                            <template v-slot:selection="{ index, text }">
                            <v-chip
                                v-if="index < 2"
                                color="primary"
                                dark
                                label
                                small
                            >
                                {{ text }}
                            </v-chip>

                            <span
                                v-else-if="index === 2"
                                class="text-overline grey--text text--darken-3 mx-2"
                            >
                                +{{ files.length - 2 }} File(s)
                            </span>
                            </template>
                        </v-file-input>

                        <v-btn
                            rounded depressed hide-details
                            color="primary"
                            @click="sendMessage(newMessage, files)"
                            :loading="sending"
                            :disabled="newMessage=='' || newMessage==null"
                        >
                            <v-icon>mdi-send</v-icon>
                            Send
                        </v-btn>
                    </div>
                </v-sheet>

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
                                        <!-- <div>
                                            <v-icon color="" dark>mdi-account</v-icon>
                                        </div> -->
                                        <div class="font-weight-bold">
                                            {{ message.name }}
                                        </div>
                                        &nbsp;
                                        <div class="caption"
                                            :class="AuthUser.username==message.username
                                                ? 'lime--text' : 'grey--text'
                                            "
                                        >
                                            @{{ message.username }}
                                        </div>
                                    </div>
                                    <div
                                        class="caption"
                                        style="white-space: pre-line"
                                        v-html="message.message"
                                    >
                                    </div>
                                    <div class="caption pt-2">
                                        <div v-for="(attachment, attachment_index) in JSON.parse(message.attachments)"
                                            :key="attachment_index"
                                        >
                                            <a
                                                :href="'/storage/attachments/' + message.channel + '/' + attachment"
                                                target="_blank" x-small class="white--text"
                                                style="text-decoration: none;"
                                            >
                                                <v-icon small color="white">mdi-attachment</v-icon>
                                                <small>{{ attachment }}</small>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="mt-2 caption d-flex justify-end">
                                        <small>{{ message.created_at }}</small>
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
                            <span class='caption primary--text font-weight-bold'>
                                {{ u.name }} <span class="grey--text">@{{ u.username }}</span>
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
            sending: false,
            files: [],
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
            this.sending = true;
            await axios.get(`/devchat/fetch-messages?channel=${this.channel}`).then(response => {
                this.DevChatStore.state.messages = response.data;
                this.sending = false;
            });
        },

        async sendMessage(message, attachments = []) {
            const config = {
                headers: {'content-type': 'multipart/form-data'},
            }

            let formData = new FormData();

            for(let i=0; i<attachments.length; i++) {
                formData.append('attachments[' + i + ']', attachments[i]);
            }

            formData.append('message', message);
            formData.append('channel', this.channel);

            // const payload = {
            //     message: message,
            //     channel: this.channel,
            //     attachments: attachments
            // };
            this.sending = true;
            await axios.post("/devchat/send-message", formData, config).then(response => {
                this.newMessage = "";
                this.files = [];
                console.log(response.data);
                this.sending = false;
            });
        },

        // onKeyup(event) {
        //     console.log(event.key);
        //     if(event.key == '@') {
        //         alert('test');
        //     }
        // },

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
