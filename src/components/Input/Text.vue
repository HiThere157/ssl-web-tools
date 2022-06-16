<template>
  <div class="input-text">
    <span>{{ label }}</span>
    <div class="input-text-group">
      <input
        class="fs-0"
        :type="onlyNumbersBool ? 'number' : 'text'"
        :value="modelValue"
        :placeholder="placeholder"
        @input="
          $emit(
            'update:modelValue',
            onlyNumbersBool
              ? $event.target.value === ''
                ? 0
                : Number($event.target.value)
              : $event.target.value
          )
        "
      />
      <button
        v-if="!onlyNumbersBool"
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
          <UpIcon />
        </button>

        <button
          v-if="onlyNumbersBool"
          class="green-pill"
          @click="$emit('update:modelValue', Number(modelValue) - 1)"
        >
          <DownIcon />
        </button>
      </template>
    </div>
  </div>
</template>

<script>
import CloseIcon from "../Icons/Close.vue";
import UpIcon from "../Icons/Up.vue";
import DownIcon from "../Icons/Down.vue";

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
      type: String,
      required: false,
      default: "false",
    },
  },
  emits: ["update:modelValue"],
  computed: {
    onlyNumbersBool() {
      return this.onlyNumbers === "true";
    },
  },
  components: {
    CloseIcon,
    UpIcon,
    DownIcon,
  },
};
</script>

<style>
.input-text {
  margin-bottom: 0.5rem;
}

.input-text-group {
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
}

.input-text input {
  height: 2.5rem;
  width: 100%;
  padding: 0.5rem;
  border: 0.2rem solid var(--color-border);
  border-radius: 2rem;
  background-color: var(--color-background);
  color: var(--color-text);
}

.input-text input::-webkit-outer-spin-button,
.input-text input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.input-text input:hover,
.input-text input:focus {
  border-color: var(--color-border-hover);
  outline: none;
}

.input-text button {
  height: 2.5rem;
  aspect-ratio: 1;
  padding: 0.25rem;
  margin-left: 0.5rem;
}
</style>
