<template>
    <v-app>
        <v-system-bar app
            height="45"
            lightx
            dark
            colorx="grey lighten-3"
            color="primary"
        >
            <v-btn
                @click="toggleDrawerState()"
                icon
            >&#9776;</v-btn>

            <v-toolbar-title class="ml-1">
                <a href="/" style="text-decoration:none;" class="white--text">
                    {{ AppStore.state.AppName }}
                </a>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <span class="text-caption white--text mr-3 overflow-auto">
                Howdy, {{ AuthUser.name }}!
            </span>

            <InvoiceLookup></InvoiceLookup>

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
        <v-navigation-drawer v-model="navDrawerState" app>
            <!-- <v-list>
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
            </v-list> -->

            <!-- Side Navigation (Main Nav) -->
            <NavSide></NavSide>

            <!-- Side Nav Footer -->
            <template v-slot:append>
                <v-footer>
                    <v-col class="text-center pa-0">
                        <div class="text-caption" >
                            &copy; 2021-{{ new Date().getFullYear() }}
                            <!-- <a href="https://superloika.github.io">superloika</a> -->
                        </div>
                    </v-col>
                </v-footer>
            </template>
        </v-navigation-drawer>


        <!-- MAIN -->
        <v-main>
            <v-container class="pa-0" fluid>
                <!-- <keep-alive> -->
                    <router-view></router-view>
                <!-- </keep-alive> -->
            </v-container>

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
            <v-chip color="primary darken-1">
                <v-progress-circular
                    :value="64"
                    indeterminate
                    size="20"
                ></v-progress-circular>
                &nbsp;
                {{ AppStore.state.overlay.msg }}
            </v-chip>
        </v-overlay>
    </v-app>
</template>

<script>

export default {
    data: () => ({
        navDrawerState: null,
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

        } catch (error) {
            console.error(error);
        }
    },

    beforeDestroy() {
        this.DevChatStore.userOffline(this.AuthUser);
    }
};
</script>

<style>
    .v-toolbar__content {
        /* border-bottom: 1px solid #222222; */
        border-bottom: 1px solid #e9e9e9;
    }

    .search-field{
        border: 1px solid #f1f1f1;
    }

    /* .v-data-table__wrapper table tbody tr{

    } */
    .v-data-table__wrapper table tbody tr td.text-start{
        /* color: #222222; */
        font-size: 12px;
    }

    .theme--dark.v-data-table
    > .v-data-table__wrapper
    > table
    > tbody
    > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: #000000;
    }

    div.v-tab {
        padding: 0px 5px;
    }

</style>
