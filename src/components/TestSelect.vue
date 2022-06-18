<template>
  <div>
    <h1>Run Tests</h1>

    <div class="tab-container">
      <Tab title="SSL" route="/" />
      <Tab title="Ping" route="/ping" />
      <Tab title="Dig" route="/dig" />
      <Tab title="Nmap" route="/nmap" />
      <Tab title="Traceroute" route="/traceroute" />
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import Tab from "./Tab.vue";

export default {
  components: {
    Tab,
  },
};
</script>

<style scoped>
/* div container and h1 styled in App.vue */

.tab-container {
  display: flex;
  justify-content: start;
  column-gap: 1rem;
  margin-bottom: 1rem;
}

.justify-right {
  display: flex;
  justify-content: flex-end;
}
</style>
