<template>
  <Text label="Target" v-model="nmap.target" placeholder="example.com" />

  <div class="justify-start" style="column-gap: 5rem">
    <Checkbox label="Scan Subnet" v-model="nmap.targetSubnet" />
    <Checkbox label="Service Detection" v-model="nmap.serviceDetection" />
    <Checkbox label="OS Detection" v-model="nmap.OSDetection" />
    <Checkbox label="Verbose" v-model="nmap.verbose" />
  </div>

  <Text
    v-if="nmap.targetSubnet"
    label="Subnet"
    :onlyNumbers="true"
    v-model="nmap.subnet"
    placeholder="24"
  />

  <Select label="Timing" v-model="nmap.timing" :options="timingOptions" />

  <Select
    label="Select Ports"
    v-model="nmap.portOption"
    :options="portOptions"
  />
  <Text
    v-if="nmap.portOption === 'custom'"
    label="TCP Ports"
    v-model="nmap.TCPPorts"
    placeholder="Comma separated list of ports"
  />

  <hr />
  <RunTestButton testName="runNmap" :testObject="nmap" />
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
    const { nmap } = storeToRefs(config);

    return {
      nmap,
    };
  },
  computed: {
    portOptions() {
      return {
        T1000: "Top 1000 Ports",
        T100: "Top 100 Ports",
        custom: "Custom",
      };
    },
    timingOptions() {
      return {
        T4: "Aggressive",
        T3: "Normal",
        T2: "Polite",
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
