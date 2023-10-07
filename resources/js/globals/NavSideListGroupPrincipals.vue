<template>
<v-card>
    <v-sheet v-if="filteredPrincipals.length < 1 && (principalsSearchKey=='' || principalsSearchKey==null)"
        class="pa-4"
    >
        <v-chip color="transparent">No data to display</v-chip>
    </v-sheet>

    <v-sheet v-else>
        <div class="pt-3 pr-3">
            <v-text-field
                v-if="filteredPrincipals.length > 5 || principalsSearchKey !== ''"
                class="ml-5"
                solo-inverted
                flat
                dense
                rounded
                clearable
                autofocus
                placeholder="Search Principals"
                v-model="principalsSearchKey"
                style="margin-bottom: -16px;"
            >
            </v-text-field>
        </div>

        <v-list rounded dense>
            <v-tooltip
                right
                v-for="(principal, i) in filteredPrincipals"
                :key="principal.id"
            >
                <template v-slot:activator="{ on, attrs }">

                    <v-list-item
                        link
                        :to="`/principals/${principal.code}`"
                        color="primary"
                        :titlex="principal.name"
                        v-bind="attrs"
                        v-on="on"
                    >
                        <!-- <v-list-item-icon>
                            <v-icon>mdi-store</v-icon>
                        </v-list-item-icon> -->

                        <v-chip
                            x-small
                            :color="
                                principal.proj_status==0 ?
                                'secondary' : 'primary'
                            "
                            class="ml-2 mr-0 pa-1"
                        >{{ i+1 }}</v-chip>

                        <v-list-item-content class="pl-2">
                            <v-list-item-title>
                                <span class="text-caption">
                                    {{ principal.name }}
                                </span>
                            </v-list-item-title>
                        </v-list-item-content>

                    </v-list-item>
                </template>
                <span>{{ principal.name }}</span>
            </v-tooltip>
        </v-list>
    </v-sheet>
</v-card>
</template>

<script>
export default {
    data: () => ({
        principalsSearchKey: ""
    }),

    methods: {},

    computed: {
        filteredPrincipals: function() {
            try {
                const searchRegex = new RegExp(this.principalsSearchKey, "i");

                if (JSON.parse(this.AuthUser.principal_ids)[0] === "*") {
                    return this.AppStore.state.principals.filter(
                        principal =>
                            searchRegex.test(principal.name)
                            || !this.principalsSearchKey
                            || searchRegex.test(principal.vendor_code)
                            || searchRegex.test(principal.search_key)
                    );
                } else {
                    return this.AppStore.state.principals.filter(
                        principal =>
                            (
                                searchRegex.test(principal.name)
                                || !this.principalsSearchKey
                                || searchRegex.test(principal.vendor_code)
                                || searchRegex.test(principal.search_key)
                            )
                            && this.AppStore.isInUserPrincipalIDs(principal.id)
                    );
                }
            } catch (error) {
                return [];
            }
        },

        principalsCount() {
            // return this.AppStore.state.principals.length;
            let count = 0;
            this.AppStore.state.principals.forEach(e=>{
                if(e.proj_status > 0) count++;
            });
            return count;
        },

        principalsCountTemp() {
            let count = 0;
            this.AppStore.state.principals.forEach(e=>{
                if(e.proj_status < 1) count++;
            });
            return count;
        },
    },

    created() {
        // this.AppStore.initPrincipals();
    },

    mounted() {
        console.log("NavSidePrincipals mounted");
    }
};
</script>
