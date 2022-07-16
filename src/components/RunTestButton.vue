<template>
  <div class="justify-right">
    <button
      class="pill pill-green fs-1"
      @click="$socket.emit(testName, testObject)"
    >
      Run Test
    </button>
  </div>
</template>

<script>
export default {
  props: {
    testName: {
      type: String,
      required: true,
    },
    testObject: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
