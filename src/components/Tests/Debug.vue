<template>
  <Select label="Test" v-model="debug.selectedTest" :options="testOptions" />

  <hr />
  <div class="justify-right">
    <button
      class="pill pill-green fs-1"
      @click="$socket.emit('runDebug', debug)"
    >
      Run Test
    </button>
  </div>
</template>

<script>
import Select from "../Input/Select.vue";

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
  },
};
</script>

<style></style>
