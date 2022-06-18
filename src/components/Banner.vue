<template>
  <div class="banner">
    <span class="banner-title fw-bold">{{ title }}</span>
    <span class="fs-1 fw-bold">{{ description }}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.banner {
  display: flex;
  width: 100%;
  padding: 0.4rem 3rem;
  justify-content: start;
  column-gap: 2rem;
  align-items: center;
  background-color: var(--custom-red);
  color: var(--vt-c-text-light-1);
}

.banner-title {
  font-size: 1.5rem;
}
</style>
