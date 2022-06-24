<template>
  <Text label="Target" v-model="ping.target" placeholder="example.com" />
  <Text label="Count" :onlyNumbers="true" v-model="ping.count" />

  <hr />
  <div class="justify-right">
    <button
      class="pill green-pill fs-1 fw-bold"
      @click="$socket.emit('runPing', ping)"
    >
      Run Test
    </button>
  </div>
</template>

<script>
import Text from "../Input/Text.vue";

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
  },
};
</script>

<style></style>
