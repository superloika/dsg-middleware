<template>
<v-container fluid>
    <v-sheet class="pb-2">
        <h3 class="text-overline">Upload Log</h3>
    </v-sheet>
    <v-card
        v-for="uplog in InvoicesStore.state.invoices_upload_logs"
        :key="uplog.id"
        class="mb-6"
        outlined
    >
        <v-card-title :class="isUploadedToday(uplog.created_at) ? 'green--text' : ''">
            <span class="text-overline ">
                BATCH #: {{ uplog.batch_number  }}
            </span>
            <v-spacer></v-spacer>
            <em class="text-overline text--accent">Uploaded on {{ uplog.created_at }}</em>
        </v-card-title>
        <v-card-text>
            <!-- <div>
                {{ uplog.remarks }}
            </div> -->
            <!-- <br> -->
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
                        {{ fn.split('-')[2] }}
                    </v-chip>
                </span>
            </div>
        </v-card-text>
    </v-card>
</v-container>
</template>

<script>
export default {
    data() {
        return {

        }
    },

    methods: {
        isUploadedToday(date) {
            return (new Date(date).toDateString() == new Date().toDateString()) ? true : false;
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
