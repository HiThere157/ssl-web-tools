<template>
  <div class="container" style="margin-left: 0">
    <h1 class="container-title">Run Test</h1>

    <Result title="SSL" status="success" body="SSL is working" />
    <Result title="Ping" status="success" body="Ping is working" />
  </div>
</template>

<script>
import Result from "./Result.vue";

export default {
  components: {
    Result,
  },
};
</script>

<style></style>
