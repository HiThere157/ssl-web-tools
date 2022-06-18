<template>
  <Text label="Target" v-model="target" placeholder="example.com" />
  <Text label="Count" :onlyNumbers="true" v-model="count" />

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
      target: "",
      count: 10,
    };
  },
  methods: {
    runTest() {
      this.$socket.emit("runPing", {
        target: this.target,
        count: this.count,
      });
    },
  },
  components: {
    Text,
  },
};
</script>

<style></style>
