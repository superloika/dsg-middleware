<template>
<v-card outlined>
    <v-card-title class="text-h6">
        {{ title }}&nbsp;
        <v-chip :color="variantColor" small style="color:#fff;">
            {{ unknownCodes.length }}
        </v-chip>
        <v-spacer></v-spacer>
        <v-btn icon
            title="Copy All"
            @click="AppStore.copyToClipboard(codesNA)">
            <v-icon>mdi-content-copy</v-icon>
        </v-btn>
        <v-btn icon
            title="Export to Textfile"
            @click="AppStore.exportToTxt(title+'.txt', codesNA)">
            <v-icon>mdi-export</v-icon>
        </v-btn>

    </v-card-title>
    <v-card-text class="pa-1">
        <v-chip v-for="(pcode) in unknownCodes"
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
    props: ['unknownCodes', 'type', 'temptxt_id', 'title'],

    data: () => ({

    }),

    computed: {
        codesNA() {
            let temp = '';

            const len = this.unknownCodes.length;
            for(let i=0; i<len; i++) {
                temp += this.unknownCodes[i];
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
        console.log('UnknownCodes component mounted');
    },
};
</script>
