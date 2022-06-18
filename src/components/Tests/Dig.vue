<template>
  <Text label="Target" v-model="dig.target" placeholder="example.com" />
  <Text label="DNS" v-model="dig.dns" placeholder="DNS Server" />
  <Checkbox label="Reverse" v-model="dig.reverse" />

  <hr />
  <div class="justify-right">
    <button
      class="green-pill fs-1 fw-bold"
      @click="$socket.emit('runDig', dig)"
    >
      Run Test
    </button>
  </div>
</template>

<script>
import Text from "../Input/Text.vue";
import Checkbox from "../Input/Checkbox.vue";

import { storeToRefs } from "pinia";
import { useConfigStore } from "../../stores/appConfig.js";

export default {
  setup() {
    const config = useConfigStore();
    const { dig } = storeToRefs(config);

    return {
      dig,
    };
  },
  components: {
    Text,
    Checkbox,
  },
};
</script>

<style></style>
