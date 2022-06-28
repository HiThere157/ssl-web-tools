<template>
  <Text label="Target" v-model="nmap.target" placeholder="example.com" />
  <div class="justify-start" style="column-gap: 5rem">
    <Checkbox label="Service Detection" v-model="nmap.serviceDetection" />
    <Checkbox label="OS Detection" v-model="nmap.OSDetection" />
  </div>
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

  <Checkbox label="Verbose" v-model="nmap.verbose" />

  <hr />
  <div class="justify-right">
    <button class="pill pill-green fs-1" @click="$socket.emit('runNmap', nmap)">
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
  },
};
</script>

<style></style>
