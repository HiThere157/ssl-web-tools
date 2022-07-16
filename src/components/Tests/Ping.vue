<template>
  <Text label="Target" v-model="ping.target" placeholder="example.com" />
  <Text label="Count" :onlyNumbers="true" v-model="ping.count" />

  <hr />
  <RunTestButton testName="runPing" :testObject="ping" />
</template>

<script>
import Text from "../Input/Text.vue";
import RunTestButton from "../RunTestButton.vue";

import { storeToRefs } from "pinia";
import { useConfigStore } from "../../stores/appConfig.js";

export default {
  setup() {
    const config = useConfigStore();
    const { ping } = storeToRefs(config);

    return {
      ping,
    };
  },
  components: {
    Text,
    RunTestButton,
  },
};
</script>

<style></style>
