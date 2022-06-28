<template>
  <Text label="Target" v-model="traceroute.target" placeholder="example.com" />
  <Text label="Max Hops" :onlyNumbers="true" v-model="traceroute.maxHops" />

  <hr />
  <div class="justify-right">
    <button
      class="pill pill-green fs-1"
      @click="$socket.emit('runTraceroute', traceroute)"
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
    const { traceroute } = storeToRefs(config);

    return {
      traceroute,
    };
  },
  components: {
    Text,
  },
};
</script>

<style></style>
