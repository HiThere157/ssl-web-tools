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

      <button
        class="transparent-pill"
        @click="$emit('removeResult')"
      >
        <CloseIcon />
      </button>
    </div>

    <div class="result-body">{{ body }}</div>
  </div>
</template>

<script>
import CloseIcon from "./Icons/Close.vue";

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
  emit: ["removeResult"],
  components: {
    CloseIcon,
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

.result-header button {
  height: 2rem;
  aspect-ratio: 1;
  padding: 0.25rem;
}

.result-body {
  padding: 0.5rem;
  background-color: var(--color-background);
  white-space: pre-wrap;
}
</style>
