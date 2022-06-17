<template>
  <Text label="Target" v-model="target" placeholder="Hostname..." />
  <Text label="Max Hops" :onlyNumbers="true" v-model="maxHops" />

  <hr />
  <div class="justify-right">
    <button class="green-pill fs-1 fw-bold" @click="runTest()">Run Test</button>
  </div>
</template>

<script>
import Text from "../Input/Text.vue";

export default {
  data() {
    return {
      target: "www.google.de",
      maxHops: 30,
    };
  },
  methods: {
    runTest() {
      this.$socket.emit("runTraceroute", {
        target: this.target,
        maxHops: this.maxHops,
      });
    },
  },
  components: {
    Text,
  },
};
</script>

<style></style>
