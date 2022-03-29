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
        <!-- <v-btn icon
            title="Copy All"
            @click="AppStore.copyToClipboard(codesNA)">
            <v-icon>mdi-content-copy</v-icon>
        </v-btn> -->
        <!-- <v-btn icon
            title="Download"
            @click="AppStore.exportToTxt(title+'.txt', codesNA)">
            <v-icon>mdi-file-download</v-icon>
        </v-btn> -->
    </v-card-title>
    <!-- <v-card-text class="pa-1" v-if="type=='customer'">
        <v-chip v-for="(missing, id) in missingInMaster"
            :key="id" color="warning" small class="ma-1"
            outlined
        >
            {{ missing.customer_code }} -
            {{ missing.customer_name }}
            <br>
        </v-chip>
    </v-card-text>
    <v-card-text class="pa-1" v-else-if="type=='product'">
        <v-chip v-for="(missing, id) in missingInMaster"
            :key="id" color="warning" small class="ma-1"
            outlined
        >
            {{ missing.customer_code }} -
            {{ missing.customer_name }}
            <br>
        </v-chip>
    </v-card-text> -->

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

    data: () => ({
        searchKey: '',
    }),

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
            } else if(this.type='product') {
                return [
                    {text:'Product Code', value:'product_code'},
                    {text:'Product Name', value:'missing_product_name'},
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
