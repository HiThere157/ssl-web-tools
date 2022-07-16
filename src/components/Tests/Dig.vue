<template>
  <Text label="Target" v-model="dig.target" placeholder="example.com" />
  <Text label="DNS" v-model="dig.dns" placeholder="DNS Server" />
  <Select label="Type" v-model="dig.type" :options="typeOptions" />
  <Checkbox label="Reverse" v-model="dig.reverse" />

  <hr />
  <RunTestButton testName="runDig" :testObject="dig" />
</template>

<script>
import Text from "../Input/Text.vue";
import Checkbox from "../Input/Checkbox.vue";
import Select from "../Input/Select.vue";
import RunTestButton from "../RunTestButton.vue";

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
    RunTestButton,
  },
};
</script>

<style></style>
