<template>
  <Text label="Target" v-model="target" placeholder="Hostname..." />
  <Text label="Count" :onlyNumbers="true" v-model="count" />

  <hr />
  <div class="justify-right">
    <button class="green-pill fs-1 fw-bold" @click="">Run Test</button>
  </div>
</template>

<script>
import Text from "../Input/Text.vue";

export default {
  data() {
    return {
      target: "www.google.de",
      count: 10,
    };
  },
  components: {
    Text,
  },
};
</script>

<style></style>
