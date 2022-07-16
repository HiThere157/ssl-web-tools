<template>
  <Text label="Target" v-model="whois.target" placeholder="example.com" />

  <hr />
  <RunTestButton testName="runWhois" :testObject="whois" />
</template>

<script>
import Text from "../Input/Text.vue";
import RunTestButton from "../RunTestButton.vue";

import { storeToRefs } from "pinia";
import { useConfigStore } from "../../stores/appConfig.js";

export default {
  setup() {
    const config = useConfigStore();
    const { whois } = storeToRefs(config);

    return {
      whois,
    };
  },
  components: {
    Text,
    RunTestButton,
  },
};
</script>

<style></style>
