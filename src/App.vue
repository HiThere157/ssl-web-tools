<template>
  <Header />
  <Banner
    v-if="socketErrorVisible"
    title="Socket Error"
    description="Cannot connect to Socket! Running Tests is currently not available"
  />
  <div class="content">
    <TestSelect />
    <TestResult />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Banner from "./components/Banner.vue";
import TestSelect from "./components/TestSelect.vue";
import TestResult from "./components/TestResult.vue";

export default {
  data() {
    return {
      socketErrorVisible: false,
    };
  },
  mounted() {
    setTimeout(() => {
      if (this.$socket.disconnected) this.socketErrorVisible = true;
    }, 2500);

    this.$socket.on("disconnect", () => {
      this.socketErrorVisible = true;
    });

    this.$socket.on("connect", () => {
      this.socketErrorVisible = false;
    });
  },
  destroyed() {
    this.$socket.off("disconnect");
    this.$socket.off("connect");
  },
  components: {
    Header,
    Banner,
    TestSelect,
    TestResult,
  },
};
</script>

<style>
@import "./assets/base.css";

#app {
  min-width: calc(var(--container-min-width) + 1rem);
  display: flex;
  height: 100vh;
  flex-direction: column;
}

.content {
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 0.5rem;
  row-gap: 0.5rem;
  padding: 0.5rem;
}

.content > * {
  min-width: var(--container-min-width);
  flex: 1;
  padding: 0.75rem 1.5rem;
  border-radius: 0.4rem;
  background-color: var(--color-background-soft);
}

.content > * > h1 {
  margin-bottom: 0.5rem;
  color: var(--color-heading);
}
</style>
