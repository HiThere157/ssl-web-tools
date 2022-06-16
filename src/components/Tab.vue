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

<style>
.tab {
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 2rem;
  color: var(--color-text);
}

.tab:focus {
  outline: .2rem solid var(--color-border);

}
</style>
