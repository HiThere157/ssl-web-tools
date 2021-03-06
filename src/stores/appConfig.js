import { defineStore } from "pinia";

export const useConfigStore = defineStore("appConfig", {
  state() {
    return {
      _version: null,
      _dockerTag: null,
      debug: {
        _enabled: false,
        selectedTest: "color",
      },
      ssl: {
        _enabled: true,
        target: "",
        port: 443,
        useSelfSigned: false,
      },
      ping: {
        _enabled: true,
        target: "",
        count: 10,
      },
      dig: {
        _enabled: true,
        target: "",
        dns: "",
        type: "A",
        reverse: false,
      },
      whois: {
        _enabled: true,
        target: "",
      },
      nmap: {
        _enabled: true,
        target: "",
        targetSubnet: false,
        subnet: 24,
        serviceDetection: true,
        OSDetection: true,
        timing: "T3",
        portOption: "T1000",
        TCPPorts: "",
        verbose: false,
      },
      traceroute: {
        _enabled: true,
        target: "",
        maxHops: 30,
      },
    };
  },
  actions: {
    async fetchConfig() {
      const response = await fetch("config.json");
      if (response.status === 200) {
        const data = await response.json();
        this.$state = data;
      }
    },
  },
});
