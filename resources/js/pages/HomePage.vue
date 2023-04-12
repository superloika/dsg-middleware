<template>
<v-container fluid>
    <!-- NOTICES -->
    <div v-if="AppStore.state.notices.length > 0">
        <v-card
            v-for="notice in AppStore.state.notices"
            :key="notice.id"
            color="secondaryx"
            class="mb-3"
            elevation="1"
        >
            <v-card-text class="" v-html="notice.notice">
            </v-card-text>
            <v-card-actions class="pl-3">
                <!-- <v-spacer></v-spacer> -->
                <v-chip
                    :color="isUploadedToday(notice.created_at)?'primary':'secondary'"
                    small
                >
                    <span v-if="isUploadedToday(notice.created_at)">
                        Today
                    </span>
                    <span v-else>{{ notice.created_at }}</span>
                </v-chip>
            </v-card-actions>
        </v-card>
        <br>
    </div>


    <!-- UPLOAD SUMMARIES -->
    <v-row>
        <v-col md="4" sm="12" lg="4"
            v-for="(uplog, uplog_loop_index) in InvoicesStore.state.invoices_upload_logs"
            :key="uplog.id"
            class="mb-6"
        >

            <v-chip :color="isUploadedToday(uplog.created_at) ? 'primary' : ''" small
                class="rounded-0"
            >
                <span
                    v-if="isUploadedToday(uplog.created_at)"
                >Uploaded Today</span>
                <span v-else>
                    Uploaded on {{ uplog.created_at }}
                </span>
            </v-chip>
            <div class="pb-1">
                <InvoiceUploadSummary :key="uplog_loop_index"
                    :uploadResponse="summary(uplog.summary)"
                ></InvoiceUploadSummary>
            </div>

        </v-col>

    </v-row>

    <!-- <v-card
        v-for="(uplog, uplog_loop_index) in InvoicesStore.state.invoices_upload_logs"
        :key="uplog.id"
        class="mb-6"
        outlined
    >
        <v-card-title :class="isUploadedToday(uplog.created_at) ? 'green--text' : ''">
            <span class="text-overline ">
                BATCH #: {{ uplog.batch_number  }}
            </span>
            <v-spacer></v-spacer>
            <em class="text-overline text--accent">
                <span
                    v-if="isUploadedToday(uplog.created_at)"
                >Uploaded Today</span>
                <span v-else>
                    Uploaded on {{ uplog.created_at }}
                </span>
            </em>
        </v-card-title>
        <v-card-text>

            <div>


                <div class="pb-1">
                    <em class="text-caption">Text Files</em>
                </div>
                <span
                    v-for="(fn, i) in uplog.filename.split(';')"
                    :key="i"
                >
                    <v-chip v-if="fn != ''"
                        small
                        class="ma-1 elevation-1"
                        color="white"
                    >
                        {{ fn }}
                    </v-chip>
                </span>
            </div>
        </v-card-text>
    </v-card> -->
</v-container>
</template>

<script>

export default {
    components: {
        InvoiceUploadSummary: () => import('../pages/Invoices/InvoiceUploadSummary.vue')
    },

    data() {
        return {

        }
    },

    methods: {
        isUploadedToday(date) {
            return (new Date(date).toDateString() == new Date().toDateString()) ? true : false;
        },

        summary(rawData) {
            if(rawData == '' || rawData==null) return [];

            // const rawJson = '{"summary":' + rawData + '}';
            const decoded = JSON.parse(rawData);
            console.log(decoded);
            return decoded;
        }
    },

    created() {
        this.InvoicesStore.initUploadLogs();
    },

    mounted() {
        console.log("HomePage component mounted.");
        console.log(this.AppStore.state.strDateToday);
    }
};
</script>
