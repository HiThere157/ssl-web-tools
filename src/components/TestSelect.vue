<template>
  <div>
    <h1>Run Tests</h1>

    <div class="tab-container">
      <Tab v-if="ssl._enabled" title="SSL" route="/ssl" />
      <Tab v-if="ping._enabled" title="Ping" route="/ping" />
      <Tab v-if="dig._enabled" title="Dig" route="/dig" />
      <Tab v-if="whois._enabled" title="Whois" route="/whois" />
      <Tab v-if="nmap._enabled" title="Nmap" route="/nmap" />
      <Tab v-if="traceroute._enabled" title="Traceroute" route="/traceroute" />
    </div>

    <div class="test-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Tab from "./Tab.vue";

import { storeToRefs } from "pinia";
import { useConfigStore } from "../stores/appConfig.js";

export default {
  setup() {
    const config = useConfigStore();
    config.fetchConfig();
    const { ssl, ping, dig, whois, nmap, traceroute } = storeToRefs(config);

    return {
      ssl,
      ping,
      dig,
      whois,
      nmap,
      traceroute,
    };
  },
  components: {
    Tab,
  },
};
</script>

<style>
/* div container and h1 styled in App.vue */

.tab-container {
  display: flex;
  justify-content: start;
  column-gap: 1rem;
  margin-bottom: 1rem;
}

.test-container > * {
  margin-bottom: 1rem;
}
</style>
