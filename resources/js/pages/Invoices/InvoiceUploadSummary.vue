<template>
    <v-card>
        <v-card-title class="pb-6">
            <div class="mr-2">
                Upload Summary
            </div>
            <div>
                <v-chip color="default" small title="Batch Number">
                    {{ uploadResponse.batch_number }}
                </v-chip>
            </div>
        </v-card-title>

        <v-card-text>

            <v-expansion-panels focusable>
                <v-expansion-panel
                    v-for="(summary, index) in uploadResponse.summary"
                    :key="index"
                >
                    <v-expansion-panel-header disable-icon-rotate>
                        {{ summary.file_name }}
                        <template v-slot:actions>
                            <v-icon
                                v-if="
                                    summary.line_read==summary.line_uploaded
                                    && summary.line_uploaded > 0 && summary.line_existing == 0
                                "
                                color="success"
                            >
                                mdi-check
                            </v-icon>
                            <v-icon
                                v-else-if="summary.line_uploaded==0"
                                color="error"
                            >
                                mdi-alert-circle
                            </v-icon>
                            <v-icon
                                v-else
                                color="warning"
                            >
                                mdi-check
                            </v-icon>
                        </template>
                    </v-expansion-panel-header>

                    <v-expansion-panel-content>
                        <div class="pt-3">
                            <v-chip color="default" small class="px-2"
                                title="Total number of lines in the file"
                            >
                                Line Total:
                                {{ summary.line_total }}
                            </v-chip>

                            <v-chip color="default" small class="px-2"
                                title="Total number of lines being read as valid invoice data"
                            >
                                Line Read:
                                {{ summary.line_read }}
                            </v-chip>

                            <v-chip color="default" small class="px-2"
                                title="Total number of lines already exists in the database"
                            >
                                Line Existing:
                                {{ summary.line_existing }}
                            </v-chip>

                            <v-chip color="default" small class="px-2"
                                title="Total number of lines being read as valid invoice data"
                            >
                                Line Skipped:
                                {{ summary.line_total - summary.line_read }}
                            </v-chip>

                            <v-chip
                                title="Total number of lines uploaded"
                                :color="summary.line_uploaded>0?'primary':'error'"
                                small class="px-2"
                            >
                                Line Uploaded:
                                {{ summary.line_uploaded }}
                            </v-chip>
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
