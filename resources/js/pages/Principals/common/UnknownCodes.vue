<template>
<v-card outlined>
    <v-card-title class="text-subtitle-1">
        {{ title }}&nbsp;
        <v-chip :color="variantColor" small style="color:#fff;">
            {{ unknownCodes.length }}
        </v-chip>
        <v-spacer></v-spacer>
        <v-btn icon
            title="Copy All"
            @click="AppStore.copyToClip(temptxt_id, 'value')">
            <v-icon>mdi-content-copy</v-icon>
        </v-btn>
    </v-card-title>
    <!-- <v-divider></v-divider> -->
    <v-card-text class="pa-1">
        <textarea :id="temptxt_id" cols="30"
            rows="10" style="display:none;"
            v-model="codesNA"
        >
        </textarea>
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

    mounted() {
        console.log('UnknownCodes component mounted');
    },
};
</script>
