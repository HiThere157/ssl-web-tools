<template>
  <div class="input-checkbox">
    <span>{{ label }}</span>
    <label class="input-checkbox-switch">
      <input
        class="green-pill"
        type="checkbox"
        :checked="modelValue"
        @input="$emit('update:modelValue', $event.target.checked)"
      />
      <span class="input-checkbox-slider"></span>
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

<style>
.input-checkbox {
  margin-bottom: 0.5rem;
}

.input-checkbox-switch {
  position: relative;
  display: block;
  margin-top: 0.5rem;
  width: 4.25rem;
  height: 2rem;
}

.input-checkbox-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.input-checkbox-slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2.5rem;
  border-radius: 2rem;
  border: 0.2rem solid var(--color-border);
  background-color: var(--color-background);
  cursor: pointer;
}

.input-checkbox-slider:before {
  position: absolute;
  content: "";
  height: 1.6rem;
  aspect-ratio: 1;
  left: 0.25rem;
  bottom: 0.25rem;
  border-radius: 50%;
  background-color: var(--color-background-mute);
}

.input-checkbox input:checked + .input-checkbox-slider {
  background-color: var(--custom-green);
}

.input-checkbox input:checked + .input-checkbox-slider:before {
  transform: translateX(1.75rem);
}

.input-checkbox input:focus + .input-checkbox-slider {
  border-color: var(--color-border-hover);
}
</style>
