<template>
  <div class="input">
    <span>{{ label }}</span>
    <div class="input-group">
      <input
        class="fs-0"
        :type="onlyNumbers ? 'number' : 'text'"
        :value="modelValue"
        :placeholder="placeholder"
        @input="
          $emit(
            'update:modelValue',
            onlyNumbers
              ? $event.target.value === ''
                ? 0
                : Number($event.target.value)
              : $event.target.value,
          )
        "
      />
      <button
        v-if="!onlyNumbers"
        class="green-pill"
        @click="$emit('update:modelValue', '')"
      >
        <CloseIcon />
      </button>

      <template v-else>
        <button
          class="green-pill"
          @click="$emit('update:modelValue', Number(modelValue) + 1)"
        >
          <ChevronIcon :rotateUp="true" />
        </button>

        <button
          v-if="onlyNumbers"
          class="green-pill"
          @click="$emit('update:modelValue', Number(modelValue) - 1)"
        >
          <ChevronIcon />
        </button>
      </template>
    </div>
  </div>
</template>

<script>
import CloseIcon from "../Icons/Close.vue";
import ChevronIcon from "../Icons/Chevron.vue";

export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    onlyNumbers: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  components: {
    CloseIcon,
    ChevronIcon,
  },
};
</script>

<style scoped>
.input-group {
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
}

.input input {
  height: 2.5rem;
  width: 100%;
  padding: 0.5rem;
  padding-left: 1rem;
  border: 0.2rem solid var(--color-border);
  border-radius: 1.25rem;
  background-color: var(--color-background);
  color: var(--color-text);
}

.input input::-webkit-outer-spin-button,
.input input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.input input:hover,
.input input:focus {
  border-color: var(--color-border-hover);
  outline: none;
}

.input button {
  height: 2.5rem;
  aspect-ratio: 1;
  padding: 0.25rem;
  margin-left: 0.5rem;
}
</style>
