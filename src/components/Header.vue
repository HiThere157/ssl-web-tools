<template>
  <div class="header">
    <div class="title">
      <img class="icon" src="/favicon.svg" />
      <h1>SSL Web Tools</h1>
    </div>
    <a
      v-if="newVersionAvailable"
      href="https://github.com/HiThere157/ssl-web-tools/releases"
      target="_blank"
      class="pill pill-green"
      >New Version Available!</a
    >
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { useConfigStore } from "../stores/appConfig.js";

export default {
  setup() {
    const config = useConfigStore();
    const { _version } = storeToRefs(config);

    return {
      _version,
    };
  },
  data() {
    return {
      _dockerTag: null,
    };
  },
  mounted() {
    this.$socket.on("dockerTags", (tags) => {
      this._dockerTag = tags[0].name;
    });
    this.$socket.emit("getDockerTags");
  },
  destroyed() {
    this.$socket.off("dockerTags");
  },
  computed: {
    newVersionAvailable() {
      return (
        this._version && this._dockerTag && this._version != this._dockerTag
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem;
  background-color: var(--color-background-mute);

  & .title {
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
    column-gap: 0.75rem;
    color: var(--color-heading);
  }

  & .icon {
    width: 2.5rem;
    height: 2.5rem;
  }
}
</style>
