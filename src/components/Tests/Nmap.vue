<template>
  <Text label="Target" v-model="target" placeholder="Hostname..." />
  <Checkbox label="Service Detection" v-model="serviceDetection" />
  <Checkbox label="OS Detection" v-model="OSDetection" />
  <Select label="Timing" v-model="timing" :options="timingOptions" />

  <Select label="Select Ports" v-model="portOption" :options="portOptions" />
  <template v-if="portOption === 'custom'">
    <Checkbox label="Scan TCP Ports" v-model="scanTCP" />
    <Text
      label="TCP Ports"
      v-if="scanTCP"
      v-model="TCPPorts"
      placeholder="Comma separated list of ports..."
    />

    <Checkbox label="Scan UDP Ports" v-model="scanUDP" />
    <Text
      label="UDP Ports"
      v-if="scanUDP"
      v-model="UDPPorts"
      placeholder="Comma separated list of ports..."
    />
  </template>

  <hr />
  <div class="justify-right">
    <button class="green-pill fs-1 fw-bold" @click="">Run Test</button>
  </div>
</template>

<script>
import Text from "../Input/Text.vue";
import Checkbox from "../Input/Checkbox.vue";
import Select from "../Input/Select.vue";

export default {
  data() {
    return {
      target: "www.google.de",
      serviceDetection: true,
      OSDetection: true,
      timing: "T3",
      portOption: "T1000",

      scanTCP: true,
      scanUDP: false,
      TCPPorts: "",
      UDPPorts: "",
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
