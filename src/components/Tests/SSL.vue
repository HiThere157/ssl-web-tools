<template>
  <Text label="Target" v-model="target" placeholder="example.com" />
  <Text label="Port" :onlyNumbers="true" v-model="port" placeholder="Port" />
  <Checkbox label="Use Self-Signed Certificates" v-model="useSelfSigned" />

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
      target: "",
      port: 443,
      useSelfSigned: false,
    };
  },
  methods: {
    runTest() {
      this.$socket.emit("runSSL", {
        target: this.target,
        port: this.port,
        useSelfSigned: this.useSelfSigned,
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
