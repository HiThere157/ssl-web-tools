<template>
  <div>
    <span>{{ label }}</span>
    <label class="input-switch">
      <input
        class="pill pill-green"
        type="checkbox"
        :checked="modelValue"
        @input="$emit('update:modelValue', $event.target.checked)"
      />
      <span class="input-slider"></span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Boolean,
      required: false,
    },
  },
  emits: ["update:modelValue"],
};
</script>

<style lang="scss" scoped>
.input-switch {
  position: relative;
  display: block;
  margin-top: 0.5rem;
  width: 4.25rem;
  height: 2.5rem;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .input-slider {
      background-color: var(--custom-green);

      &:before {
        transform: translateX(1.75rem);
      }
    }

    &:focus + .input-slider,
    &:hover + .input-slider {
      border-color: var(--color-border-hover);
    }
  }
}

.input-slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2.5rem;
  border-radius: 1.25rem;
  border: 0.2rem solid var(--color-border);
  background-color: var(--color-background);
  cursor: pointer;
  transition: var(--transition-time-1);

  &:before {
    position: absolute;
    content: "";
    height: 1.6rem;
    aspect-ratio: 1;
    left: 0.25rem;
    bottom: 0.25rem;
    border-radius: 50%;
    background-color: var(--color-background-mute);
    transition: var(--transition-time-1);
  }
}
</style>
