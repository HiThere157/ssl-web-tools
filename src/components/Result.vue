<template>
  <div class="result">
    <div
      class="result-header"
      :class="{
        'result-pending': status === 'pending',
        'result-complete': status === 'complete',
        'result-error': status === 'error',
      }"
    >
      <span>
        <span class="fw-bold">{{ title }}</span> -
        <span class="fw-bold">{{ capitalizeFirstLetter(status) }}</span> -
        <span class="fw-bold">{{ timestampToTimeString(timestamp) }}</span>
      </span>

      <div class="result-action">
        <button class="pill transparent-pill" @click="toggleExpanded()">
          <ChevronIcon :rotateUp="isExpanded" />
        </button>
        <button class="pill transparent-pill" @click="$emit('removeResult')">
          <CloseIcon />
        </button>
      </div>
    </div>

    <div v-if="command" class="result-command">> {{ command }}</div>

    <div
      v-html="$sanitize(body)"
      class="result-body"
      :class="{ 'result-expanded': isExpanded }"
      @scroll="updateScrollSticky()"
    ></div>

    <ChevronIcon
      v-if="!this.scrollSticky"
      class="pill scroll-down"
      :class="{
        'orange-pill': status === 'pending',
        'green-pill': status === 'complete',
        'red-pill': status === 'error',
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
    this.bodyElement = this.$el.querySelector(".result-body");
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

<style scoped>
.result {
  width: 100%;
  margin-bottom: 1.25rem;
  border-radius: 0.75rem;
  overflow: hidden;
}

.result-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  color: var(--vt-c-text-light-1);
}

.result-pending {
  background-color: var(--custom-orange);
}

.result-complete {
  background-color: var(--custom-green);
}

.result-error {
  background-color: var(--custom-red);
}

.result-action {
  display: flex;
  column-gap: 0.5rem;
}

.result-header button {
  height: 2rem;
  aspect-ratio: 1;
  padding: 0.25rem;
}

.result-command {
  padding: 0.25rem 0.5rem;
  background-color: var(--color-background);
  border-bottom: 0.2rem solid var(--color-border);
  font-family: Consolas, monaco, monospace;
}

.result-body {
  max-height: 15rem;
  overflow-y: auto;
  padding: 0.5rem;
  background-color: var(--color-background);
  white-space: pre-wrap;
  font-family: Consolas, monaco, monospace;
  transition: var(--transition-time-1);
}

.result-smooth {
  scroll-behavior: smooth;
}

.result-expanded {
  max-height: 40rem;
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
</style>
