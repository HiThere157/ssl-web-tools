<template>
  <Text label="Target" v-model="ping.target" placeholder="example.com" />
  <Text label="Count" :onlyNumbers="true" v-model="ping.count" />

  <hr />
  <div class="justify-right">
    <button class="pill pill-green fs-1" @click="$socket.emit('runPing', ping)">
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
