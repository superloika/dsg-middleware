<template>
<v-card>
    <v-sheet v-if="filteredPrincipals.length < 1 && (search_key=='' || search_key==null)"
        class="pa-4"
    >
        <v-chip color="transparent">No data to display</v-chip>
    </v-sheet>

    <v-sheet v-else max-height="80vh">
        <div class="pt-3 pr-3">
            <v-text-field
                class="ml-5"
                solo-inverted
                flat
                dense
                rounded
                clearable
                autofocus
                placeholder="Search Principals"
                v-model="search_key"
                style="margin-bottom: -16px;"
            >
            </v-text-field>
        </div>

        <v-list rounded>
            <v-list-item
                link color="primary"
                :to="`/principals/${principal[0]}`"
                v-for="(principal) in filteredPrincipals"
                :key="principal[0]"
            >
                <!-- <v-list-item-icon>
                    <v-icon>mdi-store</v-icon>
                </v-list-item-icon> -->

                <!-- <v-chip x-small class="ml-2 mr-0 pa-1"
                    :color="principal.proj_status==0 ? 'secondary' : 'primary'"
                >
                    {{ i+1 }}
                </v-chip> -->

                <v-list-item-content class="pl-2">
                    <v-list-item-subtitle v-for="p in principal[1]" :key="p.vendor_code">
                        <v-chip x-small color="primary">
                            {{ p.vendor_code }}
                        </v-chip>
                        <small><strong>{{ p.name }}</strong></small>
                    </v-list-item-subtitle>
                </v-list-item-content>

            </v-list-item>
            <!-- <v-tooltip
                right
                v-for="(principal) in filteredPrincipals"
                :key="principal[0]"
            >
                <template v-slot:activator="{ on, attrs }">

                </template>
                <span>{{ principal[0] }}</span>
            </v-tooltip> -->
        </v-list>
    </v-sheet>
</v-card>
</template>

<script>
export default {
    data: () => ({
        search_key: '',
    }),

    methods: {},

    computed: {
        // filteredPrincipals: function() {
        //     try {
        //         const searchRegex = new RegExp(this.search_key, "i");

        //         if (JSON.parse(this.AuthUser.principal_ids)[0] === "*") {
        //             return this.AppStore.state.principals.filter(
        //                 principal =>
        //                     (
        //                         searchRegex.test(principal.name)
        //                         || !this.search_key
        //                         || searchRegex.test(principal.vendor_code)
        //                         || searchRegex.test(principal.search_key)
        //                     )
        //                     & (principal.main_vendor_code == null || principal.main_vendor_code == '')
        //             );
        //         } else {
        //             return this.AppStore.state.principals.filter(
        //                 principal =>
        //                     (
        //                         searchRegex.test(principal.name)
        //                         || !this.search_key
        //                         || searchRegex.test(principal.vendor_code)
        //                         || searchRegex.test(principal.search_key)
        //                     )
        //                     & (principal.main_vendor_code == null || principal.main_vendor_code == '')
        //                     && this.AppStore.isInUserPrincipalIDs(principal.id)
        //             );
        //         }
        //     } catch (error) {
        //         return [];
        //     }
        // },
        filteredPrincipals: function() {
            try {
                const searchRegex = new RegExp(this.search_key, "i");

                return this.AppStore.state.principals.filter(
                    principal => principal[1].filter(p => (
                        searchRegex.test(p.name)
                        || searchRegex.test(p.vendor_code)
                        || searchRegex.test(p.search_key)
                        || !this.search_key
                    )).length > 0
                );
            } catch (error) {
                console.error(error);
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

    watch: {
        filteredPrincipals(nv, ov) {
            console.log(nv);
        }
    },

    created() {
        // this.AppStore.initPrincipals();
    },

    mounted() {
        console.log("NavSidePrincipals mounted");

    }
};
</script>
