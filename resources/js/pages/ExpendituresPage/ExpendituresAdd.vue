<template>
    <v-card>
        <v-card-title class="mb-5">
            <span class="text-h5">Add Test Data</span>
        </v-card-title>
        <v-card-text>
            <!-- <v-container> -->
            <v-row>
                <v-col cols="12" sm="6" md="4" class="pb-0 pt-0">
                    <v-autocomplete
                        v-model="particular"
                        :items="particulars"
                        dense
                        outlined
                        autofocus
                        @blur="appendNewParticular($event)"
                        label="Particular *"
                    >
                    </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" md="4" class="pb-0 pt-0">
                    <v-text-field
                        v-model="amount"
                        outlined
                        dense
                        label="Amount *"
                        prefix="P"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4" class="pb-0 pt-0">
                    <v-text-field
                        v-model="quantity"
                        outlined
                        dense
                        label="Quantity*"
                        required
                    ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-0 pt-0">
                    <!-- DATEPICKER (dialog) -->
                    <v-dialog
                        ref="dialog_datepicker"
                        v-model="modal_datepicker"
                        :return-value.sync="date"
                        width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="date"
                                label="Date *"
                                readonly
                                dense
                                outlined
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="date" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="modal_datepicker=false">
                                Cancel
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.dialog_datepicker.save(date)"
                            >
                                Ok
                            </v-btn>
                        </v-date-picker>
                    </v-dialog>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-0 pt-0">
                    <v-select
                        v-model="selectedTags"
                        :items="tags"
                        item-text="tag_name"
                        item-value="tag_id"
                        label="Tags"
                        multiple
                        chips
                        dense
                        outlined
                        small-chips
                    ></v-select>
                </v-col>
            </v-row>
            <small>* indicates required field</small>
            <v-row>
                <v-col>
                    <div class="float-right">
                        <v-btn
                            color="primary"
                            @click="saveExpense()"
                            :loading="isSaving"
                            dense
                            outlinedx
                            text
                            smallx
                        >
                            Save
                        </v-btn>
                        <v-btn
                            color="primary"
                            @click="Expenditures.state.add_expense = false"
                            dense
                            outlinedx
                            text
                            smallx
                        >
                            Close
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            particulars: [],
            modal_datepicker: false,
            isSaving: false,
            tags: this.Expenditures.state.tags,

            particular: null,
            amount: null,
            quantity: null,
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            selectedTags: null,

        };
    },

    methods: {
        initParticulars() {
            // const vm = this;
            const url = `${this.AppStore.state.siteUrl}api_expenses/particulars`;

            axios.get(url)
                .then(response => {
                    console.log(response.data);
                    try {
                        this.particulars = response.data.map(function(el){
                            return el.particular;
                        });
                    } catch (error) {
                        this.AppStore.toast(error);
                    }
                })
                .catch(err => {
                    this.AppStore.toast(err);
                });
        },

        saveExpense() {
            const url = `${this.AppStore.state.siteUrl}api_expenses/store`;
            this.isSaving = true;
            const expenseData = {
                "particular": this.particular,
                "amount": this.amount,
                "quantity": this.quantity,
                "expense_date": this.date,
                "tag_ids": this.selectedTags,
            };
            axios.post(url, expenseData)
                .then(response => {
                    if(response.data == true) {
                        this.AppStore.toast('New expense added');
                        this.Expenditures.expenses();
                        this.Expenditures.state.add_expense = false;
                        this.isSaving = false;
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.isSaving = false;
                });

        },

        appendNewParticular(e) {
            const newParticular = e.target.value;
            if(newParticular != '') {
                let newParticularExists = false;
                this.particulars.forEach(function(el){
                    if(el.toLowerCase() === newParticular.toLowerCase()) {
                        newParticularExists = true;
                    }
                });

                if(!newParticularExists) {
                    this.particulars.push(newParticular);
                    this.particular = newParticular;
                }

                console.log('PARTICULARS:', this.particulars);
            }
        }
    },

    computed: {

    },

    watch: {
        selectedTags() {
            console.log(this.selectedTags);
        }
    },

    created() {
        this.initParticulars();
    },

    mounted() {
        console.log("ExpendituresAdd mounted.");
    }
};
</script>
