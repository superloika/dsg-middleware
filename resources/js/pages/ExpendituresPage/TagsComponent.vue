<template>
<div>
    <v-chip
        v-for="(tag_id,i) in tag_ids" :key="i"
        outlined
        x-small
        class="mr-1"
    >
        {{ getTagName(tag_id) }}
    </v-chip>

    <!-- <span v-for="(tag_id,i) in tag_ids" :key="i">
        {{ getTagName(tag_id) }}
        <span v-if="i != Object.keys(tag_ids).length - 1">, </span>
    </span> -->
</div>
</template>

<script>
export default {
    props: {tag_ids:null},

    data: () => ({

    }),

    methods: {
        getTagName(tag_id) {
            let found =  this.Expenditures.state.tags.filter(function(tag){
                return tag.tag_id==tag_id;
            });
            if(found.length > 0) {
                return found[0].tag_name;
            }
        }
    },

};
</script>
