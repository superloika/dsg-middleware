<template>
    <!-- <div> -->
        <v-menu v-model="menu" :close-on-content-click="true" offset-y>
            <template v-slot:activator="{ on, attrs }">
                <!-- <v-badge
                    color="error"
                    overlap dot
                    :valuex="DevChatStore.state.unreadMsgCount"
                    :contentx="DevChatStore.state.unreadMsgCount"
                >
                    <v-btn icon v-bind="attrs" v-on="on">
                        <v-avatar color="accent" size="25">
                            <span class="white--text text-h6">
                                {{ userInitial }}
                            </span>
                        </v-avatar>
                    </v-btn>
                </v-badge> -->
                <v-btn icon v-bind="attrs" v-on="on">
                    <v-avatar color="primary" size="30">
                        <span class="white--text text-h6">
                            {{ userInitial }}
                        </span>
                    </v-avatar>
                </v-btn>
            </template>
            <v-card>
                <v-list>
                    <v-list-item>
                        <v-list-item-icon>
                            <v-avatar color="primary">
                                <span class="white--text text-h5">
                                    {{ userInitial }}
                                </span>
                            </v-avatar>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ AuthUser.name }}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                {{ AuthUser.username }}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                                <v-chip x-small color="primary" label>
                                    {{ AuthUser.user_type }}
                                </v-chip>
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>

                <!-- <v-divider></v-divider> -->

                <v-list roundedx densex>
                    <v-list-item-group color="primary">
                        <v-list-item link to="/account">
                            Account Settings
                        </v-list-item>
                        <v-list-item
                            v-if="
                                AppStore.isSuperAdmin() || AppStore.isAdmin()
                            "
                            link
                            to="/manage-accounts"
                        >
                            Manage Accounts
                        </v-list-item>
                        <!-- <v-list-item
                            link
                            to="/devchat"
                        >
                            Dev Chat
                            <v-spacer></v-spacer>
                            <v-chip color="error" small v-if="DevChatStore.state.unreadMsgCount">
                                {{ DevChatStore.state.unreadMsgCount }}
                            </v-chip>
                        </v-list-item> -->

                        <v-divider></v-divider>

                        <v-list-item link to="/about">
                            About
                        </v-list-item>
                    </v-list-item-group>
                </v-list>

                <v-card-actions>
                    <!-- <v-spacer></v-spacer> -->
                    <v-btn
                        rounded
                        block
                        text
                        outlined
                        @click.stop="logout()"
                        :loading="isLoggingOut"
                        icon
                    >
                        Logout
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-menu>
    <!-- </div> -->
</template>

<script>
export default {
    data: () => ({
        menu: false,
        logout_dialog: false,
        isLoggingOut: false,
    }),

    methods: {
        logout() {
            this.isLoggingOut = true;
            location.href = `${this.AppStore.state.siteUrl}logout`;
        }
    },

    computed: {
        userInitial() {
            let name = this.AuthUser.name;
            return name[0].toString().toUpperCase();
        }
    },

    mounted() {
        console.log("UserMenu mounted");
    }
};
</script>
