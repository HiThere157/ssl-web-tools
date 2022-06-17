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
      <span class="fw-bold">{{ title }} - {{ status }}</span>

      <div class="result-action">
        <button class="transparent-pill" @click="toggleExpanded()">
          <ChevronIcon :rotateUp="isExpanded" />
        </button>
        <button class="transparent-pill" @click="$emit('removeResult')">
          <CloseIcon />
        </button>
      </div>
    </div>

    <div class="result-body" :class="{ 'result-expanded': isExpanded }">
      {{ body }}
    </div>
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
    status: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isExpanded: false,
    };
  },
  methods: {
    toggleExpanded() {
      this.isExpanded = !this.isExpanded;
    },
  },
  updated() {
    const bodyElement = this.$el.querySelector(".result-body");
    bodyElement.scrollTop = bodyElement.scrollHeight;
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

.result-pending {
  background-color: var(--custom-orange);
}

.result-complete {
  background-color: var(--custom-green);
}

.result-error {
  background-color: var(--custom-red);
}

.result-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  color: var(--vt-c-text-light-1);
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

.result-body {
  max-height: 20rem;
  overflow-y: auto;
  padding: 0.5rem;
  background-color: var(--color-background);
  white-space: pre-wrap;
  font-family: Consolas, monaco, monospace;
}

.result-expanded {
  max-height: 40rem;
}
</style>
