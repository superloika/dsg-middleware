<template>
<v-list-group no-action color="primary">
    <template v-slot:activator>
        <v-list-item-icon class="mr-2">
            <v-icon>mdi-store</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
            <v-list-item-title>Principals
                <span v-if="AppStore.isSuperAdmin()">
                    <v-chip v-if="principalsCount > 0" x-small
                        class="px-1"
                        color="accent"
                    >
                        {{ principalsCount }}
                    </v-chip>
                    <v-chip v-if="principalsCountTemp > 0" x-small
                        class="px-1"
                        color="warning"
                    >
                        {{ principalsCountTemp }}
                    </v-chip>
                </span>
            </v-list-item-title>
        </v-list-item-content>
    </template>
    <div class="pr-3">
        <div class="pt-2">
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
        <div class="pb-6">
            <v-tooltip
                right
                v-for="(principal, i) in filteredPrincipals"
                :key="i"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-list-item
                        link
                        :to="`/principals/${principal.code}`"
                        color="primary"
                        :title="principal.name"
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
                                'warning' : 'accent'
                            "
                            class="ml-2 mr-0 pa-1"
                        >{{ i+1 }}</v-chip>

                        <v-list-item-content class="pl-2">
                            <v-list-item-title>
                                {{ principal.name }}
                            </v-list-item-title>
                        </v-list-item-content>

                    </v-list-item>
                </template>
                <span>{{ principal.name }}</span>
            </v-tooltip>

        </div>
    </div>
</v-list-group>
</template>

<script>
export default {
    data: () => ({
        principalsSearchKey: ""
    }),

    methods: {},

    computed: {
        filteredPrincipals: function() {
            const searchRegex = new RegExp(this.principalsSearchKey, "i");

            if (JSON.parse(this.AuthUser.principal_ids)[0] === "*") {
                return this.AppStore.state.principals.filter(
                    principal =>
                        searchRegex.test(principal.name) ||
                        !this.principalsSearchKey
                );
            } else {
                return this.AppStore.state.principals.filter(
                    principal =>
                        (searchRegex.test(principal.name) ||
                        !this.principalsSearchKey) &&
                        this.AppStore.isInUserPrincipalIDs(principal.id)
                );
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
        this.AppStore.initPrincipals();
    },

    mounted() {
        console.log("NavSidePrincipals mounted");
    }
};
</script>
