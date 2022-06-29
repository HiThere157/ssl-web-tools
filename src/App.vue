<template>
  <Header />
  <Banner
    v-if="socketErrorVisible"
    title="Socket Error"
    description="Cannot connect to Socket! Running Tests is currently not available"
  />

  <splitpanes
    class="content"
    :dblClickSplitter="false"
    @dblclick="
      if ($event.target.classList.contains('splitpanes__splitter'))
        paneSize = 50;
    "
    @resize="paneSize = $event[0].size"
  >
    <pane :size="paneSize">
      <TestSelect />
    </pane>
    <pane :size="100 - paneSize">
      <TestResult />
    </pane>
  </splitpanes>
</template>

<script>
import "splitpanes/dist/splitpanes.css";
import "./assets/base.css";
import "./assets/pill.scss";

import { Splitpanes, Pane } from "splitpanes";
import Header from "./components/Header.vue";
import Banner from "./components/Banner.vue";
import TestSelect from "./components/TestSelect.vue";
import TestResult from "./components/TestResult.vue";

export default {
  data() {
    return {
      socketErrorVisible: false,
      paneSize: 50,
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

<style lang="scss" scoped>
.content {
  column-gap: 0.15rem;
  row-gap: 0.5rem;
  padding: 0.5rem;

  & > *:not(.splitpanes__splitter) {
    padding: 0.75rem 1.5rem;
    border-radius: 0.4rem;
    background-color: var(--color-background-soft);
    min-width: min-content;
  }

  & > .splitpanes__splitter {
    padding: 0.75rem 0.25rem;
    border-radius: 0.4rem;

    &::after,
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      display: block;
      width: 1px;
      height: 3rem;
      background-color: var(--color-border);
      transform: translateY(-50%);
    }

    &::after {
      left: 0.08rem;
    }

    &::before {
      right: 0.08rem;
    }
  }
}
</style>
