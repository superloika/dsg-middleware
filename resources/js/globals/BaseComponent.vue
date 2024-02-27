<template>
    <v-app>
        <!-- style="
                background: rgb(237,255,230);
                background: radial-gradient(circle, rgba(237,255,230,1) 0%, rgba(255,255,255,1) 100%);
            " -->
        <v-system-bar app height="48" dark color="primary">
            <!-- <v-btn
                @click="toggleDrawerState()"
                icon
            >&#9776;</v-btn> -->

            <v-toolbar-title class="ml-1 mr-3">
                <a href="/" style="text-decoration:none;"
                    class="text-h6 white--text"
                    :title="AppStore.state.AppName"
                >
                    <v-img src="/img/logo_l.png" max-width="40"></v-img>
                    <!-- {{ AppStore.state.AppName }} -->
                </a>
            </v-toolbar-title>

            <!-- <PrincipalsSearch class="mr-2" v-if="AppStore.state.principals.length > 0" caption="Principals">
                <NavSideListGroupPrincipals></NavSideListGroupPrincipals>
            </PrincipalsSearch> -->

            <PrincipalsSearch class="mr-2" caption="Principals">
                <MainPrincipals></MainPrincipals>
            </PrincipalsSearch>

            <v-spacer></v-spacer>

            <!-- <span class="text-caption mr-3 overflow-auto primary--text">
                Howdy, {{ AuthUser.name }}!
            </span> -->

            <v-btn icon to="/invoices" title="Invoices">
                <v-icon>mdi-file</v-icon>
            </v-btn>

            <span class="px-1"></span>

            <DevChatWrapper></DevChatWrapper>

            <span class="px-1"></span>

            <InvoiceLookup></InvoiceLookup>

            <span class="px-1"></span>

            <GeneralMasterfilesWrapper></GeneralMasterfilesWrapper>

            <span class="px-1"></span>

            <UserMenu></UserMenu>

            <v-progress-linear
                :indeterminate="AppStore.state.showTopLoading"
                :active="AppStore.state.showTopLoading"
                color="white"
                absolute
                bottom
                stream
            ></v-progress-linear>
        </v-system-bar>

        <!-- top error bar (supposed to be) -->
        <!-- <v-system-bar v-if="AppStore.state.errorBar.show"
            height="20" color="red darken-4" app dark elevation="1">
            {{ AppStore.state.errorBar.msg }}
        </v-system-bar> -->

        <!-- SIDE NAV -->
        <!-- <v-navigation-drawer v-model="navDrawerState" app>
            <v-list>
                <v-list-item>
                    <v-list-item-content >
                        <v-list-item-title class="text-h6">
                            DSG
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            Middleware App
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <NavSide></NavSide>

            <template v-slot:append>
                <v-footer>
                    <v-col class="text-center pa-0">
                        <div class="text-caption" >
                            &copy; 2021-{{ new Date().getFullYear() }}
                        </div>
                    </v-col>
                </v-footer>
            </template>
        </v-navigation-drawer> -->


        <!-- MAIN -->
        <v-main>
            <router-view></router-view>
        </v-main>

        <!-- MISC -->
        <v-snackbar
            v-model="AppStore.state.snackBar.show"
            :timeout="AppStore.state.snackBar.timeout"
            bottom left
            :color="AppStore.state.snackBar.color"
        >
            {{ AppStore.state.snackBar.text }}
        </v-snackbar>

        <v-overlay
            :value="AppStore.state.overlay.show"
            z-index="999999"
            opacity="0.5"
        >
            <!-- <v-chip color="primary darken-1">
                <v-progress-circular
                    :value="64"
                    indeterminate
                    size="40"
                ></v-progress-circular>
                &nbsp;

            </v-chip> -->
            <v-card width="250" height="220">
                <v-card-text>
                    <v-row>
                        <v-col cols="12"></v-col>
                        <v-col cols="12" class="d-flex justify-center">
                            <v-progress-circular
                                :value="64"
                                indeterminate
                                size="50"
                                color="primary"
                            ></v-progress-circular>
                        </v-col>
                        <v-col cols="12" class="d-flex justify-center">
                            <small class="text-align-center primary--text">
                                {{ AppStore.state.overlay.msg }}
                            </small>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-overlay>
    </v-app>
</template>

<script>

export default {
    data: () => ({
        navDrawerState: false,
    }),

    // computed: {
    // },

    methods: {
        toggleDrawerState() {
            this.navDrawerState = !this.navDrawerState;
        },
    },

    watch: {

    },

    mounted() {
        console.log('BaseComponent mounted');

        try {
            //DevChat channel
            Echo.join(this.DevChatStore.state.groupChannel)
            .here(users => {
                console.log('Currently heeeeeeerrreeee:', users);
                this.DevChatStore.state.onlineUsers = JSON.parse(JSON.stringify(users));
            })
            .joining((user) => {
                console.log('Joining:', user);
                this.DevChatStore.state.onlineUsers.unshift(user);
                console.log('Current online:', this.DevChatStore.state.onlineUsers);
            })
            .leaving((user) => {
                console.log('Leaving:', user);
                const prevOL = JSON.parse(
                    JSON.stringify(this.DevChatStore.state.onlineUsers)
                );
                this.DevChatStore.state.onlineUsers = [];
                this.DevChatStore.state.onlineUsers = prevOL.filter(e => e.id != user.id);
                console.log('Current online:', this.DevChatStore.state.onlineUsers);
            })
            .listen("MessageSent", event => {
                this.DevChatStore.state.messages.unshift(event.message);
                if(event.message.user_id != AuthUser.id) {
                    this.DevChatStore.state.unreadMsgCount += 1;
                }
            })
            ;

            // invoices channel
            Echo.private(`App.User.${AuthUser.id}`)
            .listen("UploadInvoice", event => {
                this.AppStore.state.overlay.msg = event.message;
            })
            .listen("GenerateTemplated", event => {
                this.AppStore.state.overlay.msg = event.message;
            })
            ;


            // refresh BR
            // this.BrStore.refresh('ppfb');

            this.AppStore.initPrincipals();

        } catch (error) {
            console.error(error);
        }
    },

    beforeDestroy() {
        // this.DevChatStore.userOffline(this.AuthUser);
    }
};
</script>

<style>
    /* .v-toolbar__content {
        border-bottom: 1px solid #e9e9e9;
    } */

    .search-field{
        border: 1px solid #f1f1f1;
    }

    /* .v-data-table__wrapper table tbody tr{

    } */
    .v-data-table__wrapper table tbody tr td.text-start{
        font-size: 12px;
    }
    /* .v-data-table__wrapper table tbody tr td.text-start:hover {
        background-color: #f1f1f1;
    } */

    /* .theme--dark.v-data-table
    > .v-data-table__wrapper
    > table
    > tbody
    > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: #000000;
    } */

    div.v-tab {
        padding: 0px 10px;
    }

    .theme--light.v-toolbar.elevation-27,
    .theme--light.v-app-bar.v-toolbar.elevation-27
    /* .theme--dark.v-toolbar.elevation-27,
    .theme--dark.v-app-bar.v-toolbar.elevation-27 */
    {
        /* box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px; */
        /* box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px; */
        box-shadow: rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset;
    }

    .v-btn {
        font-size: 11px;
    }
</style>
