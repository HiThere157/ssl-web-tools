<template>
  <Text label="Target" v-model="traceroute.target" placeholder="example.com" />
  <Text label="Max Hops" :onlyNumbers="true" v-model="traceroute.maxHops" />

  <hr />
  <RunTestButton testName="runTraceroute" :testObject="traceroute" />
</template>

<script>
import Text from "../Input/Text.vue";
import RunTestButton from "../RunTestButton.vue";

import { storeToRefs } from "pinia";
import { useConfigStore } from "../../stores/appConfig.js";

export default {
  setup() {
    const config = useConfigStore();
    const { traceroute } = storeToRefs(config);

    return {
      traceroute,
    };
  },
  components: {
    Text,
    RunTestButton,
  },
};
</script>

<style></style>
