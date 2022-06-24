<template>
  <div class="input">
    <span>{{ label }}</span>
    <div class="input-group fs-0" tabindex="0" @blur="isOpen = false">
      <div class="selected" @click="isOpen = !isOpen">
        {{ options[modelValue] }}
      </div>
      <div class="input-items" :class="{ 'input-hidden': !isOpen }">
        <div
          v-for="(option, i) in Object.keys(options)"
          :key="i"
          @click="
            isOpen = false;
            $emit('update:modelValue', option);
          "
        >
          {{ options[option] }}
        </div>
      </div>
      <button class="pill green-pill" @click="isOpen = !isOpen">
        <ChevronIcon :rotateUp="isOpen" />
      </button>
    </div>
  </div>
</template>

<script>
import ChevronIcon from "../Icons/Chevron.vue";

export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
    modelValue: {
      required: false,
      default: null,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  emits: ["update:modelValue"],
  components: {
    ChevronIcon,
  },
};
</script>

<style scoped>
.input {
  outline: none;
}

.input-group {
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  outline: none;
}

.selected {
  display: flex;
  align-items: center;
  width: 100%;
  transition: var(--transition-time-1);
}

.input-group .selected {
  height: 2.5rem;
  padding: 0.5rem;
  padding-left: 1rem;
  border: 0.2rem solid var(--color-border);
  border-radius: 1.25rem;
  background-color: var(--color-background);
  cursor: pointer;
}

.input-group:hover .selected,
.input-group:focus .selected {
  border-color: var(--color-border-hover);
}

.input-group .input-items {
  position: absolute;
  top: 2.75rem;
  left: 0;
  right: 0;
  border: 0.2rem solid var(--color-border);
  border-radius: 1.25rem;
  background-color: var(--color-background);
  overflow: hidden;
  z-index: 1;
}

.input-group .input-items div {
  padding: 0.5rem;
  padding-left: 1rem;
  cursor: pointer;
  transition: var(--transition-time-1);
}

.input-group .input-items div:hover {
  background-color: var(--color-background-mute);
}

.input-hidden {
  display: none;
}

.input button {
  height: 2.5rem;
  aspect-ratio: 1;
  padding: 0.25rem;
  margin-left: 0.5rem;
}
</style>
