<template>
  <Text label="Target" v-model="whois.target" placeholder="example.com" />

  <hr />
  <div class="justify-right">
    <button
      class="pill green-pill fs-1"
      @click="$socket.emit('runWhois', whois)"
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
    const { whois } = storeToRefs(config);

    return {
      whois,
    };
  },
  components: {
    Text,
  },
};
</script>

<style></style>
