<template>
<v-list-group no-action color="primary">
    <template v-slot:activator>
        <v-list-item-icon class="mr-2">
            <v-icon>mdi-store</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
            <v-list-item-title>Principals
                <!-- <v-chip x-small color="accent">
                    {{ principalsCount }}
                </v-chip> -->
            </v-list-item-title>
        </v-list-item-content>
    </template>
    <v-sheet class="pr-2">
        <v-sheet color="" class="pt-2">
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
        </v-sheet>
        <v-sheet color="" class="pb-6">
            <v-list-item
                v-for="(principal, i) in filteredPrincipals"
                :key="i"
                link
                :to="'/principals/' + principal.id"
                color="primary"
                :title="principal.name"
            >
                <!-- <v-list-item-icon>
                    <v-icon>mdi-store</v-icon>
                </v-list-item-icon> -->
                <v-list-item-content class="pl-8">
                    <v-list-item-title>{{
                        principal.name
                    }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-sheet>
    </v-sheet>
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
            return this.AppStore.state.principals.length;
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
