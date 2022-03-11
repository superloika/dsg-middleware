<template>
    <component class="ma-0" :is="selectedPrincipal"></component>
</template>

<script>
export default {
    data: () => ({}),

    computed: {
        selectedPrincipal() {
            try {
                const principal_id = this.$route.params.principal_id;
                const principal = this.AppStore.state.principals.find(
                    e => e.id == principal_id
                );
                if (principal != undefined) {
                    if (
                        JSON.parse(this.AuthUser.principal_ids)[0] === "*" ||
                        this.AppStore.isInUserPrincipalIDs(principal_id)
                    ) {
                        this.PrincipalsStore.state.selectedPrincipalCode =
                            principal.code;
                        return () =>
                            import("./" + principal.code.toLowerCase());
                    } else {
                        return () => import("../ErrorPages/ErrorPage404.vue");
                    }
                }
            } catch (error) {
                console.log("Principals_selectedPrincipal() - ERROR: ", error);
            }
        },

        selectedPrincipalCode() {
            return this.PrincipalsStore.state.selectedPrincipalCode;
        },
    },

    created() {
        if(
            this.PrincipalsStore == null
            || this.PrincipalsStore == undefined
        ) {
            /**
             * PS = PrincipalsStore
             */
            Vue.prototype.PrincipalsStore =
                require(`../../stores.custom/principals/PrincipalsStore`)
                .default;
        }
    },

    mounted() {
        console.log(this.selectedPrincipalCode + ' component mounted');
    },

    beforeDestroy() {
        if(this.PrincipalsStore != null) {
            this.PrincipalsStore.cleanup();
        }
        this.PrincipalsStore = null;
        Vue.prototype.PrincipalsStore = null;
    },

};
</script>

<style>
    .table-generated-data {
        border-collapse: collapse;
        font-size: 0.9em;
        font-family: sans-serif;
        min-width: 400px;
        width: 100%;
        border: thin solid #dddddd;
    }

    .table-generated-data thead tr {
        background-color: #f3f3f3;
        text-align: left;
    }

    .table-generated-data th,
    .table-generated-data td {
        padding: 5px 12px;
    }

    .table-generated-data tbody tr {
        border-bottom: thin solid #dddddd;
    }

    .table-generated-data tbody tr:nth-of-type(even) {
        background-color: #f7f7f7;
    }
</style>
