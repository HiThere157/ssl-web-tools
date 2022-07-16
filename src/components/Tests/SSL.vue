<template>
  <Text label="Target" v-model="ssl.target" placeholder="example.com" />
  <Text
    label="Port"
    :onlyNumbers="true"
    v-model="ssl.port"
    placeholder="Port"
  />
  <Checkbox label="Use Self-Signed Certificates" v-model="ssl.useSelfSigned" />

  <hr />
  <RunTestButton testName="runSSL" :testObject="ssl" />
</template>

<script>
import Text from "../Input/Text.vue";
import Checkbox from "../Input/Checkbox.vue";
import RunTestButton from "../RunTestButton.vue";

import { storeToRefs } from "pinia";
import { useConfigStore } from "../../stores/appConfig.js";

export default {
  setup() {
    const config = useConfigStore();
    const { ssl } = storeToRefs(config);

    return {
      ssl,
    };
  },
  components: {
    Text,
    Checkbox,
    RunTestButton,
  },
};
</script>

<style></style>
