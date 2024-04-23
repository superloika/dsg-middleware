<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>
                        {{ AppStore.state.AppAbbr }}
                        &nbsp;
                        <v-chip color="primary" small>Version {{ AppStore.state.AppVersion }}</v-chip>
                    </v-card-title>
                    <v-card-text>
                        {{ AppStore.state.AppName }}
                    </v-card-text>

                </v-card>
            </v-col>

            <v-col>
                <v-card>
                    <v-card-title>
                        Local Database Details
                    </v-card-title>
                    <v-card-text>
                        <div>
                            <strong>Database:</strong> <em>{{ dbDetails.db_config.database }}</em>
                        </div>
                        <div>
                            <strong>IP:</strong> <em>{{ dbDetails.db_config.host }}</em>
                        </div>
                        <div>
                            <strong>Driver:</strong> <em>{{ dbDetails.db_config.driver }}</em>
                        </div>
                        <div>
                            <strong>Invoices Table:</strong> <em>{{ dbDetails.invoices_table }}</em>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col>
                <v-card>
                    <v-card-title>
                        Navision Server Details
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col v-for="db in dbDetailsNavision" :key="db.server_name">
                                <v-card outlined>
                                    <v-card-text>
                                        <div class="font-weight-bold">{{ db.server_name }}</div>
                                        <div><em>DSN:</em> <em>{{ db.dsn }}</em></div>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
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
                dbDetails: {
                    db_config: {},
                    invoices_table: ''
                },
                dbDetailsNavision: [],
            }
        },

        created() {
            axios.get(`${this.AppStore.state.siteUrl}misc-utils/dbDetails`).then( e => {
                this.dbDetails = e.data;
            });
            axios.get(`${this.AppStore.state.siteUrl}misc-utils/dbDetailsNavision`).then( e => {
                this.dbDetailsNavision = e.data;
            });
        },

        mounted() {
            console.log('About page mounted.');
        }
    }
</script>
