<template>
    <v-sheet>
        <!-- <div class="d-flex mb-4 justify-center">
            <img src="/img/logo.png" alt="logo" srcset="">
            &nbsp;
            <h6 class="pa-0 text-overline primary--text">{{ AppStore.state.AppName }}</h6>
        </div> -->
        <v-card max-width="300" min-width="300" elevation="1" tile>
            <v-card-title>
                <v-icon class="mr-2">mdi-login</v-icon>
                <span class="text-subtitle-1">Login</span>
            </v-card-title>
            <v-card-text>
                <v-alert dense type="error" dismissible transition="scale-transition"
                    v-if="error_username" text>
                    {{ error_username }} <br> {{ error_password }}
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
                            ></v-text-field>

                            <v-text-field
                                label="Password"
                                outlined
                                name="password"
                                requiredx
                                densex
                                :type="showPassword ? 'text' : 'password'"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="showPassword = !showPassword"
                                autocomplete="false"
                            ></v-text-field>
                            <div class="float-right">
                                <v-btn @click.stop="isLogging=true" color="primary"
                                    type="submit" :loading="isLogging">Login</v-btn>
                            </div>
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
