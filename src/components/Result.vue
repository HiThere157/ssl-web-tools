<template>
  <div class="result">
    <div
      class="header"
      :class="{
        pending: status === 'pending',
        complete: status === 'complete',
        error: status === 'error',
      }"
    >
      <span>
        <span class="fw-bold">{{ title }}</span> -
        <span class="fw-bold">{{ capitalizeFirstLetter(status) }}</span> -
        <span class="fw-bold">{{ timestampToTimeString(timestamp) }}</span>
      </span>

      <div class="action">
        <button class="pill pill-transparent" @click="toggleExpanded()">
          <ChevronIcon :rotateUp="isExpanded" />
        </button>
        <button class="pill pill-transparent" @click="$emit('removeResult')">
          <CloseIcon />
        </button>
      </div>
    </div>

    <div v-if="command" class="command">> {{ command }}</div>

    <div
      v-html="$sanitize(body)"
      class="body"
      :class="{ 'result-expanded': isExpanded }"
      @scroll="updateScrollSticky()"
    ></div>

    <ChevronIcon
      v-if="!this.scrollSticky"
      class="pill scroll-down"
      :class="{
        'pill-orange': status === 'pending',
        'pill-green': status === 'complete',
        'pill-red': status === 'error',
      }"
      @click="scrollToBottom(true)"
    />
  </div>
</template>

<script>
import CloseIcon from "./Icons/Close.vue";
import ChevronIcon from "./Icons/Chevron.vue";

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    timestamp: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    command: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.bodyElement = this.$el.querySelector(".result .body");
  },
  data() {
    return {
      bodyElement: null,
      isExpanded: false,
      scrollSticky: true,
    };
  },
  methods: {
    toggleExpanded() {
      this.isExpanded = !this.isExpanded;
      if (!this.isExpanded) {
        setTimeout(() => {
          this.scrollToBottom(true);
        }, 150);
      }
    },
    updateScrollSticky() {
      this.scrollSticky =
        this.bodyElement.scrollHeight -
          this.bodyElement.scrollTop -
          this.bodyElement.clientHeight <=
        0;
    },
    scrollToBottom(smooth = false) {
      if (smooth) this.bodyElement.classList.add("result-smooth");
      this.bodyElement.scrollTop = this.bodyElement.scrollHeight;
      if (smooth) this.bodyElement.classList.remove("result-smooth");
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    timestampToTimeString(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleTimeString();
    },
  },
  updated() {
    if (this.scrollSticky) this.scrollToBottom();
  },
  emit: ["removeResult"],
  components: {
    CloseIcon,
    ChevronIcon,
  },
};
</script>

<style lang="scss" scoped>
.result {
  width: 100%;
  min-width: 45rem;
  margin-bottom: 1.25rem;
  border-radius: 0.75rem;
  overflow: hidden;

  & .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    color: var(--vt-c-text-light-1);

    &.pending {
      background-color: var(--custom-orange);
    }

    &.complete {
      background-color: var(--custom-green);
    }

    &.error {
      background-color: var(--custom-red);
    }

    & .action {
      display: flex;
      column-gap: 0.5rem;

      button {
        height: 2rem;
        aspect-ratio: 1;
        padding: 0.25rem;
      }
    }
  }

  & .command {
    padding: 0.25rem 0.5rem;
    background-color: var(--color-background);
    border-bottom: 0.2rem solid var(--color-border);
    font-family: Consolas, monaco, monospace;
  }

  & .body {
    max-height: 15rem;
    overflow-y: auto;
    padding: 0.5rem;
    background-color: var(--color-background);
    white-space: pre-wrap;
    font-family: Consolas, monaco, monospace;
    transition: var(--transition-time-1);
  }
}

.scroll-down {
  position: absolute;
  right: 0;
  bottom: 0;
  height: 2.35rem;
  aspect-ratio: 1;
  padding: 0.25rem;
  margin: 0.5rem 1rem;
}

/* Set by JS */
.result-smooth {
  scroll-behavior: smooth;
}

.result-expanded {
  max-height: 40rem !important;
}
</style>
