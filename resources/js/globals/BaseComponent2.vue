<template>
    <v-app>

        <v-app-bar v-if="AppStore.state.errorBar.show"
            height="20" color="red darken-4" app dark elevation="1">
            {{ AppStore.state.errorBar.msg }}
        </v-app-bar>


        <!-- SIDE NAV -->
        <v-navigation-drawer v-model="drawer" app>
            <!-- Side Navigation (Main Nav) -->
            <NavSide></NavSide>

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
            <v-container fluid>
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
        >
            {{ AppStore.state.snackBar.text }}
        </v-snackbar>

        <v-overlay :value="AppStore.state.overlay.show" z-index="999999">
            <v-progress-circular :value="64" indeterminate></v-progress-circular>
            {{ AppStore.state.overlay.msg }}
        </v-overlay>

    </v-app>
</template>

<script>

export default {
    data: () => ({
        drawer: null,
    }),

    mounted() {
        console.log('BaseComponent mounted');
    }
};
</script>

<style>
    .search-field{
        border: 1px solid #f1f1f1;
    }
</style>
