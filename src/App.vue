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
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  display: flex;
  flex-grow: 1;
  min-height: 30rem;
}

.container {
  padding: 0.75rem 1.5rem;
  margin: 0.75rem;
  width: 100%;
  border-radius: 0.4rem;
  background-color: var(--color-background-soft);
}

.container-title {
  margin-bottom: 0.5rem;
  color: var(--color-heading);
}
</style>
