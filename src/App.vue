<template>
  <Header />
  <Banner
    v-if="socketErrorVisible"
    title="Socket Error"
    description="Cannot connect to Socket! Running Tests is currently not available"
  />

  <splitpanes class="content" :dblClickSplitter="false">
    <pane>
      <TestSelect />
    </pane>
    <pane>
      <TestResult />
    </pane>
  </splitpanes>
</template>

<script>
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

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
    Splitpanes,
    Pane,
    Header,
    Banner,
    TestSelect,
    TestResult,
  },
};
</script>

<style>
@import "./assets/base.css";
@import "./assets/pill.css";

#app {
  min-width: fit-content;
  display: flex;
  height: 100vh;
  flex-direction: column;
}

.content {
  column-gap: 0.15rem;
  row-gap: 0.5rem;
  padding: 0.5rem;
}

.content > *:not(.splitpanes__splitter) {
  padding: 0.75rem 1.5rem;
  border-radius: 0.4rem;
  background-color: var(--color-background-soft);
  min-width: min-content;
}

.content > .splitpanes__splitter {
  padding: 0.75rem 0.25rem;
  border-radius: 0.4rem;
}

.content > .splitpanes__splitter::after,
.content > .splitpanes__splitter::before {
  content: "";
  position: absolute;
  top: 50%;
  display: block;
  width: 1px;
  height: 3rem;
  background-color: var(--color-border);
  transform: translateY(-50%);
}

.content > .splitpanes__splitter::after {
  left: 0.08rem;
}

.content > .splitpanes__splitter::before {
  right: 0.08rem;
}
</style>
