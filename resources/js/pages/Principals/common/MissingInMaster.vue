<template>
<v-card outlined>
    <v-card-title class="text-h6">
        {{ title }}&nbsp;
        <v-chip color="warning" small style="color:#fff;">
            {{ missingInMaster.length }}
        </v-chip>
        <v-spacer></v-spacer>
        <v-text-field
            v-model="searchKey"
            label="Search"
            title="Search"
            hide-details
            dense
            style="max-width:180px"
            flat
            rounded
            clearable
            solo-inverted
        ></v-text-field>
    </v-card-title>

    <v-card-text>
        <v-data-table
            :headers="tblHeader"
            :items="missingInMaster"
            :search="searchKey"
            dense
        >
        </v-data-table>
    </v-card-text>
</v-card>
</template>

<script>
export default {
    props: ['missingInMaster', 'type', 'temptxt_id', 'title'],

    data() {
        return {
            searchKey: '',
        }
    },

    computed: {
        codesNA() {
            let temp = '';

            const len = this.missingInMaster.length;
            for(let i=0; i<len; i++) {
                temp += this.missingInMaster[i];
                if(i != (len-1)) {
                    temp += '\r\n';
                }
            }
            return temp;
        },

        // variantColor() {
        //     return this.type=='warning' ? 'warning' :
        //         this.type=='error' ? 'error' :
        //         '';
        // },

        tblHeader() {
            if(this.type=='customer') {
                return [
                    {text:'Customer Code', value:'customer_code'},
                    {text:'Customer Name', value:'missing_customer_name'},
                ];
            } else if(this.type=='item') {
                return [
                    {text:'Item Code', value:'item_code'},
                    {text:'Item Name', value:'missing_item_name'},
                ];
            } else if(this.type=='salesman') {
                return [
                    {text:'Salesman Name', value:'missing_salesman_name'},
                ];
            }
        },

        exportToExcel() {
            this.PrincipalsStore.exportToExcel();
        }

    },

    methods: {

    },

    mounted() {
        console.log('MissingInMaster component mounted', this.missingInMaster);
    },
};
</script>
