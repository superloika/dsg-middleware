<template>
    <v-card elevation="0" outlined tile>
        <v-card-title class="pb-6">
            <div class="mr-2">
                <div class="text-overline">Upload Summary
                    <span class="text-caption font-weight-bold">
                        {{ uploadResponse.batch_number }}</span>
                </div>
            </div>
            <div>
                <!-- <v-chip color="default" small title="Batch Number">
                    {{ uploadResponse.batch_number }}
                </v-chip> -->
            </div>
        </v-card-title>

        <v-card-text>

            <v-expansion-panels focusable>
                <v-expansion-panel
                    v-for="(summary, index) in uploadResponse.summary"
                    :key="index"
                >
                    <v-expansion-panel-header disable-icon-rotate class="pa-0 px-2">
                        <span class="text-caption">{{ summary.file_name }}</span>
                        <template v-slot:actions>
                            <v-chip x-small title="Number of uploaded item invoices">
                                {{ summary.lines_count_uploaded }}
                            </v-chip>

                            <v-icon v-if="
                                    summary.lines_count == 0 || summary.headers_count==0
                                "
                                color="error" small
                            >
                                mdi-alert-circle
                            </v-icon>

                            <v-icon v-else-if="
                                    summary.lines_count > 0 && summary.lines_count_uploaded == 0
                                "
                                color="warning" small
                            >
                                mdi-alert-circle
                            </v-icon>

                            <v-icon v-else-if="
                                    summary.lines_count_uploaded > 0 && summary.lines_count_existing > 0
                                "
                                color="warning" small
                            >
                                mdi-check
                            </v-icon>

                            <v-icon v-else-if="
                                    summary.lines_count == summary.lines_count_uploaded
                                "
                                color="success" small
                            >
                                mdi-check
                            </v-icon>
                        </template>
                    </v-expansion-panel-header>

                    <v-expansion-panel-content class="pa-0">
                        <div class="px-0 pt-3">
                            <!-- <v-chip color="default" small class="px-2"
                                title="Total number of lines in the file"
                            >
                                Row Count:
                                {{ summary.row_count }}
                            </v-chip> -->

                            <v-chip small class="px-2 ma-1"
                                title="Total number of headers being read as valid invoice data header"
                                :color="
                                    summary.headers_count < 1 ? 'error' : 'default'
                                "
                            >
                                Headers Read:
                                {{ summary.headers_count }}
                            </v-chip>

                            <v-chip color="default" small class="px-2 ma-1"
                                title="Total number of headers already exist in the database"
                            >
                                Headers Existing:
                                {{ summary.headers_count_existing }}
                            </v-chip>

                            <v-chip color="default" small class="px-2 ma-1"
                                title="Total number of headers uploaded"
                            >
                                Headers Uploaded:
                                {{ summary.headers_count_uploaded }}
                            </v-chip>

                            <!-- <br> -->

                            <v-chip small class="px-2 ma-1"
                                title="Total number of lines being read as valid invoice data"
                                :color="
                                    summary.lines_count < 1 ? 'error' : 'default'
                                "
                            >
                                Lines Read:
                                {{ summary.lines_count }}
                            </v-chip>

                            <v-chip small class="px-2 ma-1"
                                title="Total number of lines already exist in the database"
                            >
                                Lines Existing:
                                {{ summary.lines_count_existing }}
                            </v-chip>

                            <v-chip color="default" small class="px-2 ma-1"
                                title="Total number of lines uploaded"
                            >
                                Lines Uploaded:
                                {{ summary.lines_count_uploaded }}
                            </v-chip>

                            <!-- <br> -->

                        </div>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>

        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: ['uploadResponse'],

    mounted() {
        console.log("InvoiceUploadSummary component mounted");
    }
};
</script>
