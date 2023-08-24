<template>
    <v-sheet>
        <div class="d-flex mb-4 justify-center">
            <img src="/img/logo.png" alt="logo" srcset="">
            &nbsp;
            <h6 class="pa-0 text-overline primary--text font-weight-bold">{{ AppStore.state.AppName }}</h6>
        </div>
        <v-card max-width="300" min-width="300" elevation="0" tile>
            <!-- <v-card-title>
                <v-icon class="mr-2">mdi-login</v-icon>
                <span class="text-subtitle-1">Login</span>
            </v-card-title> -->
            <v-card-text>
                <v-alert
                    v-if="error_username" text
                    dense type="error" dismissible transition="scale-transition"
                    style="font-size: 11px;"
                >
                    <span>{{ error_username }}</span> <br> <span>{{ error_password }}</span>
                </v-alert>
                <form method="POST" action="">
                    <input type="hidden" name="_token" :value="CsrfToken">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                label="Username"
                                outlined
                                name="username"
                                type="text"
                                :value="old_username"
                                requiredx
                                densex
                                rounded
                            ></v-text-field>

                            <v-text-field
                                label="Password"
                                outlined
                                name="password"
                                requiredx
                                densex
                                rounded
                                :type="showPassword ? 'text' : 'password'"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="showPassword = !showPassword"
                                autocomplete="false"
                            ></v-text-field>

                            <v-btn
                                @click.stop="isLogging=true"
                                color="primary"
                                type="submit"
                                :loading="isLogging"
                                rounded
                                block
                            >
                                Login
                            </v-btn>
                        </v-col>
                    </v-row>
                </form>
            </v-card-text>
        </v-card>

    </v-sheet>
</template>

<script>
export default {
    props: {
        old_username: null,
        error_username: null,
        error_password: null,

    },
    data: () => ({
        isLogging: false,
        showPassword: false,
    }),

    watch: {

    },

    mounted() {
        console.log('LoginComponent mounted');
    }
};
</script>
