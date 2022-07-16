<template>
  <Select label="Test" v-model="debug.selectedTest" :options="testOptions" />

  <hr />
  <RunTestButton testName="runDebug" :testObject="debug" />
</template>

<script>
import Select from "../Input/Select.vue";
import RunTestButton from "../RunTestButton.vue";

import { storeToRefs } from "pinia";
import { useConfigStore } from "../../stores/appConfig.js";

export default {
  setup() {
    const config = useConfigStore();
    const { debug } = storeToRefs(config);

    return {
      debug,
    };
  },
  computed: {
    testOptions() {
      return {
        color: "Console Color Test",
      };
    },
  },
  components: {
    Select,
    RunTestButton,
  },
};
</script>

<style></style>
