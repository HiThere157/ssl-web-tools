<template>
  <div class="result">
    <span class="result-header fw-bold">{{ title }}</span>

    <div class="result-body">{{ body }}</div>
  </div>
</template>

<script>
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
};
</script>

<style>
.result {
  width: 100%;
  margin-bottom: 1.25rem;
  border-radius: 0.75rem;
  overflow: hidden;
}

.result-header {
  display: block;
  padding: 0.5rem;
  background-color: var(--custom-green);
  color: var(--vt-c-text-light-1);
}

.result-body {
  padding: 0.5rem;
  background-color: var(--color-background);
  white-space: pre-wrap;
}
</style>
