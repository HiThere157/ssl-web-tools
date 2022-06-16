<template>
  <Text label="Target" v-model="target" placeholder="Hostname..." />
  <Checkbox label="Service Detection" v-model="serviceDetection" />
  <Checkbox label="OS Detection" v-model="OSDetection" />


  <hr />
  <div class="justify-right">
    <button class="green-pill fs-1 fw-bold" @click="">Run Test</button>
  </div>
</template>

<script>
import Text from "../Input/Text.vue";
import Checkbox from "../Input/Checkbox.vue";

export default {
  data() {
    return {
      target: "www.google.de",
      serviceDetection: null,
      OSDetection: null,
      timing: null,
    };
  },
  components: {
    Text,
    Checkbox,
  },
};
</script>

<style></style>
