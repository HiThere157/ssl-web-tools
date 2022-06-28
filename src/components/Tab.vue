<template>
  <router-link :to="route" class="tab fw-bold">{{ title }}</router-link>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    route: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.tab {
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 1.25rem;
  color: var(--color-text);

  &:focus {
    outline: 0.2rem solid var(--color-border);
  }
}
</style>
