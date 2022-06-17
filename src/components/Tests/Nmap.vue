<template>
  <Text label="Target" v-model="target" placeholder="Hostname..." />
  <Checkbox label="Service Detection" v-model="serviceDetection" />
  <Checkbox label="OS Detection" v-model="OSDetection" />
  <Select label="Timing" v-model="timing" :options="timingOptions" />

  <Select label="Select Ports" v-model="portOption" :options="portOptions" />
  <Text
    v-if="portOption === 'custom'"
    label="TCP Ports"
    v-model="TCPPorts"
    placeholder="Comma separated list of ports..."
  />

  <Checkbox label="Verbose" v-model="verbose" />

  <hr />
  <div class="justify-right">
    <button class="green-pill fs-1 fw-bold" @click="runTest">Run Test</button>
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
      TCPPorts: "",

      verbose: false,
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
  methods: {
    runTest() {
      this.$socket.emit("runNmap", {
        target: this.target,
        serviceDetection: this.serviceDetection,
        OSDetection: this.OSDetection,
        timing: this.timing,

        portOption: this.portOption,
        TCPPorts: this.TCPPorts,

        verbose: this.verbose,
      });
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
