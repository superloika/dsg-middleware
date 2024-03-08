<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>
                        DSG Principal Middleware
                    </v-card-title>
                    <v-card-text>
                        DSG Principal Middleware
                    </v-card-text>

                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-card-title>
                        Database Details
                    </v-card-title>
                    <v-card-text>
                        <pre>
                            {{ dbDetails }}
                        </pre>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                dbDetails: {}
            }
        },

        created() {
            axios.get(`${this.AppStore.state.siteUrl}misc-utils/dbDetails`).then( e => {
                this.dbDetails = e.data;
            });
        },

        mounted() {
            console.log('About page mounted.');
        }
    }
</script>
