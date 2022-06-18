<template>
  <Header />
  <div class="content">
    <TestSelect />
    <TestResult />
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import TestSelect from "./components/TestSelect.vue";
import TestResult from "./components/TestResult.vue";
</script>

<style>
@import "./assets/base.css";

#app {
  min-width: calc(var(--container-min-width) + 1rem);
  display: flex;
  height: 100vh;
  flex-direction: column;
}

.content {
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 0.5rem;
  row-gap: 0.5rem;
  padding: 0.5rem;
}

.content > * {
  min-width: calc(--container-min-width);
  flex: 1;
  padding: 0.75rem 1.5rem;
  border-radius: 0.4rem;
  background-color: var(--color-background-soft);
}

.content > * > h1 {
  margin-bottom: 0.5rem;
  color: var(--color-heading);
}
</style>
