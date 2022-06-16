<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="{ rotate: rotateUp }"
    viewBox="0 0 512 512"
  >
    <title>Chevron</title>
    <path
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="48"
      d="M112 184l144 144 144-144"
    />
  </svg>
</template>

<script>
export default {
  props: {
    rotateUp: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style scoped>
.rotate {
  transform: rotate(180deg);
}
</style>
