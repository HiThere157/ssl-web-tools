<template>
  <div>
    <h1>Run Test</h1>

    <Result
      v-for="result in results"
      :key="result.timestamp"
      :title="result.title"
      :timestamp="result.timestamp"
      :status="result.status"
      :command="result.command"
      :body="result.data.trim()"
      @removeResult="removeResult(result.timestamp)"
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
      const { timestamp, status, data } = result;

      if (this.removedResults.includes(timestamp)) return;
      if (!this.results[timestamp]) this.addResult(result);

      this.results[timestamp].status = status;
      this.results[timestamp].data += data;
    });
  },
  destroyed() {
    this.$socket.off("newResultData");
  },
  methods: {
    addResult(result) {
      const { timestamp, title, command } = result;

      this.results[timestamp] = {
        timestamp,
        title,
        status: "pending",
        command,
        data: "",
      };
    },
    removeResult(timestamp) {
      delete this.results[timestamp];
      this.removedResults.push(timestamp);
    },
  },
  components: {
    Result,
  },
};
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 0.5rem;
  white-space: nowrap;
  color: var(--color-heading);
}
</style>
