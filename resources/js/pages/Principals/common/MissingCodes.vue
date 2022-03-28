<template>
<v-card outlined>
    <v-card-title class="text-h6">
        {{ title }}&nbsp;
        <v-chip :color="variantColor" small style="color:#fff;">
            {{ missingInMaster.length }}
        </v-chip>
        <v-spacer></v-spacer>
        <!-- <v-btn icon
            title="Copy All"
            @click="AppStore.copyToClipboard(codesNA)">
            <v-icon>mdi-content-copy</v-icon>
        </v-btn> -->
        <v-btn icon
            title="Download"
            @click="AppStore.exportToTxt(title+'.txt', codesNA)">
            <v-icon>mdi-file-download</v-icon>
        </v-btn>

    </v-card-title>
    <v-card-text class="pa-1">
        <v-chip v-for="(pcode) in missingInMaster"
            :key="pcode" :color="variantColor" small class="ma-1"
            outlined
        >
            {{ pcode }}
        </v-chip>
    </v-card-text>
</v-card>
</template>

<script>
export default {
    props: ['missingInMaster', 'type', 'temptxt_id', 'title'],

    data: () => ({

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

        variantColor() {
            return this.type=='warning' ? 'warning' :
                this.type=='error' ? 'error' :
                '';
        },

    },

    methods: {
    },

    mounted() {
        console.log('missingInMaster component mounted');
    },
};
</script>
