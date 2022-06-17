<template>
  <Text label="Target" v-model="target" placeholder="Hostname..." />

  <hr />
  <div class="justify-right">
    <button class="green-pill fs-1 fw-bold" @click="runTest">Run Test</button>
  </div>
</template>

<script>
import Text from "../Input/Text.vue";

export default {
  data() {
    return {
      target: "www.google.de",
    };
  },
  methods: {
    runTest() {
      this.$socket.emit("runSSL", {
        target: this.target,
      });
    },
  },
  components: {
    Text,
  },
};
</script>

<style></style>
