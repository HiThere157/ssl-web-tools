<template>
  <div class="container" style="margin-left: 0">
    <h1 class="container-title">Run Test</h1>

    <Result
      v-for="result in results"
      :title="result.title"
      :status="result.status"
      :body="result.data.trim()"
      :data-timestamp="result.timestamp"
      @removeResult="removeResult(result.timestamp)"
      @update="updateResult(result.timestamp)"
    ></Result>
  </div>
</template>

<script>
import Result from "./Result.vue";

export default {
  data() {
    return {
      results: {},
      removedResults: [],
    };
  },
  mounted() {
    this.$socket.on("newResultData", (result) => {
      const { timestamp, data } = result;

      if (this.removedResults.includes(timestamp)) return;
      if (!this.results[timestamp]) this.addResult(result);

      this.results[timestamp].data += data;
    });

    this.$socket.on("newResultStatus", (result) => {
      const { timestamp, status, data } = result;

      if (this.removedResults.includes(timestamp)) return;
      if (!this.results[timestamp]) this.addResult(result);

      this.results[timestamp].status = status;
      if (status === "error") {
        this.results[timestamp].data += data;
      }
    });
  },
  destroyed() {
    this.$socket.off("newResultData");
    this.$socket.off("newResultStatus");
  },
  methods: {
    addResult(result) {
      const { timestamp, title, command } = result;

      this.results[timestamp] = {
        timestamp,
        title,
        status: "pending",
        data: command ? "> " + command + "\n\n" : "",
      };
    },
    removeResult(timestamp) {
      delete this.results[timestamp];
      this.removedResults.push(timestamp);
    },
    updateResult(timestamp) {
      const element = document.querySelector(
        "[data-timestamp='" + timestamp + "'] .result-body",
      );
      element.scrollTop = element.scrollHeight;
    },
  },
  components: {
    Result,
  },
};
</script>

<style></style>
