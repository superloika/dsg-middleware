<template>
<v-card class="pa-0">
    <v-card-title class="pa-0 mb-6">
        <v-toolbar class="elevation-0">
            <v-toolbar-title>Settings</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                title="Save Settings"
                icon
                dense
                @click="PrincipalsStore.saveSettings()"
                :loading="AppStore.state.showTopLoading"
                :disabled="PrincipalsStore.state.settings.length < 1"
            >
                <v-icon>mdi-content-save</v-icon>
            </v-btn>
        </v-toolbar>
    </v-card-title>
    <v-card-text>
        <v-row v-if="PrincipalsStore.state.settings.length > 0">
            <!-- <v-col cols="12" lg="3" md="4" sm="6" -->
            <v-col cols="12"
                v-for="(setting, index) in PrincipalsStore.state.settings"
                :key="index"
            >
                <v-text-field
                    v-if="setting.type=='number' || setting.type=='text'"
                    v-model="setting.value"
                    :label="setting.description" outlined
                    :hint="setting.hint"
                    :type="setting.type"
                >
                </v-text-field>
                <v-switch
                    v-if="setting.type=='toggle'"
                    inset
                    :label="setting.description"
                    :hint="setting.hint"
                    v-model="PrincipalsStore.state.settings.find(e => e.name==setting.name).value"
                >

                </v-switch>
            </v-col>
        </v-row>
    </v-card-text>
</v-card>
</template>

<script>
export default {
    data() {
        return {}
    },

    created() {
        this.PrincipalsStore.initSettings();
    },

    mounted() {
        console.log('Settings component mounted');
        // console.log(
        //     this.PrincipalsStore.state.settings.find(e => e.name=='strict_export').value
        // );
    },
};
</script>
