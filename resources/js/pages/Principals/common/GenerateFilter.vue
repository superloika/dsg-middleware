<template>
    <v-dialog
        v-model="PrincipalsStore.state.generateFilterShown"
        ref="datePicker"
        :return-value.sync="date"
        width="290px"
    >
        <v-date-picker
            v-model="date"
            scrollable
            range
        >
            <v-spacer></v-spacer>
            <v-btn
                @click="PrincipalsStore.state.generateFilterShown=false"
                text
            >
                Cancel
            </v-btn>
            <v-btn
                @click="
                    $refs.datePicker.save(date);
                "
                color="primary"
            >
                Generate
            </v-btn>
        </v-date-picker>

    </v-dialog>
</template>



<script>
export default {
    data() {
        return {
            date: [new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10)],
        }
    },

    computed: {
        dateRangeText() {
            return this.dateRangeText.join(` ~ `);
        }
    },

    mounted() {
        console.log("GenerateFilter component mounted");
    }
};
</script>
