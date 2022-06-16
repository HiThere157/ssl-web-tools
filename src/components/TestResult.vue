<template>
  <div class="container" style="margin-left: 0;">
    <h1 class="container-title">Run Test</h1>

    <Result v-for="result in results" :title="result.title" :body="result.data"></Result>
  </div>
</template>

<script>
import Result from "./Result.vue";

export default {
  data() {
    return {
      results: {},
    };
  },
  mounted() {
    this.$socket.on("newResultData", (result) => {
      const { timestamp, title, data } = result;
      if (!this.results[timestamp]) {
        this.results[timestamp] = {
          timestamp,
          title,
          data: "",
        };
      }

      this.results[timestamp].data += data;
    });
  },
  destroyed() {
    this.$socket.off("newResultData");
  },
  components: {
    Result,
  },
};
</script>

<style></style>
