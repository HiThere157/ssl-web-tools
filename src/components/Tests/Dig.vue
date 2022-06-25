<template>
  <Text label="Target" v-model="dig.target" placeholder="example.com" />
  <Text label="DNS" v-model="dig.dns" placeholder="DNS Server" />
  <Select label="Type" v-model="dig.type" :options="typeOptions" />
  <Checkbox label="Reverse" v-model="dig.reverse" />

  <hr />
  <div class="justify-right">
    <button class="pill green-pill fs-1" @click="$socket.emit('runDig', dig)">
      Run Test
    </button>
  </div>
</template>

<script>
import Text from "../Input/Text.vue";
import Checkbox from "../Input/Checkbox.vue";
import Select from "../Input/Select.vue";

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
  computed: {
    typeOptions() {
      return {
        ANY: "Any",
        A: "A",
        AAAA: "AAAA",
        CNAME: "CNAME",
        MX: "MX",
        NS: "NS",
        PTR: "PTR",
        SOA: "SOA",
        SRV: "SRV",
      };
    },
  },
  components: {
    Text,
    Checkbox,
    Select,
  },
};
</script>

<style></style>
