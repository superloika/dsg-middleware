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

            <div v-if="uploadResponse.ufiles!=undefined && uploadResponse.ufiles.length" class="mb-3">
                <v-sheet elevation="1" class="pa-4 error--text">
                    <h4>{{ uploadResponse.ufiles.length }} unknown file/s</h4>
                    <h6>Unmatched group prefix in filename</h6>
                    <v-divider></v-divider>
                    <div v-for="(uf, i) in uploadResponse.ufiles" :key="i">
                        {{ uf }}
                    </div>
                </v-sheet>
            </div>

            <v-expansion-panels focusable>
                <v-expansion-panel
                    v-for="(summary, index) in uploadResponse.summary"
                    :key="index"
                >
                    <v-expansion-panel-header disable-icon-rotate class="pa-0 px-2">
                        <span class="text-caption">{{ summary.file_name }}</span>
                        <template v-slot:actions>
                            <v-chip x-small title="Number of uploaded item invoices">
                                {{ summary.lines_count_uploaded + summary.cm_lines_count_uploaded }}
                            </v-chip>

                            <!-- <div>
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
                            </div> -->
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
                            <v-row>
                                <v-col>
                                    <div class="caption">
                                        Invoice
                                    </div>
                                    <table class="table">
                                        <tbody>
                                            <tr>
                                                <td class="caption font-weight-bold pr-4">Headers Read</td>
                                                <td>{{ summary.headers_count }}</td>
                                            </tr>
                                            <tr>
                                                <td class="caption font-weight-bold pr-4">Headers Existing</td>
                                                <td>{{ summary.headers_count_existing }}</td>
                                            </tr>
                                            <tr>
                                                <td class="caption font-weight-bold pr-4">Headers Uploaded</td>
                                                <td>{{ summary.headers_count_uploaded }}</td>
                                            </tr>
                                            <tr>
                                                <td colspan="2"><v-divider></v-divider></td>
                                            </tr>
                                            <tr>
                                                <td class="caption font-weight-bold pr-4">Lines Read</td>
                                                <td>{{ summary.lines_count }}</td>
                                            </tr>
                                            <tr>
                                                <td class="caption font-weight-bold pr-4">Lines Existing</td>
                                                <td>{{ summary.lines_count_existing }}</td>
                                            </tr>
                                            <tr>
                                                <td class="caption font-weight-bold pr-4">Lines Uploaded</td>
                                                <td>{{ summary.lines_count_uploaded }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </v-col>

                                <v-col>
                                    <div class="caption">
                                        Return (CM)
                                    </div>
                                    <table class="table">
                                        <tbody>
                                            <tr>
                                                <td class="caption font-weight-bold pr-4">Headers Read</td>
                                                <td>{{ summary.cm_headers_count }}</td>
                                            </tr>
                                            <!-- <tr>
                                                <td class="caption font-weight-bold pr-4">Headers Existing</td>
                                                <td>{{ summary.cm_headers_count_existing }}</td>
                                            </tr>
                                            <tr>
                                                <td class="caption font-weight-bold pr-4">Headers Uploaded</td>
                                                <td>{{ summary.cm_headers_count_uploaded }}</td>
                                            </tr> -->
                                            <tr>
                                                <td colspan="2"><v-divider></v-divider></td>
                                            </tr>
                                            <tr>
                                                <td class="caption font-weight-bold pr-4">Lines Read</td>
                                                <td>{{ summary.cm_lines_count }}</td>
                                            </tr>
                                            <tr>
                                                <td class="caption font-weight-bold pr-4">Lines Existing</td>
                                                <td>{{ summary.cm_lines_count_existing }}</td>
                                            </tr>
                                            <tr>
                                                <td class="caption font-weight-bold pr-4">Lines Uploaded</td>
                                                <td>{{ summary.cm_lines_count_uploaded }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </v-col>
                            </v-row>


                            <!-- <v-chip small class="px-2 ma-1"
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
                            </v-chip> -->

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


