<template>
  <div class="header">
    <div class="header-title">
      <Favicon class="header-icon" />
      <h1>SSL Web Tools</h1>
    </div>
  </div>
</template>

<script setup>
import Favicon from "./Icons/Favicon.vue";
</script>

<style scoped>
.header {
  width: 100%;
  padding: 0.4rem;
  background-color: var(--color-background-mute);
}

.header-title {
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  column-gap: 0.75rem;
  color: var(--color-heading);
}

.header-icon {
  width: 2.5rem;
  height: 2.5rem;
}
</style>
