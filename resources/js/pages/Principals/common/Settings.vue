<template>
<v-card>
    <v-toolbar elevation="27">
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
    <!-- <v-card-title class="pa-0 mb-6"> -->
    <!-- </v-card-title> -->
    <!-- <v-card-text> -->
        <!-- <v-row v-if="PrincipalsStore.state.settings.length > 0"> -->
            <!-- <v-col cols="12" lg="3" md="4" sm="6" -->
            <br>
            <v-container fluid
                v-for="(setting, index) in PrincipalsStore.state.settings"
                :key="index"
            >
                <v-text-field
                    v-if="setting.type=='number' || setting.type=='text'"
                    v-model="setting.value"
                    :label="setting.description" outlined
                    :hint="setting.hint"
                    persistent-hint
                    :type="setting.type"
                >
                </v-text-field>
                <v-switch
                    v-if="setting.type=='toggle'"
                    :label="setting.description"
                    :hint="setting.hint"
                    persistent-hint
                    inset
                    v-model="
                        parPrincipalsStore.state.settings.find(
                            e => e.name==setting.name
                        ).value
                    "
                >

                </v-switch>
                <v-textarea
                    v-if="setting.type=='json'"
                    v-model="setting.value"
                    :label="setting.description"
                    :value="setting.value"
                    :hint="setting.hint"
                    persistent-hint
                    outlined
                    color="warning"
                    auto-grow
                ></v-textarea>
            </v-container>
        <!-- </v-row> -->
    <!-- </v-card-text> -->
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
