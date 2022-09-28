<template>
    <component
        class="ma-0"
        :is="selectedPrincipal"
        :key="`principal_${selectedPrincipalCode}_${new Date().getTime()}`"
    ></component>
</template>

<script>
export default {
    computed: {
        selectedPrincipal() {
            try {
                const principal_code = this.$route.params.principal_code;
                const principal = this.AppStore.state.principals.find(
                    e => e.code == principal_code
                );

                console.log('PPPPPPPPPPPPPPPPPPPPPPPPPP:', principal);
                console.log('PPPPPPPPPPPPPPPPPPPPPPPPPP:', principal_code);

                if (principal != undefined) {
                    if (
                        JSON.parse(this.AuthUser.principal_ids)[0] == "*" ||
                        this.AppStore.isInUserPrincipalIDs(principal.id)
                    ) {
                        this.PrincipalsStore.state.selectedPrincipalCode = principal.code;
                        return () => import("./principal.vue");
                    } else {
                        return () => import("../ErrorPages/ErrorPage404.vue");
                    }
                }
            } catch (error) {
                console.error("Principals_selectedPrincipal() - ERROR: ", error);
            }
        },

        selectedPrincipalCode() {
            return this.PrincipalsStore.state.selectedPrincipalCode;
        },
    },

    mounted() {

    },

    beforeDestroy() {
        if(this.PrincipalsStore != null) {
            this.PrincipalsStore.cleanup();
        }

        // this.PrincipalsStore = null;
        // Vue.prototype.PrincipalsStore = null;
    },

};
</script>

<style>
    .tbl-custom {
        border-collapse: collapse;
        font-size: 0.9em;
        font-family: sans-serif;
        min-width: 400px;
        width: 100%;
        border: thin solid #313131;
    }

    .tbl-custom thead tr {
        background-color: #f3f3f3;
        text-align: left;
    }

    .tbl-custom th,
    .tbl-custom td {
        padding: 5px 12px;
    }

    .tbl-custom tbody tr {
        border-bottom: thin solid #000000;
    }

    .tbl-custom tbody tr:nth-of-type(even) {
        background-color: #242424;
    }
</style>
