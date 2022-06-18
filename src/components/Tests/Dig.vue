<template>
  <Text label="Target" v-model="target" placeholder="Hostname" />
  <Text label="DNS" v-model="dns" placeholder="DNS Server" />
  <Checkbox label="Reverse" v-model="reverse" />

  <hr />
  <div class="justify-right">
    <button class="green-pill fs-1 fw-bold" @click="runTest">Run Test</button>
  </div>
</template>

<script>
import Text from "../Input/Text.vue";
import Checkbox from "../Input/Checkbox.vue";

export default {
  data() {
    return {
      target: "www.google.de",
      dns: "",
      reverse: false,
    };
  },
  methods: {
    runTest() {
      this.$socket.emit("runDig", {
        target: this.target,
        dns: this.dns,
        reverse: this.reverse,
      });
    },
  },
  components: {
    Text,
    Checkbox,
  },
};
</script>

<style></style>
