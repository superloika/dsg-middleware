<template>
    <div>
        <v-menu v-model="menu" :close-on-content-click="true" offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                    <v-avatar color="primary" size="25">
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
                            v-if="this.AuthUser.user_type === 'super_admin'"
                            link
                            to="/manage-accounts"
                        >
                            Manage Accounts
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
                    <!-- <v-dialog
                        persistent
                        v-model="logout_dialog"
                        max-width="300"
                    >
                        <v-card>
                            <v-list>
                                <v-list-item>
                                    Are you sure you want to logout?
                                </v-list-item>
                            </v-list>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn @click="logout()" color="primary"
                                    :loading="isLoggingOut" text>
                                    Yes
                                </v-btn>
                                <v-btn @click="logout_dialog = false" text
                                    :disabled="isLoggingOut">
                                    No
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog> -->
                </v-card-actions>
            </v-card>
        </v-menu>
    </div>
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
