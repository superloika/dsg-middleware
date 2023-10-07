<template>
    <v-card max-width="300" min-width="250" tile elevation="0">
        <!-- <v-card color="primary" tile elevation="0">
            <v-card-text>
                <div class="pa-0 text-h5 white--text">
                    {{ AppStore.state.AppAbbr }}
                </div>
                <div class="pa-0 text-caption white--text">
                    {{ AppStore.state.AppName }}
                </div>
            </v-card-text>
        </v-card> -->
        <v-card tile elevation="0" class="pb-2">
            <v-card-title class="justify-center">
                <v-img src="/img/logo.png" max-width="50"></v-img>
            </v-card-title>
        </v-card>
        <v-card-text class="pa-0">
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
                            rounded outlined
                            label="Username"
                            name="username"
                            type="text"
                            :value="old_username"
                        ></v-text-field>

                        <v-text-field
                            rounded outlined
                            label="Password"
                            name="password"
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
                            rounded block large
                        >
                            <v-icon left>mdi-login</v-icon>
                            Login to DSGPM
                        </v-btn>
                    </v-col>
                </v-row>
            </form>
        </v-card-text>
    </v-card>
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
